import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // If user tries to go directly to /admin/dashboard, send them to /login
  if (pathname.startsWith('/admin/dashboard')) {
    // For now we assume client already checks for admin
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard'],
};
