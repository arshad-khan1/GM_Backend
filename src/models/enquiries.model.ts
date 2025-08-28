import mongoose, { Schema, Document } from 'mongoose';
import { Enquiry } from '@interfaces/enquiries.interface';

const enquirySchema: Schema = new Schema(
  {
    gymId: {
      type: Schema.Types.ObjectId,
      ref: 'Gym',
      required: true,
      index: true,
    },
    handledBy: {
      type: Schema.Types.ObjectId,
      ref: 'GymUser',
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Number,
      default: 0, // 0-Active, 1-Inactive
      enum: [0, 1],
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
enquirySchema.index({ gymId: 1 });
enquirySchema.index({ isActive: 1 });

const EnquiryModel = mongoose.model<Enquiry & Document>('Enquiry', enquirySchema);

export default EnquiryModel;
