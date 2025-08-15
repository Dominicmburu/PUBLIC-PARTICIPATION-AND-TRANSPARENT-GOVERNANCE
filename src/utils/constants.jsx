// Application Constants

// User Roles
export const USER_ROLES = {
  CITIZEN: 'citizen',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  INACTIVE: 'inactive'
};

// Issue Categories
export const ISSUE_CATEGORIES = {
  ROADS: 'roads',
  LIGHTING: 'lighting',
  WATER: 'water',
  WASTE: 'waste',
  SECURITY: 'security',
  MAINTENANCE: 'maintenance',
  HEALTH: 'health',
  EDUCATION: 'education',
  ENVIRONMENT: 'environment'
};

// Issue Priorities
export const ISSUE_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Issue Status
export const ISSUE_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REJECTED: 'rejected'
};

// Consultation Status
export const CONSULTATION_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Question Types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple-choice',
  SINGLE_CHOICE: 'single-choice',
  TEXT: 'text',
  RATING: 'rating',
  YES_NO: 'yes-no',
  FILE_UPLOAD: 'file-upload',
  DATE: 'date',
  NUMBER: 'number'
};

// Forum Topic Status
export const TOPIC_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  PINNED: 'pinned',
  ARCHIVED: 'archived'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  ISSUE_UPDATE: 'issue_update',
  NEW_CONSULTATION: 'new_consultation',
  CONSULTATION_REMINDER: 'consultation_reminder',
  FORUM_REPLY: 'forum_reply',
  FORUM_MENTION: 'forum_mention',
  SYSTEM_ANNOUNCEMENT: 'system_announcement',
  WELCOME: 'welcome'
};

// File Types
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ALL: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// File Size Limits (in bytes)
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  AVATAR: 2 * 1024 * 1024 // 2MB
};

// Nyeri County Geographic Data
export const CONSTITUENCIES = [
  'Nyeri Town',
  'Othaya',
  'Mukurwe-ini',
  'Tetu',
  'Kieni East',
  'Kieni West'
];

export const WARDS = {
  'Nyeri Town': [
    'Kiganjo/Mathari',
    'Ruring\'u',
    'Gatitu/Muruguru',
    'Rware',
    'Kamakwa/Mukaro'
  ],
  'Othaya': [
    'Karima',
    'Mahiga',
    'Iria-ini',
    'Chinga'
  ],
  'Mukurwe-ini': [
    'Rugi',
    'Gikondi',
    'Mukurwe-ini West',
    'Mukurwe-ini Central'
  ],
  'Tetu': [
    'Dedan Kimathi',
    'Wamagana',
    'Aguthi-Gaaki'
  ],
  'Kieni East': [
    'Gatarakwa',
    'Thegu River',
    'Mweiga',
    'Naromoru/Kiamathaga'
  ],
  'Kieni West': [
    'Mugunda',
    'Kabaru',
    'Gakawa',
    'Mwiyogo/Endarasha'
  ]
};

// County Departments
export const COUNTY_DEPARTMENTS = [
  'Governor\'s Office',
  'County Secretary',
  'Finance & Economic Planning',
  'Health Services',
  'Education & Vocational Training',
  'Agriculture, Livestock & Fisheries',
  'Water, Environment & Natural Resources',
  'Roads, Transport & Public Works',
  'Trade, Tourism & Cooperatives',
  'Youth, Gender & Social Services',
  'ICT & E-Government',
  'Public Service & Administration'
];

// Emergency Contacts
export const EMERGENCY_CONTACTS = {
  POLICE: '999',
  FIRE: '999',
  AMBULANCE: '999',
  COUNTY_HOTLINE: '0700-NYERI',
  WATER_EMERGENCY: '0711-WATER'
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Nyeri County Digital Platform',
  VERSION: '1.0.0',
  DESCRIPTION: 'Digital Platform for Public Participation and Transparent Governance',
  SUPPORT_EMAIL: 'support@nyeri.go.ke',
  CONTACT_EMAIL: 'info@nyeri.go.ke',
  WEBSITE: 'https://nyeri.go.ke',
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/nyericounty',
    TWITTER: 'https://twitter.com/nyericounty',
    INSTAGRAM: 'https://instagram.com/nyericounty',
    LINKEDIN: 'https://linkedin.com/company/nyericounty'
  }
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100
};

// Form Validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?254[17]\d{8}$|^0[17]\d{8}$/,
  ID_NUMBER_REGEX: /^\d{7,8}$/
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
  TIME: 'HH:mm'
};

// Colors (for charts and UI elements)
export const COLORS = {
  PRIMARY: '#1e40af',
  PRIMARY_LIGHT: '#3b82f6',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#3b82f6',
  SECONDARY: '#64748b',
  LIGHT: '#f8fafc',
  DARK: '#0f172a'
};

// Chart Colors
export const CHART_COLORS = [
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#f59e0b', // Orange
  '#ef4444', // Red
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#ec4899', // Pink
  '#10b981'  // Emerald
];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_ROLE: 'userRole',
  USER_DATA: 'userData',
  PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Feature Flags
export const FEATURES = {
  NOTIFICATIONS: true,
  DARK_MODE: false,
  ANALYTICS: true,
  FILE_UPLOAD: true,
  GEOLOCATION: true,
  PUSH_NOTIFICATIONS: false,
  MULTI_LANGUAGE: false,
  ADVANCED_SEARCH: true
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported file format.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long.`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  REGISTRATION_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  ISSUE_REPORTED: 'Issue reported successfully.',
  CONSULTATION_SUBMITTED: 'Consultation response submitted successfully.',
  FORUM_POST_CREATED: 'Forum post created successfully.',
  EMAIL_SENT: 'Email sent successfully.',
  FILE_UPLOADED: 'File uploaded successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.'
};

// Loading Messages
export const LOADING_MESSAGES = {
  DEFAULT: 'Loading...',
  SAVING: 'Saving...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
  DELETING: 'Deleting...',
  SENDING: 'Sending...',
  LOADING_DATA: 'Loading data...',
  SUBMITTING: 'Submitting...'
};

// Analytics Events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  USER_REGISTRATION: 'user_registration',
  USER_LOGIN: 'user_login',
  ISSUE_REPORTED: 'issue_reported',
  CONSULTATION_PARTICIPATED: 'consultation_participated',
  FORUM_POST_CREATED: 'forum_post_created',
  FILE_UPLOADED: 'file_uploaded',
  SEARCH_PERFORMED: 'search_performed'
};

export default {
  USER_ROLES,
  USER_STATUS,
  ISSUE_CATEGORIES,
  ISSUE_PRIORITIES,
  ISSUE_STATUS,
  CONSULTATION_STATUS,
  QUESTION_TYPES,
  TOPIC_STATUS,
  NOTIFICATION_TYPES,
  ALLOWED_FILE_TYPES,
  FILE_SIZE_LIMITS,
  CONSTITUENCIES,
  WARDS,
  COUNTY_DEPARTMENTS,
  EMERGENCY_CONTACTS,
  APP_CONFIG,
  API_CONFIG,
  PAGINATION,
  VALIDATION,
  DATE_FORMATS,
  COLORS,
  CHART_COLORS,
  STORAGE_KEYS,
  FEATURES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
  ANALYTICS_EVENTS
};