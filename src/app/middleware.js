import { NextResponse } from 'next/server';
import { onAuthStateChanged } from 'firebase/auth';
import getConfig from './2440111573/firebase/config';

export function middleware(request) {
  const { auth } = getConfig();
  return new Promise((resolve) => {

    onAuthStateChanged(auth, (user) => {

      if (!user && request.nextUrl.pathname.startsWith('/2440111573/sesi-10') && request.nextUrl.pathname !== '/2440111573/sesi-10/login') {
        const url = request.nextUrl.clone();
        url.pathname = '/2440111573/sesi-10/login';
        resolve(NextResponse.redirect(url));
      } else {
        resolve(NextResponse.next());
      }

    });

  });
}

export const config = {
  matcher: ['/2440111573/sesi-10/:path*'], 
}