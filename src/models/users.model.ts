import mongoose, { Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rolePreference: {
    type: String,
    enum: ['SELLER', 'BUYER', 'BOTH'],
    default: 'BOTH',
  },
  roles: {
    type: Number,
    default: 2, // Default to User role
  },
  contactNumber: {
    type: String,
  },
  companyName: {
    type: String,
  },
  city: {
    type: String,
  },
  verified: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Number,
    default: 1,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const UserModel = mongoose.model<User & Document>('User', userSchema);

export default UserModel;
