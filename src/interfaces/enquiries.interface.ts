import { Document } from 'mongoose';

export interface Enquiry extends Document {
  gymId: string;
  handledBy: string;
  title: string;
  description: string;
  name: string;
  phone: string;
  address: string;
  isActive: number; // 0-Active, 1-Inactive
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
