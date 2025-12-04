'use client';

import { JSX, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useGetSpirits } from '@/entities/spirit/model/queries';
import { Spirit } from '@/entities/spirit/model/types';
import SpiritCard from '@/entities/spirit/ui/SpiritCard';
import Header from '@/widgets/Header/ui/Header';

import styles from './SpiritsList.module.scss';

export default function SpiritsList() {
   const { data, isError, isLoading } = useGetSpirits();
   const queryClient = useQueryClient();

   useEffect(() => {
      const sseEvent = new EventSource('/api/sse');

      sseEvent.onmessage = (event) => {
         try {
            const update = JSON.parse(event.data);

            queryClient.setQueryData<Spirit[]>(['spirits'], (old) => {
               if (!old) return old;
               return old.map((spirit) => (spirit.id === update.id ? { ...spirit, ...update } : spirit));
            });
         } catch (e) {
            console.error('error in sseEvent message', e);
         }
      };

      return () => sseEvent.close();
   }, [queryClient]);

   if (isLoading) return <div>Loading data...</div>;
   if (isError) return <div>Error fetching data</div>;

   return (
      <>
         <Header data={data ?? []} />
         <div className={styles.container}>
            {data?.map(
               (spirit: Spirit): JSX.Element => (
                  <SpiritCard data={spirit} key={spirit.id} />
               ),
            )}
         </div>
      </>
   );
}
