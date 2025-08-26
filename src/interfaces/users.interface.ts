import { Request } from 'express';

export interface User {
  _id: string;
  name: string;
  email: string;
  rolePreference: 'SELLER' | 'BUYER' | 'BOTH';
  roles: number;
  password?: string;
  contactNumber: string;
  companyName: string;
  city: string;
  verified: number;
  isActive: number;
  metadata: any;
  createdAt: Date;
  createdBy: string | null;
  updatedAt: Date;
  updatedBy: string | null;
}

export interface RequestWithUser extends Request {
  user: User;
}
