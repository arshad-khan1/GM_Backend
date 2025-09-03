import mongoose, { Schema, Document } from 'mongoose';
import { MembershipPlan } from '@interfaces/membership_plans.interface';

const membershipPlanSchema: Schema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Gym',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    durationInMonths: {
      type: String,
      required: true,
      trim: true,
    },
    freeMonths: {
      type: String,
      trim: true,
    },
    bonus: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Number,
      default: 1, // 0 - Inactive, 1 - Active
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
membershipPlanSchema.index({ gymId: 1 });
membershipPlanSchema.index({ price: 1 });

const MembershipPlanModel = mongoose.model<MembershipPlan & Document>('MembershipPlan', membershipPlanSchema);

export default MembershipPlanModel;
