import mongoose, { Schema, Document } from 'mongoose';
import { Subscription } from '@interfaces/subscriptions.interface';

const subscriptionSchema: Schema = new Schema(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
      index: true,
    },
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Gym',
      required: true,
      index: true,
    },
    membershipPlanId: {
      type: Schema.Types.ObjectId,
      ref: 'MembershipPlan',
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    subscriptionActive: {
      type: Number,
      required: true,
      enum: [0, 1], // 0-Inactive, 1-Active
      default: 1,
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
subscriptionSchema.index({ memberId: 1 });
subscriptionSchema.index({ gymId: 1 });
subscriptionSchema.index({ membershipPlanId: 1 });
subscriptionSchema.index({ subscriptionActive: 1 });
subscriptionSchema.index({ startDate: 1, endDate: 1 });

const SubscriptionModel = mongoose.model<Subscription & Document>('Subscription', subscriptionSchema);

export default SubscriptionModel;
