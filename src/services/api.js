import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4006',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

api.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServerInfo = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await api.post('/api/contact', messageData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkAvailability = async (date) => {
  try {
    const response = await api.get('/api/schedule/availability', { params: { date } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scheduleMeeting = async (meetingData) => {
  try {
    const response = await api.post('/api/schedule', meetingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendCeoChatMessage = async (message) => {
  try {
    const response = await api.post('/api/ceo-chat', { message }, { timeout: 30000 });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      return { success: false, reply: 'You have reached the message limit. Please try again later.' };
    }
    throw error;
  }
};

export default api;
