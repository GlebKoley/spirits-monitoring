import { NextResponse } from 'next/server';

import { dataBase } from '@/shared/api/dataBase';

const POST = async (req: Request) => {
   try {
      const { id } = await req.json();

      const timeout = 300;
      await new Promise((resolve) => setTimeout(resolve, timeout));

      if (Math.random() < 0.3) {
         return NextResponse.json({ success: false, message: 'The spirit is too strong.' }, { status: 400 });
      }

      const spirit = dataBase.getById(id);

      if (!spirit) {
         return NextResponse.json({ success: false, message: 'Spirit not found' }, { status: 404 });
      }

      const updatedSpirit = dataBase.update(id, { status: 'Captured' });

      return NextResponse.json({ success: true, spirit: updatedSpirit, message: 'Capture successful' });
   } catch (e) {
      console.error(e);
      return NextResponse.error();
   }
};

export { POST };
