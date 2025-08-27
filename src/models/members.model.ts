import mongoose, { Schema, Document } from 'mongoose';
import { Member } from '@interfaces/members.interface';

const memberSchema: Schema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Gym',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    batch: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    subscriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
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
memberSchema.index({ gymId: 1, userId: 1 }, { unique: true });

const MemberModel = mongoose.model<Member & Document>('Member', memberSchema);

export default MemberModel;
