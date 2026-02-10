import { NextResponse } from 'next/server';
import User from '@/lib/models/User';
import dbConnect from '@/lib/config/db';
import cloudinary from '@/lib/config/cloudinary';
import { protectRoute } from '@/lib/middleware/auth';

export async function GET(req) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    return NextResponse.json(
      { success: true, data: auth.user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const auth = await protectRoute(req);
    
    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, message: auth.error },
        { status: auth.status }
      );
    }

    await dbConnect();

    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const avatarFile = formData.get('avatarImage');

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    let result = null;
    try {
      // If there's an image file in the request, upload it to cloudinary
      if (avatarFile) {
        const bytes = await avatarFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Upload to cloudinary with streaming
        result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'users/avatars' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        updates.avatarImage = {
          secure_url: result.secure_url,
          public_id: result.public_id,
        };
      }

      const updatedUser = await User.findByIdAndUpdate(auth.user._id, updates, { 
        new: true, 
        runValidators: true 
      });

      // If there was previous image, file successfully uploaded and user updated, delete old image from cloudinary
      if (result && auth.user.avatarImage?.public_id) {
        await cloudinary.uploader.destroy(auth.user.avatarImage.public_id);
      }

      return NextResponse.json(
        { success: true, data: updatedUser },
        { status: 200 }
      );
    } catch (error) {
      console.error('Update user error:', error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Patch user error:', error);
    return NextResponse.json(
      { success: false, message: 'Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
