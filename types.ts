export interface UserRecord {
  id: number;
  operation_id: number;
  user_id: number;
  amount: number;
  user_balance: number;
  operation_response: string;
  created_at: string;
  [key: string]: any; // Add an key signature to allow accessing properties using string indexes
}

export interface OperationFields {
  value: string;
  type: string;
  required: boolean;
}

export interface Operation {
  id: number;
  type: string;
  cost: number;
  fields: Record<string, OperationFields>;
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

export interface newOperationProps {
  operation_id: number;
  variables: string;
}

export type ResponseType = {
  result: number;
  variables: Record<string, number>;
};