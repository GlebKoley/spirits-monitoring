/* eslint-disable perfectionist/sort-objects */
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Spirit } from '@/entities/spirit/model/types';
import { apiClient } from '@/shared/api/apiClient';
import { SPIRITS_QUERY_KEY } from '@/shared/constants/query';

interface CaptureResponse {
   success: boolean;
   message: string;
}

export const useCaptureSpirit = () => {
   const queryClient = useQueryClient();
   const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   const mutation = useMutation({
      mutationFn: (id: string) => {
         return apiClient.post<CaptureResponse>('/api/capture', { id });
      },

      onMutate: async (id) => {
         await queryClient.cancelQueries({ queryKey: SPIRITS_QUERY_KEY.spirits });

         const previousSpirits = queryClient.getQueryData<Spirit[]>(SPIRITS_QUERY_KEY.spirits);

         if (previousSpirits) {
            queryClient.setQueryData<Spirit[]>(SPIRITS_QUERY_KEY.spirits, (old) =>
               old?.map((anomaly) => (anomaly.id === id ? { ...anomaly, status: 'Captured' } : anomaly)),
            );
         }

         return { previousSpirits };
      },

      onError: (err, _, context) => {
         if (context?.previousSpirits) {
            queryClient.setQueryData(SPIRITS_QUERY_KEY.spirits, context.previousSpirits);
         }
         console.error('Capture failed:', err);

         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
         }

         timeoutRef.current = setTimeout(() => {
            mutation.reset();
         }, 1100);
      },
   });

   const { mutate, isError } = mutation;

   return { mutate, isError };
};
