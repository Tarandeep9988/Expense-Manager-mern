import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProtectedLayoutClient from "@/components/ProtectedLayoutClient";
import { verifyToken } from "@/lib/utils/jwt";
import User from "@/lib/models/User";
import dbConnect from "@/lib/config/db";

const layout = async ({children}) => {
  try {
    await dbConnect();
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return redirect("/login");
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await User.findById(decoded?.id).select('-password').lean();
    
    if (!user) {
      return redirect("/login");
    }

    // Convert user object to plain object for serialization
    const userData = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatarImage: user.avatarImage,
      createdAt: user.createdAt,
    };

    return (
      <ProtectedLayoutClient userData={userData}>
        {children}
      </ProtectedLayoutClient>
    )
  } catch (error) {
    console.log("Auth check failed:", error.message);
    return redirect("/login");
  }
}

export default layout