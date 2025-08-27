import mongoose, { Schema, Document } from 'mongoose';
import { RolePermission } from '@interfaces/roles_permissions.interface';

const rolePermissionSchema: Schema = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ['superadmin', 'admin', 'staff', 'member'],
      index: true,
    },
    permissions: [
      {
        resource: {
          type: String,
          required: true,
          trim: true,
        },
        actions: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
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
rolePermissionSchema.index({ role: 1 }, { unique: true });

const RolePermissionModel = mongoose.model<RolePermission & Document>('RolePermission', rolePermissionSchema);

export default RolePermissionModel;
