import { useQuery } from '@tanstack/react-query';

import { SPIRITS_QUERY_KEY } from '@/shared/constants/query';

import { getAllSpirits } from './api';

export const useGetSpirits = () => {
   return useQuery({
      queryFn: getAllSpirits,
      queryKey: SPIRITS_QUERY_KEY.spirits,
   });
};
