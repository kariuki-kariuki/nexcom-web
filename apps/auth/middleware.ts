import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';
import { APP_URL } from '@repo/shared-logic';


const publicRoutes = ['/auth/login', '/auth/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  // const nextHeaders = await headers()
  // const referrer = nextHeaders.get('referer');
  // console.log("Referrer Middleware: ", referrer)
  // Extract cookies asynchronously
  const cookieStore = cookies();
  const token = (await cookieStore).get('Authentication')?.value;

  // Attempt to decrypt the session token
  const claims = await decrypt(token);
  const isAuthenticated = !!claims?.userId;

  // Allow access to the root route '/' for everyone
  if ((path.startsWith("/login") || path.startsWith("/signup")) && isAuthenticated){
    return NextResponse.redirect(new URL(`${APP_URL}/chat`, req.nextUrl));
  }
  
  if (path === '/') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Proceed if all checks pass
  return NextResponse.next();
}

// Helper function to decrypt session token and extract claims
async function decrypt(token: string | undefined) {
  if (!token) return null;

  try {
    return decodeJwt(token);
  } catch (error) {
    console.error('Failed to verify session token:', error);
    return null;
  }
}

// Configure middleware to exclude specific routes and assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|mp3)$).*)'],
};
