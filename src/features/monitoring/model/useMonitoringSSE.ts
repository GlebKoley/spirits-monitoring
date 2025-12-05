import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Spirit } from '@/entities/spirit/model/types';
import { SPIRITS_QUERY_KEY } from '@/shared/constants/query';

const useMonitoringSSE = () => {
   const queryClient = useQueryClient();

   useEffect(() => {
      const sseEvent = new EventSource('/api/sse');

      sseEvent.onmessage = (event) => {
         try {
            const update: Spirit = JSON.parse(event.data);

            queryClient.setQueryData<Spirit[]>(SPIRITS_QUERY_KEY.spirits, (old) => {
               if (!old) return old;

               return old.map((spirit) => (spirit.id === update.id ? { ...spirit, ...update } : spirit));
            });
         } catch (e) {
            console.error('error in sseEvent message', e);
         }
      };

      return () => sseEvent.close();
   }, [queryClient]);
};

export default useMonitoringSSE;
