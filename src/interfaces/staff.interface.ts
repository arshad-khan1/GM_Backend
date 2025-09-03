import { Document } from 'mongoose';

export interface Staff extends Document {
  gymId: string;
  userId: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    profilePhotoUrl?: string;
  };
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
