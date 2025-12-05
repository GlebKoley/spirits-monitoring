'use client';

import { JSX } from 'react';

import { Spirit } from '@/entities/spirit/model/types';
import { useGetSpirits } from '@/entities/spirit/model/useGetSpirits';
import SpiritCard from '@/entities/spirit/ui/SpiritCard';
import useMonitoringSSE from '@/features/monitoring/model/useMonitoringSSE';
import Header from '@/widgets/Header/ui/Header';

import styles from './SpiritsList.module.scss';

export default function SpiritsList() {
   const { data, isError, isLoading } = useGetSpirits();
   useMonitoringSSE();

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
