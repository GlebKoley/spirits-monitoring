/* eslint-disable perfectionist/sort-objects */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Spirit } from '@/entities/spirit/model/types';
import { apiClient } from '@/shared/api/apiClient';

interface CaptureResponse {
   success: boolean;
   message: string;
}

export const useCaptureSpirit = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (id: string) => {
         return apiClient.post<CaptureResponse>('/api/capture', { id });
      },

      onMutate: async (id) => {
         await queryClient.cancelQueries({ queryKey: ['spirits'] });

         const previousSpirits = queryClient.getQueryData<Spirit[]>(['spirits']);

         if (previousSpirits) {
            queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
               old?.map((anomaly) => (anomaly.id === id ? { ...anomaly, status: 'Captured' } : anomaly)),
            );
         }

         return { previousSpirits };
      },

      onError: (err, _, context) => {
         if (context?.previousSpirits) {
            queryClient.setQueryData(['spirits'], context.previousSpirits);
         }
         console.error('Capture failed:', err);
      },
   });
};
