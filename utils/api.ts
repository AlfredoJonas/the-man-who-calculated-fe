import axios from 'axios';
import { APP_BASE_URL } from './constant';

const token = ''

const headers = {
  'Content-Type': 'application/json',
  'Authentication': `Bearer ${token}`
};

export const FETCH_URL = {
  user_records: 'records',
  delete_user_record: 'record/delete'
}

export const api = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 30000,
  headers,
});
