import { NextRequest, NextResponse } from 'next/server';

import { ThreatLevel } from '@/entities/spirit/model/types';
import { dataBase } from '@/shared/api/dataBase';

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const GET = (req: NextRequest) => {
   const encoder = new TextEncoder();

   const stream = new ReadableStream({
      start(controller) {
         const interval = setInterval(() => {
            const activeSpirits = dataBase.getAll().filter(({ status }) => status === 'Active');
            if (activeSpirits.length === 0) {
               clearInterval(interval);
               controller.close();
               return;
            }

            const spirit = getRandomItem(activeSpirits);
            const newThreatLevel = getRandomItem(Object.values(ThreatLevel));

            if (spirit.threatLevel !== newThreatLevel) {
               dataBase.update(spirit.id, { threatLevel: newThreatLevel });

               controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ id: spirit.id, threatLevel: newThreatLevel })}\n\n`),
               );
            }
         }, 5000);

         req.signal.addEventListener('abort', () => {
            clearInterval(interval);
            controller.close();
         });
      },
   });

   return new NextResponse(stream, {
      headers: {
         Connection: 'keep-alive',
         'Cache-Control': 'no-cache',
         'Content-Type': 'text/event-stream',
      },
   });
};
