import { NextResponse } from 'next/server';
import { protectRoute } from '@/lib/middleware/auth';

export async function POST(req) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    // Logout logic - clear cookie
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
