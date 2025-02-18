import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid Email'], 
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    uuid: {
      type: String,
      default: () => uuidv4(), 
      unique: true,  
    },
  },
  { timestamps: true } 
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
