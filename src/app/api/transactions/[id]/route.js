import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/Transaction';
import dbConnect from '@/lib/config/db';
import { protectRoute } from '@/lib/middleware/auth';

export async function GET(req, { params }) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await dbConnect();
    const { id } = await params;

    const transaction = await Transaction.findOne({ _id: id, userId: auth.user._id });

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: transaction },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get transaction error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const transaction = await Transaction.findOne({ userId: auth.user._id, _id: id });

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }

    // Update transaction fields
    if (body.title !== undefined) transaction.title = body.title;
    if (body.amount !== undefined) transaction.amount = body.amount;
    if (body.description !== undefined) transaction.description = body.description;
    if (body.date !== undefined) transaction.date = body.date;
    if (body.type !== undefined) transaction.type = body.type;
    if (body.category !== undefined) transaction.category = body.category.toLowerCase();

    await transaction.save();

    return NextResponse.json(
      { success: true, data: transaction },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update transaction error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update transaction: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await dbConnect();
    const { id } = await params;

    const transaction = await Transaction.findOneAndDelete({ _id: id, userId: auth.user._id });

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Transaction deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete transaction error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
