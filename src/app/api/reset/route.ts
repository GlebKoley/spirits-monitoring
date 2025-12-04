import { NextResponse } from 'next/server';

import { dataBase } from '@/shared/api/dataBase';

const GET = () => {
   dataBase.reset();
   return NextResponse.json({ success: true });
};

export { GET };
