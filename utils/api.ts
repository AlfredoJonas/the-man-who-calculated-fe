import axios from 'axios';
import { APP_BASE_URL } from './constant';

const authToken = 'bqf0eb-03b50a4238f19f6d877d69a1f205b5df';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${authToken}`,
};


export const FETCH_URL = {
    user_records: 'records',
}

export const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 30000,
    headers,
});

