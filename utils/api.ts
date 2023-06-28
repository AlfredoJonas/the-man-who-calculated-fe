import axios from 'axios';
import { APP_BASE_URL } from './constant';

const headers = {
  'Content-Type': 'application/json',
};

export const FETCH_URL = {
  user_login: 'login',
  user_logout: 'logout',
  user_records: 'records',
  user_info: 'user',
  delete_user_record: 'record/delete',
  operations: 'operations',
  new_operation: 'record'
}

export const api = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 30000,
  headers,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem('logged_in', '0');
    }
    return Promise.reject(error);
  }
);