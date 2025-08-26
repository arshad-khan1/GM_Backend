import mongoose, { Schema, Document } from 'mongoose';
import { Password } from '@interfaces/passwords.interface';

const passwordSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});

const PasswordModel = mongoose.model<Password & Document>('Password', passwordSchema);

export default PasswordModel;
