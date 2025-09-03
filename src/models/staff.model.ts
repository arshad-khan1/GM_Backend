import { Staff } from '@/interfaces/staff.interface';
import mongoose, { Schema, Document } from 'mongoose';

const staffSchema: Schema = new Schema(
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
    userInfo: {
      name: {
        type: String,
        trim: true,
        default: '',
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: '',
      },
      phone: {
        type: String,
        trim: true,
        default: '',
      },
      profilePhotoUrl: {
        type: String,
        default: '',
      },
    },
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

// Add compound index for unique gym-user relationship
staffSchema.index({ gymId: 1, userId: 1 }, { unique: true });

const StaffModel = mongoose.model<Staff & Document>('Staff', staffSchema);

export default StaffModel;
