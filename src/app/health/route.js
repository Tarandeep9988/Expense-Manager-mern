import { NextResponse } from 'next/server';
import dbConnect from '@/lib/config/db';

export async function GET() {
  try {
    // Check database connection
    await dbConnect();
    
    return NextResponse.json({
      status: 'ok',
      message: 'Service is healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Service is unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    }, { status: 503 });
  }
}
