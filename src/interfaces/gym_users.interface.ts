import { Document } from 'mongoose';

export interface GymUser extends Document {
  gymId: string;
  userId: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    profilePhotoUrl?: string;
  };
  role: number; // 0-Admin, 1-Staff
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
