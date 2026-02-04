import User from "@/lib/models/User";
import { verifyToken } from "@/lib/utils/jwt";
import dbConnect from "@/lib/config/db";

export async function protectRoute(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get token from cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return {
        authenticated: false,
        error: 'Not authorized, no token',
        status: 401,
      };
    }

    try {
      // Verify token
      const decoded = verifyToken(token);
      
      // Get user from database
      const user = await User.findById(decoded?.id).select('-password').lean();
      
      if (!user) {
        return {
          authenticated: false,
          error: "Not authorized, user not found",
          status: 401,
        };
      }

      return {
        authenticated: true,
        user,
        status: 200,
      };
    } catch (error) {
      return {
        authenticated: false,
        error: "Not authorized, token failed",
        status: 401,
      };
    }
  } catch (error) {
    console.error('Auth error:', error);
    return {
      authenticated: false,
      error: 'Server error',
      status: 500,
    };
  }
}
