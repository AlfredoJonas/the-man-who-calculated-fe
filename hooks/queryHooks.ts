import { useQuery, useMutation, useQueryClient } from 'react-query';
import { FETCH_URL, api } from '../utils/api';
import { paginatedApiUserRecordsProps } from '../types';

export const useUserRecordsInfo = (params: paginatedApiUserRecordsProps, options={}) => {
  const queryClient = useQueryClient();
  return useQuery(
    'records',
    async () => {
        const {
            data,
        } = await api.get(FETCH_URL.user_records, { params });
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

export const useDeleteUserRecord = (options={}) => {
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
        console.log("Record Deleted");
      },
      onMutate: async (id) => {
        const previousEmployee = queryClient.getQueryData(`records`);
        queryClient.setQueryData('records', (old: any) => {
          const index = old.data.findIndex((item: any) => item.id === id);
          const newRecords = [...old.data];
          newRecords.splice(index,1);
          return newRecords
        });
        await queryClient.cancelQueries('records');
        return () => queryClient.setQueryData('records', previousEmployee);
      },
      onError: (error, values, rollback=()=>{}) => {
        rollback();
        console.log("ERROR ", error, values)
      },
      onSettled: () => {
        console.log();
        queryClient.invalidateQueries('records');
      },
      ...options,
    }
  );
};

