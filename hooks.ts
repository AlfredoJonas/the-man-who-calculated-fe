import { useQuery, useQueryClient } from 'react-query';
import { FETCH_URL, api } from './utils/api';
import { paginatedApiProps } from './types';

export const useUserRecordsInfo = ({page, size, search, filter, order}: paginatedApiProps, options={}) => {
  const queryClient = useQueryClient();
  
  return useQuery(
    `records`,
    async () => {
        const params = {
            "page": page,
            "size": size,
            "search": search,
            "filter": filter,
            "order": order
        }
        const {
            data,
        } = await api.get(FETCH_URL.user_records, { params });
        return data;
    },
    {
      onSuccess: (data: any) => {
        //console.log("Success", data);
      },
      placeholderData: queryClient.getQueryData(`records`) || {},
      ...options,
    }
  );
};
