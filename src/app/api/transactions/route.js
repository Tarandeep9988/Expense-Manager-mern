import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/Transaction';
import dbConnect from '@/lib/config/db';
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

    await dbConnect();
    
    const body = await req.json();
    const { title, amount, type, category, description, date } = body;

    // Validate required fields
    if (!title || amount === undefined || !type || !category || !date) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transaction = await Transaction.create({
      userId: auth.user._id,
      title,
      amount,
      type,
      category: category.toLowerCase(),
      description,
      date,
    });

    return NextResponse.json(
      { success: true, data: transaction },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create transaction: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await dbConnect();

    const transactions = await Transaction.find({ userId: auth.user._id }).sort({ date: -1 });

    return NextResponse.json(
      { success: true, data: transactions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
