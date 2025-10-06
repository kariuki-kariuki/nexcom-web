import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';
import { url } from 'inspector';
import { APP_URL, AUTH_URL } from './lib/common/constants';

// Define protected and public routes
const protectedRoutes = [
  '/chat',
  '/dashboard',
  '/dashboard/products',
  '/dashboard/users',
  '/dashboard/settings',
  '/dashboard/projects',
  '/dashboard/blogs',
  '/dashboard/faq',
  '/dashboard/gallery',
  '/dashboard/jobs',
  '/dashboard/tenders',
  '/dashboard/resources',
  '/business/register',
];
const publicRoutes = ['/auth/login', '/auth/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Extract cookies asynchronously
  const cookieStore = cookies();
  const token = cookieStore.get('Authentication')?.value;

  // Attempt to decrypt the session token
  const claims = await decrypt(token);
  const shopId = claims?.shopId;
  const isAuthenticated = !!claims?.userId;

  // Route access determination
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if(path.startsWith('/chat') && !isAuthenticated){
    return NextResponse.redirect(new URL(`${AUTH_URL}/login?redirect=${APP_URL}${path}`))
  }

  // Revoke access to the '/videos' route
  if (path.startsWith('/videos')) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Allow access to the root route '/' for everyone
  
  if (path === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/chat', req.nextUrl));

    }
    return NextResponse.next();
  }

  if (path.startsWith('/business')) {
    return NextResponse.next();
  }

  // Redirect to login if attempting to access a protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(`${AUTH_URL}/login`, req.nextUrl));
  }

  // Redirect authenticated users from public routes to '/chat'
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/chat', req.nextUrl));
  }
  if(path === '/business/register' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // Restrict access to shop owner routes to authenticated users with a shopId
  if (path.startsWith('/dashboard') && !shopId) {
    return NextResponse.redirect(new URL('/chat', req.nextUrl));
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
