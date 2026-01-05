import User from "../models/user.model";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ( !name?.trim() || !email?.trim() || !password?.trim() ) {
      return res.status(400).json({
        success : false,
        message: 'Fields are invalid or absent'
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    let newUser = await User.create({
      name, 
      email, 
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });

    // Saving user 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim() ) {
      return res.status(400).json({
        success : false,
        message: 'Fields are invalid or absent'
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    delete user.password;

    return res.status(200).json({
      success: true,
      message: `${user.name} logged in`,
      user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const imageData = req.body.image;

    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: imageData,
    }, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Avatar Image set successfully',
      user,
    })
    
  } catch (error) {
    return next(error);
  }
}

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: {$ne: req.params.id }}).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    
    return res.json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  setAvatar,
  allUsers,
}