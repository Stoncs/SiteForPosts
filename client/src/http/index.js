import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/',
});

export { $host };
