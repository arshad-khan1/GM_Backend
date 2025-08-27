import { Document } from 'mongoose';

export interface Permission {
  resource: string;
  actions: string[];
}

export interface RolePermission extends Document {
  role: 'superadmin' | 'admin' | 'staff' | 'member';
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
