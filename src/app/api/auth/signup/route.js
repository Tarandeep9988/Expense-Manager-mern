import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import dbConnect from '@/lib/config/db';
import { validateSignup } from '@/lib/utils/validation';
import { generateToken, setCookie } from '@/lib/utils/jwt';

export async function POST(req) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { name, email, password } = body;

    // Validate input
    const validation = validateSignup({ name, email, password });
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: user.toJSON(),
      },
      { status: 201 }
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
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
