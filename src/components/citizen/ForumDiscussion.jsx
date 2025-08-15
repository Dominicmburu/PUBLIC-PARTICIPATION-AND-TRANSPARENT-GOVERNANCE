import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Badge,
  Modal,
  Dropdown,
  InputGroup,
  Alert
} from 'react-bootstrap';
import { 
  FaComments, 
  FaPlus, 
  FaReply, 
  FaThumbsUp, 
  FaThumbsDown,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaPaperPlane,
  FaFlag,
  FaHeart,
  FaBullhorn
} from 'react-icons/fa';

const ForumDiscussion = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopic, setNewTopic] = useState({
    title: '',
    category: '',
    description: '',
    tags: ''
  });
  const [newReply, setNewReply] = useState('');

  const categories = [
    { id: 'all', name: 'All Discussions', color: '#64748b', icon: '💬' },
    { id: 'budget', name: 'Budget & Finance', color: '#8b5cf6', icon: '💰' },
    { id: 'infrastructure', name: 'Infrastructure', color: '#ef4444', icon: '🏗️' },
    { id: 'health', name: 'Healthcare', color: '#22c55e', icon: '🏥' },
    { id: 'education', name: 'Education', color: '#3b82f6', icon: '🎓' },
    { id: 'environment', name: 'Environment', color: '#10b981', icon: '🌱' },
    { id: 'transport', name: 'Transport', color: '#f59e0b', icon: '🚌' },
    { id: 'agriculture', name: 'Agriculture', color: '#84cc16', icon: '🌾' },
    { id: 'youth', name: 'Youth Affairs', color: '#06b6d4', icon: '👥' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Proposed Budget Allocation for Healthcare 2025',
      category: 'budget',
      author: 'Mary Wanjiku',
      authorRole: 'citizen',
      createdAt: '2025-01-15T10:30:00Z',
      lastActivity: '2025-01-15T14:20:00Z',
      replies: 23,
      likes: 45,
      views: 156,
      isSticky: true,
      description: 'Let\'s discuss the proposed 30% allocation to healthcare in the 2025 budget. What are your thoughts on this allocation?',
      tags: ['budget', 'healthcare', '2025'],
      status: 'active'
    },
    {
      id: 2,
      title: 'Road Maintenance Schedule - Community Input Needed',
      category: 'infrastructure',
      author: 'County Engineer',
      authorRole: 'official',
      createdAt: '2025-01-14T09:15:00Z',
      lastActivity: '2025-01-15T11:45:00Z',
      replies: 18,
      likes: 32,
      views: 201,
      isSticky: false,
      description: 'The Roads Department is planning the Q2 maintenance schedule. Which roads should be prioritized?',
      tags: ['roads', 'maintenance', 'infrastructure'],
      status: 'active'
    },
    {
      id: 3,
      title: 'Virtual Baraza: January 2025 - Education Matters',
      category: 'education',
      author: 'Education Officer',
      authorRole: 'official',
      createdAt: '2025-01-12T08:00:00Z',
      lastActivity: '2025-01-14T16:30:00Z',
      replies: 67,
      likes: 89,
      views: 342,
      isSticky: true,
      description: 'Join our monthly virtual baraza focusing on education issues. Discuss ECDE, bursaries, and vocational training.',
      tags: ['baraza', 'education', 'virtual'],
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Water Supply Issues in Rware Estate',
      category: 'infrastructure',
      author: 'Peter Njuguna',
      authorRole: 'citizen',
      createdAt: '2025-01-13T15:20:00Z',
      lastActivity: '2025-01-14T12:10:00Z',
      replies: 12,
      likes: 28,
      views: 98,
      isSticky: false,
      description: 'Residents of Rware Estate have been experiencing irregular water supply. Let\'s share experiences and solutions.',
      tags: ['water', 'rware', 'supply'],
      status: 'active'
    },
    {
      id: 5,
      title: 'Youth Empowerment Programs - Success Stories',
      category: 'youth',
      author: 'Grace Njeri',
      authorRole: 'citizen',
      createdAt: '2025-01-11T11:45:00Z',
      lastActivity: '2025-01-13T09:20:00Z',
      replies: 34,
      likes: 76,
      views: 187,
      isSticky: false,
      description: 'Share your success stories from the county youth empowerment programs. Let\'s inspire others!',
      tags: ['youth', 'empowerment', 'success'],
      status: 'active'
    }
  ];

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getAuthorBadge = (role) => {
    switch (role) {
      case 'official':
        return { variant: 'primary', text: 'County Official', icon: '👑' };
      case 'moderator':
        return { variant: 'success', text: 'Moderator', icon: '🛡️' };
      default:
        return { variant: 'secondary', text: 'Citizen', icon: '👤' };
    }
  };

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleNewTopicSubmit = (e) => {
    e.preventDefault();
    // Handle new topic creation
    console.log('New topic:', newTopic);
    setShowNewTopicModal(false);
    setNewTopic({ title: '', category: '', description: '', tags: '' });
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    // Handle reply submission
    console.log('New reply:', newReply, 'to topic:', selectedTopic);
    setShowReplyModal(false);
    setNewReply('');
    setSelectedTopic(null);
  };

  const handleLike = (topicId) => {
    // Handle like functionality
    console.log('Liked topic:', topicId);
  };

  const handleReply = (topic) => {
    setSelectedTopic(topic);
    setShowReplyModal(true);
  };

  return (
    <div className="forum-discussion">
      <Container fluid className="p-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 className="h3 fw-bold text-dark mb-2">
                  Community Forum 💬
                </h1>
                <p className="text-muted">
                  Join discussions, share ideas, and participate in virtual barazas
                </p>
              </div>
              <Button
                onClick={() => setShowNewTopicModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  border: 'none',
                  borderRadius: '12px'
                }}
              >
                <FaPlus className="me-2" />
                New Discussion
              </Button>
            </div>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Row className="mb-4">
          <Col lg={8}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search discussions, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '0 12px 12px 0' }}
              />
            </InputGroup>
          </Col>
          <Col lg={4}>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" className="w-100" style={{ borderRadius: '12px' }}>
                <FaFilter className="me-2" />
                {getCategoryInfo(selectedCategory).name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map(category => (
                  <Dropdown.Item 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    active={selectedCategory === category.id}
                  >
                    <span className="me-2">{category.icon}</span>
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Categories Grid */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex gap-2 flex-wrap">
              {categories.map(category => {
                const isActive = selectedCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? 'primary' : 'outline-secondary'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    style={{ 
                      borderRadius: '20px',
                      background: isActive ? category.color : 'transparent',
                      borderColor: category.color,
                      color: isActive ? 'white' : category.color
                    }}
                  >
                    <span className="me-1">{category.icon}</span>
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </Col>
        </Row>

        {/* Discussions List */}
        <Row>
          <Col>
            {filteredDiscussions.length === 0 ? (
              <Card className="border-0 shadow-sm text-center py-5">
                <Card.Body>
                  <FaComments className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                  <h5 className="text-muted">No discussions found</h5>
                  <p className="text-muted">
                    {searchTerm ? 'Try different search terms or' : ''} Start a new discussion to get the conversation going!
                  </p>
                  <Button
                    onClick={() => setShowNewTopicModal(true)}
                    variant="primary"
                    style={{ borderRadius: '12px' }}
                  >
                    <FaPlus className="me-2" />
                    Start New Discussion
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              filteredDiscussions.map(discussion => {
                const categoryInfo = getCategoryInfo(discussion.category);
                const authorBadge = getAuthorBadge(discussion.authorRole);
                
                return (
                  <Card key={discussion.id} className="border-0 shadow-sm mb-3">
                    <Card.Body className="p-4">
                      <Row>
                        <Col md={8}>
                          <div className="d-flex align-items-start">
                            {discussion.isSticky && (
                              <div className="me-2">
                                <Badge bg="warning" className="me-2">
                                  📌 Pinned
                                </Badge>
                              </div>
                            )}
                            
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                <Badge 
                                  style={{ 
                                    background: categoryInfo.color,
                                    fontSize: '0.7rem'
                                  }}
                                  className="me-2"
                                >
                                  {categoryInfo.icon} {categoryInfo.name}
                                </Badge>
                                
                                {discussion.status === 'scheduled' && (
                                  <Badge bg="info" className="me-2">
                                    <FaBullhorn className="me-1" />
                                    Scheduled
                                  </Badge>
                                )}
                              </div>
                              
                              <h5 className="fw-bold text-dark mb-2">
                                <a 
                                  href="#" 
                                  className="text-decoration-none text-dark"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // Navigate to discussion detail
                                  }}
                                >
                                  {discussion.title}
                                </a>
                              </h5>
                              
                              <p className="text-muted mb-2">
                                {discussion.description}
                              </p>
                              
                              <div className="d-flex align-items-center mb-2">
                                <div className="me-3">
                                  <FaUser className="text-muted me-1" />
                                  <span className="fw-medium">{discussion.author}</span>
                                  <Badge 
                                    bg={authorBadge.variant} 
                                    className="ms-2"
                                    style={{ fontSize: '0.6rem' }}
                                  >
                                    {authorBadge.icon} {authorBadge.text}
                                  </Badge>
                                </div>
                                <div className="me-3">
                                  <FaCalendarAlt className="text-muted me-1" />
                                  <small className="text-muted">
                                    {getTimeAgo(discussion.createdAt)}
                                  </small>
                                </div>
                              </div>
                              
                              <div className="d-flex flex-wrap gap-1 mb-2">
                                {discussion.tags.map((tag, index) => (
                                  <Badge 
                                    key={index}
                                    bg="light" 
                                    text="dark"
                                    style={{ fontSize: '0.7rem' }}
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={4}>
                          <div className="text-md-end">
                            <div className="mb-3">
                              <div className="d-flex justify-content-md-end gap-3 mb-2">
                                <div className="text-center">
                                  <div className="fw-bold text-primary">{discussion.replies}</div>
                                  <small className="text-muted">Replies</small>
                                </div>
                                <div className="text-center">
                                  <div className="fw-bold text-success">{discussion.likes}</div>
                                  <small className="text-muted">Likes</small>
                                </div>
                                <div className="text-center">
                                  <div className="fw-bold text-info">{discussion.views}</div>
                                  <small className="text-muted">Views</small>
                                </div>
                              </div>
                              
                              <small className="text-muted">
                                Last activity: {getTimeAgo(discussion.lastActivity)}
                              </small>
                            </div>
                            
                            <div className="d-flex gap-2 justify-content-md-end">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleLike(discussion.id)}
                                style={{ borderRadius: '8px' }}
                              >
                                <FaHeart className="me-1" />
                                Like
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => handleReply(discussion)}
                                style={{ borderRadius: '8px' }}
                              >
                                <FaReply className="me-1" />
                                Reply
                              </Button>
                              <Dropdown>
                                <Dropdown.Toggle 
                                  variant="outline-secondary" 
                                  size="sm"
                                  style={{ borderRadius: '8px' }}
                                >
                                  •••
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item>
                                    <FaEye className="me-2" />
                                    View Details
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <FaFlag className="me-2" />
                                    Report
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })
            )}
          </Col>
        </Row>
      </Container>

      {/* New Topic Modal */}
      <Modal show={showNewTopicModal} onHide={() => setShowNewTopicModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Start New Discussion</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleNewTopicSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Discussion Title *</Form.Label>
              <Form.Control
                type="text"
                value={newTopic.title}
                onChange={(e) => setNewTopic(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a clear, descriptive title"
                required
                style={{ borderRadius: '12px' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Category *</Form.Label>
              <Form.Select
                value={newTopic.category}
                onChange={(e) => setNewTopic(prev => ({ ...prev, category: e.target.value }))}
                required
                style={{ borderRadius: '12px' }}
              >
                <option value="">Select a category</option>
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={newTopic.description}
                onChange={(e) => setNewTopic(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed information about the topic you'd like to discuss..."
                required
                style={{ borderRadius: '12px' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Tags (Optional)</Form.Label>
              <Form.Control
                type="text"
                value={newTopic.tags}
                onChange={(e) => setNewTopic(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas (e.g., budget, healthcare, roads)"
                style={{ borderRadius: '12px' }}
              />
              <Form.Text className="text-muted">
                Tags help others find your discussion more easily
              </Form.Text>
            </Form.Group>

            <Alert variant="info" className="mb-0">
              <FaComments className="me-2" />
              <strong>Community Guidelines:</strong> Keep discussions respectful, on-topic, and constructive. 
              Personal attacks and inappropriate content will be removed.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowNewTopicModal(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                border: 'none'
              }}
            >
              <FaPaperPlane className="me-2" />
              Start Discussion
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Reply Modal */}
      <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Reply to: {selectedTopic?.title}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleReplySubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Your Reply *</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your thoughts, suggestions, or questions..."
                required
                style={{ borderRadius: '12px' }}
              />
            </Form.Group>

            <Alert variant="success" className="mb-0">
              <FaReply className="me-2" />
              Your reply will be visible to all forum members. Keep it respectful and relevant to the discussion.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowReplyModal(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary"
            >
              <FaPaperPlane className="me-2" />
              Post Reply
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ForumDiscussion;