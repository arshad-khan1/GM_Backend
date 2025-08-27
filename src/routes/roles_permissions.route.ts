import { Router } from 'express';
import { CreateRolePermissionDto, UpdateRolePermissionDto } from '@dtos/roles_permissions.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { RolePermissionsController } from '@controllers/roles_permissions.controller';

export class RolePermissionsRoute implements Routes {
  public path = '/role-permissions';
  public router = Router();
  public rolePermissionsController = new RolePermissionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.rolePermissionsController.getRolePermissions);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.rolePermissionsController.getRolePermissionById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      ValidationMiddleware(CreateRolePermissionDto),
      this.rolePermissionsController.createRolePermission,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(UpdateRolePermissionDto),
      this.rolePermissionsController.updateRolePermission,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.rolePermissionsController.deleteRolePermission);
  }
}
