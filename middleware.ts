import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import authApi from './features/auth/auth.service';
import CookieKeys from './lib/constants/cookieKeys';
import { PROTECTED_ROUTES } from './lib/constants/protected-routes';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(CookieKeys.ACCESS_TOKEN)?.value;
  const authPath = '/auth';
  const signInPath = `${authPath}/login`;
  const pathName = request.nextUrl.pathname;

  if (!accessToken && request.nextUrl.pathname.includes(authPath)) {
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      const user = await authApi.checkAuth(accessToken);

      const isAccountTypeValid = PROTECTED_ROUTES[
        PROTECTED_ROUTES.findIndex((route) => pathName.includes(route.path))
      ].accountTypes.includes(user.type);

      if (isAccountTypeValid && !pathName.includes(authPath)) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL('/', request.url));
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
     * - *.png (image files)
     * - *.jpg (image files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon.ico).*)',
  ],
};
