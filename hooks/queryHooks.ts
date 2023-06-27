import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FETCH_URL, api } from '../utils/api';
import { paginatedApiUserRecordsProps, paginatedApiUserLoginProps } from '../types';
import { useRouter } from 'next/router';

/**
 * Custom hook for fetching user records information.
 *
 * @param {paginatedApiUserRecordsProps} params - The query parameters.
 * @param {object} options - The query options.
 * @returns {object} - The query result.
 */
export const useUserRecordsInfo = (params: paginatedApiUserRecordsProps, options = {}) => {
  const queryClient = useQueryClient();
  return useQuery(
    'records',
    async () => {
      const { data } = await api.get(FETCH_URL.user_records, { params });
      return data;
    },
    {
      onSuccess: (data: any) => {
        localStorage.setItem('user_balance', data.user_balance);
      },
      placeholderData: queryClient.getQueryData(`records`) || {},
      ...options,
    }
  );
};

/**
 * Custom hook for user login.
 *
 * @param {object} options - The mutation options.
 * @returns {object} - The mutation result.
 */
export const useUserLogin = (options = {}) => {
  const router = useRouter();
  return useMutation(
    'login',
    async (params: paginatedApiUserLoginProps) => {
      const {
        data: { data },
      } = await api.post(FETCH_URL.user_login, params);
      return data;
    },
    {
      onSuccess: (data: any) => {
        localStorage.setItem('logged_in', '1');
        router.push('/');
      },
      ...options,
    }
  );
};

/**
 * Custom hook for user logout.
 *
 * @param {object} options - The mutation options.
 * @returns {object} - The mutation result.
 */
export const useUserLogout = (options = {}) => {
  const router = useRouter();
  return useMutation(
    'logout',
    async () => {
      const {
        data: { data },
      } = await api.post(FETCH_URL.user_logout);
      return data;
    },
    {
      onSuccess: (data: any) => {
        localStorage.setItem('logged_in', '0');
        router.push('/login');
      },
      ...options,
    }
  );
};

/**
 * Custom hook for fetching user information.
 *
 * @param {object} options - The query options.
 * @returns {object} - The query result.
 */
export const useUserInfo = (options = {}) => {
  const queryClient = useQueryClient();
  return useQuery(
    'user',
    async () => {
      const { data } = await api.get(FETCH_URL.user_info);
      return data;
    },
    {
      placeholderData: queryClient.getQueryData(`user`) || {},
      ...options,
    }
  );
};

/**
 * Custom hook for deleting a user record.
 *
 * @param {object} options - The mutation options.
 * @returns {object} - The mutation result.
 */
export const useDeleteUserRecord = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(
    'deleteRecord',
    async (id: number) => {
      const {
        data: { data, success },
      } = await api.delete(`${FETCH_URL.delete_user_record}?id=${id}`);
      if (!success) {
        throw new Error('The endpoint fails for some reason');
      }
      return data;
    },
    {
      onSuccess: (data: any) => {
        console.log('Record Deleted');
      },
      onMutate: async (id) => {
        const previousEmployee = queryClient.getQueryData(`records`);
        queryClient.setQueryData('records', (old: any) => {
          const index = old.data.findIndex((item: any) => item.id === id);
          const newRecords = [...old.data];
          newRecords.splice(index, 1);
          return newRecords;
        });
        await queryClient.cancelQueries('records');
        return () => queryClient.setQueryData('records', previousEmployee);
      },
      onError: (error, values, rollback = () => {}) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries('records');
      },
      ...options,
    }
  );
};
