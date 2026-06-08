// Central API base URL — reads from .env (VITE_API_URL)
// In production, set VITE_API_URL to your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
