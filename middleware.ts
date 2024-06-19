import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import authApi from './features/auth/auth.service';
import CookieKeys from './lib/constants/cookieKeys';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(CookieKeys.ACCESS_TOKEN)?.value;
  const authPath = '/auth';
  const signInPath = `${authPath}/login`;

  if (!accessToken && request.nextUrl.pathname.includes(authPath)) {
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      await authApi.checkAuth(accessToken);

      return request.nextUrl.pathname.includes(authPath)
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();
    } catch (error: unknown) {
      const redirectRes = NextResponse.redirect(
        new URL(signInPath, request.url),
      );
      redirectRes.cookies.delete(CookieKeys.ACCESS_TOKEN);
      return redirectRes;
    }
  }

  return NextResponse.redirect(new URL(signInPath, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
