import { dehydrate } from '@tanstack/react-query';

import { getAllSpirits } from '@/entities/spirit/model/api';
import SpiritsList from '@/pages-ui/monitoring/SpiritsList/SpiritsList';
import { SPIRITS_QUERY_KEY } from '@/shared/constants/query';
import getQueryClient from '@/shared/lib/getQueryClient';
import Hydrate from '@/shared/lib/Hydrate';

export default async function Page() {
   const queryClient = getQueryClient();

   await queryClient.prefetchQuery({
      queryFn: getAllSpirits,
      queryKey: SPIRITS_QUERY_KEY.spirits,
   });

   return (
      <Hydrate state={dehydrate(queryClient)}>
         <SpiritsList />
      </Hydrate>
   );
}
