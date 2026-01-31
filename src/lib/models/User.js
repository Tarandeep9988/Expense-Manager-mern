import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    validate: [validator.isEmail, "Provide a valid email address"],
    lowercase: true,
  },
  password: {
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be atleast 8 characters long'],
    select: false,
  },
  avatarImage: {
    secure_url: {
      type: String,
      default: null,
    }, 
    public_id: {
      type: String,
      default: null,
    }
  }
}, { timestamps: true });


// Indexing on email for faster lookups and db level uniqueness
UserSchema.index({ email: 1 }, { unique: true });


UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 12);
})

UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

// clean up the returned user object
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
})

let User;
try {
  User = mongoose.model('User');
} catch {
  User = mongoose.model('User', UserSchema);
}

export default User;
