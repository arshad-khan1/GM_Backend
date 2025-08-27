import { Document } from 'mongoose';

export interface MembershipPlan extends Document {
  gymId: string;
  name: string;
  description?: string;
  durationInMonths: string;
  freeMonths?: string;
  price: number;
  benefits?: string[];
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
