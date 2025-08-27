import mongoose, { Schema, Document } from 'mongoose';
import { Gym } from '@interfaces/gyms.interface';

const gymSchema: Schema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      line1: { type: String, required: true, trim: true },
      line2: { type: String, trim: true, default: '' },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zipcode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    location: {
      lat: { type: String, required: true },
      lon: { type: String, required: true },
      name: { type: String, required: true, trim: true },
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

// Add indexes
gymSchema.index({ ownerId: 1 });
gymSchema.index({ 'address.city': 1 });
gymSchema.index({ 'address.state': 1 });

const GymModel = mongoose.model<Gym & Document>('Gym', gymSchema);

export default GymModel;
