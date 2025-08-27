import { Document } from 'mongoose';

export interface GymUser extends Document {
  gymId: string;
  userId: string;
  role: number; // 0-Admin, 1-Staff
  email: string;
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
