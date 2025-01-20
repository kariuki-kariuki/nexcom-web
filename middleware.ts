import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

// Define protected and public routes
const protectedRoutes = ['/chat', '/dashboard',
  '/dashboard/products',
  '/dashboard/users',
  '/dashboard/settings',
  '/dashboard/projects',
  '/dashboard/blogs',
  '/dashboard/faq',
  '/dashboard/gallery',
  '/dashboard/jobs',
  '/dashboard/tenders',
  '/dashboard/resources'];
const publicRoutes = ['/auth/login', '/auth/signup'];
const shopOwnersRoutes = [
  '/dashboard',
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Extract cookies asynchronously
  const cookieStore = cookies();
  const token = cookieStore.get('Authentication')?.value;

  // Attempt to decrypt the session token
  const claims = await decrypt(token);
  const shopId = claims?.shop_id;
  const isAuthenticated = !!claims?.user_id;

  // Route access determination
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  

  // Allow access to the root route '/' for everyone
  if (path === '/') {
    return NextResponse.next();
  }

  // Redirect to login if attempting to access a protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // Redirect authenticated users from public routes to '/chat'
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/chat', req.nextUrl));
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
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
