import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for sanitizing inputs
api.interceptors.request.use((config) => {
  if (config.data && typeof config.data === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(config.data)) {
      if (typeof value === 'string') {
        sanitized[key] = value.replace(/<[^>]*>/g, '').trim();
      } else {
        sanitized[key] = value;
      }
    }
    config.data = sanitized;
  }
  return config;
});

export const fetchFAQ = (query = '', category = '') =>
  api.get(`/faq/?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`).then(r => r.data);

export const fetchGlossary = (query = '') =>
  api.get(`/glossary/?q=${encodeURIComponent(query)}`).then(r => r.data);

export const fetchQuiz = () =>
  api.get('/quiz/').then(r => r.data);

export const fetchDates = () =>
  api.get('/dates/').then(r => r.data);

export const checkEligibility = (data) =>
  api.post('/eligibility/', data).then(r => r.data);

export default api;
