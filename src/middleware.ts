import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.get('poll-token')) return;

  const random = nanoid();
  const res = NextResponse.next();

  res.cookies.set('poll-token', random, { sameSite: 'strict' });

  return res;
}

export const config = {
  matcher: ['/:path*']
};
