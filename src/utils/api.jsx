import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (passwords) => api.put('/users/change-password', passwords),
  deleteAccount: () => api.delete('/users/account'),
  getActivity: () => api.get('/users/activity'),
  updateNotifications: (settings) => api.put('/users/notifications', settings),
};

// Issues API calls
export const issuesAPI = {
  getIssues: (params = {}) => api.get('/issues', { params }),
  getIssue: (id) => api.get(`/issues/${id}`),
  createIssue: (data) => api.post('/issues', data),
  updateIssue: (id, data) => api.put(`/issues/${id}`, data),
  deleteIssue: (id) => api.delete(`/issues/${id}`),
  uploadImages: (issueId, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return api.post(`/issues/${issueId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  addComment: (issueId, comment) => api.post(`/issues/${issueId}/comments`, { comment }),
  likeIssue: (issueId) => api.post(`/issues/${issueId}/like`),
  assignIssue: (issueId, assignment) => api.put(`/issues/${issueId}/assign`, assignment),
  updateStatus: (issueId, status, note) => api.put(`/issues/${issueId}/status`, { status, note }),
};

// Consultations API calls
export const consultationsAPI = {
  getConsultations: (params = {}) => api.get('/consultations', { params }),
  getConsultation: (id) => api.get(`/consultations/${id}`),
  createConsultation: (data) => api.post('/consultations', data),
  updateConsultation: (id, data) => api.put(`/consultations/${id}`, data),
  deleteConsultation: (id) => api.delete(`/consultations/${id}`),
  participate: (id, responses) => api.post(`/consultations/${id}/participate`, { responses }),
  getResults: (id) => api.get(`/consultations/${id}/results`),
  getParticipants: (id) => api.get(`/consultations/${id}/participants`),
};

// Forum API calls
export const forumAPI = {
  getTopics: (params = {}) => api.get('/forum/topics', { params }),
  getTopic: (id) => api.get(`/forum/topics/${id}`),
  createTopic: (data) => api.post('/forum/topics', data),
  updateTopic: (id, data) => api.put(`/forum/topics/${id}`, data),
  deleteTopic: (id) => api.delete(`/forum/topics/${id}`),
  getReplies: (topicId, params = {}) => api.get(`/forum/topics/${topicId}/replies`, { params }),
  createReply: (topicId, content) => api.post(`/forum/topics/${topicId}/replies`, { content }),
  updateReply: (topicId, replyId, content) => api.put(`/forum/topics/${topicId}/replies/${replyId}`, { content }),
  deleteReply: (topicId, replyId) => api.delete(`/forum/topics/${topicId}/replies/${replyId}`),
  likeTopic: (id) => api.post(`/forum/topics/${id}/like`),
  likeReply: (topicId, replyId) => api.post(`/forum/topics/${topicId}/replies/${replyId}/like`),
  reportContent: (type, id, reason) => api.post('/forum/report', { type, id, reason }),
};

// Admin API calls
export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/users/${id}`),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  getAnalytics: (params = {}) => api.get('/admin/analytics', { params }),
  exportData: (type, format = 'csv') => api.get(`/admin/export/${type}`, { 
    params: { format },
    responseType: 'blob'
  }),
  getSystemLogs: (params = {}) => api.get('/admin/logs', { params }),
  updateSettings: (settings) => api.put('/admin/settings', settings),
};

// Notifications API calls
export const notificationsAPI = {
  getNotifications: (params = {}) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

// Geographic API calls
export const geoAPI = {
  getConstituencies: () => api.get('/geo/constituencies'),
  getWards: (constituency) => api.get(`/geo/wards/${constituency}`),
  reverseGeocode: (lat, lng) => api.get('/geo/reverse', { params: { lat, lng } }),
};

// File upload utility
export const uploadFile = async (file, type = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      // You can use this to show upload progress
      console.log(`Upload progress: ${percentCompleted}%`);
    }
  });
};

// Search API calls
export const searchAPI = {
  global: (query, params = {}) => api.get('/search', { params: { q: query, ...params } }),
  issues: (query, params = {}) => api.get('/search/issues', { params: { q: query, ...params } }),
  consultations: (query, params = {}) => api.get('/search/consultations', { params: { q: query, ...params } }),
  forum: (query, params = {}) => api.get('/search/forum', { params: { q: query, ...params } }),
  users: (query, params = {}) => api.get('/search/users', { params: { q: query, ...params } }),
};

// Contact API calls
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getOffices: () => api.get('/contact/offices'),
  getEmergencyContacts: () => api.get('/contact/emergency'),
};

// Statistics API calls
export const statsAPI = {
  getPublicStats: () => api.get('/stats/public'),
  getCountyInfo: () => api.get('/stats/county-info'),
};

// Error handler utility
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An unexpected error occurred.';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your internet connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred.';
  }
};

// Response transformer utility
export const transformResponse = (response) => {
  return {
    data: response.data,
    success: response.status >= 200 && response.status < 300,
    status: response.status,
    message: response.data.message || 'Success'
  };
};

export default api;