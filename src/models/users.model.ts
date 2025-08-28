import mongoose, { Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  role: {
    type: Number,
    required: true,
    enum: [0, 1, 2], // 0-Superadmin, 1-Admin(Owner)/Staff, 2-Member
    default: 2, // Default to Member
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  profilePhotoUrl: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Number,
    default: 0, // 0 - Not Verified, 1 - Verified
  },
  isActive: {
    type: Number,
    default: 1, // 0 - Inactive, 1 - Active
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

// Add indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 });

// Add timestamps
userSchema.set('timestamps', true);

const UserModel = mongoose.model<User & Document>('User', userSchema);

export default UserModel;
