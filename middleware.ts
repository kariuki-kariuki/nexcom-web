import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

// Define protected and public routes
const protectedRoutes = [
  '/products',
  '/users',
  '/settings',
  '/projects',
  '/blogs',
  '/faq',
  '/gallery',
  'jobs',
  'tenders',
  'resources',
  'chat'
];
const publicRoutes = ['/login'];
const managerAdminRoutes = ['/users'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = (await cookies()).get('Authentication')?.value;

  // Attempt to decrypt the session token
  const claims = await decrypt(token);
  const userRole = claims?.role;
  const isAuthenticated = !!claims?.user_id;

  // Route access determination
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isManagerAdminRoute = managerAdminRoutes.includes(path);

  // Allow access to the root route '/' for everyone
  if (path === '/') {
    return NextResponse.next();
  }

  // Redirect to login if attempting to access a protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect authenticated users from other public routes to /products
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/products', req.nextUrl));
  }

  // Restrict access to manager and admin roles for specific routes
  if (isManagerAdminRoute && userRole !== 'Manager' && userRole !== 'Admin') {
    return NextResponse.redirect(new URL('/products', req.nextUrl));
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
    console.log('Failed to verify session:', error);
    return null;
  }
}

// Configure middleware to exclude specific routes and assets
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
