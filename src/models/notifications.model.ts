import mongoose, { Schema, Document } from 'mongoose';
import { Notification } from '@interfaces/notifications.interface';

const notificationSchema: Schema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Gym',
      required: true,
      index: true,
    },
    gymUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['payment_reminder', 'membership_renewal', 'general'],
      default: 'general',
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    readStatus: {
      type: Boolean,
      default: false,
    },
    sendMethod: {
      type: String,
      required: true,
      enum: ['email', 'sms', 'in_app'],
      default: 'in_app',
    },
    scheduledFor: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Add indexes
notificationSchema.index({ gymId: 1 });
notificationSchema.index({ gymUserId: 1 });
notificationSchema.index({ memberId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ readStatus: 1 });
notificationSchema.index({ scheduledFor: 1 });

const NotificationModel = mongoose.model<Notification & Document>('Notification', notificationSchema);

export default NotificationModel;
