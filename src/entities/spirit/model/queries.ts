import { useQuery } from '@tanstack/react-query';

import { getAllSpirits } from './api';

export const useGetSpirits = () => {
   return useQuery({
      queryKey: ['spirits'],
      queryFn: getAllSpirits,
   });
};
