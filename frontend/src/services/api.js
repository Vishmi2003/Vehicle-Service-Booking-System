const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const apiCall = async (endpoint, method = 'GET', data = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const authService = {
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  login: (credentials) => apiCall('/auth/login', 'POST', credentials),
  getUsers: () => apiCall('/auth/users'),
};

export default authService;