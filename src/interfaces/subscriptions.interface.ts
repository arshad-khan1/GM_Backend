import { Document } from 'mongoose';

export interface Subscription extends Document {
  memberId: string;
  gymId: string;
  membershipPlanId: string;
  startDate: Date;
  endDate: Date;
  subscriptionActive: number; // 0-Inactive, 1-Active
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
