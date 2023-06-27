export interface Record {
  id: number;
  operation_id: number;
  user_id: number;
  amount: number;
  user_balance: number;
  operation_response: string;
  created_at: string;
  [key: string]: any; // Add an key signature to allow accessing properties using string indexes
}

export interface paginatedApiUserRecordsProps {
  page: number;
  size: number;
  search: string;
  filter: string;
  order: string;
}

export interface paginatedApiUserLoginProps {
  username: string;
  password: string;
}