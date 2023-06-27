import getConfig from 'next/config';

const { APP_BASE_URL: ABU } = getConfig();

export const APP_BASE_URL = ABU;


export const recordKeyValues = [
    {
      key: 'id',
      value: 'ID'
    },
    {
      key: 'operation_id',
      value: 'Operation ID'
    },
    {
      key: 'user_id',
      value: 'User ID'
    },
    {
      key: 'amount',
      value: 'Amount'
    },
    {
      key: 'user_balance',
      value: 'User Balance'
    },
    {
      key: 'operation_response',
      value: 'Operation Response'
    },
    {
      key: 'created_at',
      value: 'Date'
    }
  ]