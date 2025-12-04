import { NextRequest, NextResponse } from 'next/server';

const proxy = (request: NextRequest) => {
   return NextResponse.redirect(new URL('/monitoring', request.url));
};

export const config = {
   matcher: '/',
};

export default proxy;
