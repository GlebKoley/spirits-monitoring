import { NextResponse } from 'next/server';

import { dataBase } from '@/shared/api/dataBase';

const GET = () => {
   return NextResponse.json(dataBase.getAll());
};

export { GET };
