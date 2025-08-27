import { Document } from 'mongoose';

type PaymentStatus = 'paid' | 'pending' | 'advance_paid' | 'scheduled';

export interface Payment extends Document {
  subscriptionId: string;
  memberId: string;
  gymId: string;
  amount: number;
  dueAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  scheduledPaymentDate?: Date;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
