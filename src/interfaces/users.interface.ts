import { Request } from 'express';
import { Document } from 'mongoose';

export interface User extends Document {
  role: number; // 0-Superadmin, 1-Admin(Owner)/Staff, 2-Member
  email: string;
  fullName: string;
  phone?: string;
  profilePhotoUrl?: string;
  isActive: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
