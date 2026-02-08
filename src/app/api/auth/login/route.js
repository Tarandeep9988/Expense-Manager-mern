import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import dbConnect from '@/lib/config/db';
import { validateLogin } from '@/lib/utils/validation';
import { generateToken } from '@/lib/utils/jwt';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { email, password } = body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Find user with password field
    const user = await User.findOne({ email: validatedData.email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.comparePassword(validatedData.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: user.toJSON(),
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
