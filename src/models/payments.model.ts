import mongoose, { Schema, Document } from 'mongoose';
import { Payment } from '@interfaces/payments.interface';

const paymentSchema: Schema = new Schema(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
      required: true,
      index: true,
    },
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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    dueAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['paid', 'pending', 'advance_paid', 'scheduled'],
      default: 'pending',
    },
    scheduledPaymentDate: {
      type: Date,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
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
paymentSchema.index({ subscriptionId: 1 });
paymentSchema.index({ memberId: 1 });
paymentSchema.index({ gymId: 1 });
paymentSchema.index({ paymentStatus: 1 });
paymentSchema.index({ transactionDate: 1 });
paymentSchema.index({ scheduledPaymentDate: 1 });

const PaymentModel = mongoose.model<Payment & Document>('Payment', paymentSchema);

export default PaymentModel;
