import { Document } from 'mongoose';

export interface Member extends Document {
  gymId: string;
  userId: string;
  registeredBy: string;
  batch?: string;
  dateOfBirth: Date;
  subscriptions: string[]; // Array of subscription IDs
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
