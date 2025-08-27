import { Document } from 'mongoose';

type NotificationType = 'payment_reminder' | 'membership_renewal' | 'general';
type SendMethod = 'email' | 'sms' | 'in_app';

export interface Notification extends Document {
  gymId: string;
  gymUserId: string;
  memberId?: string;
  type: NotificationType;
  message: string;
  readStatus: boolean;
  sendMethod: SendMethod;
  scheduledFor: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
