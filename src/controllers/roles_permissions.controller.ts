import { NextFunction, Request, Response } from 'express';
import { CreateRolePermissionDto, UpdateRolePermissionDto } from '@dtos/roles_permissions.dto';
import RolePermissionsService from '@services/roles_permissions.service';

export class RolePermissionsController {
  public rolePermissionsService = new RolePermissionsService();

  public getRolePermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRolePermissionsData = await this.rolePermissionsService.findAllRolePermissions();

      res.status(200).json({ data: findAllRolePermissionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRolePermissionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rolePermissionId: string = req.params.id;
      const findOneRolePermissionData = await this.rolePermissionsService.findRolePermissionById(rolePermissionId);

      res.status(200).json({ data: findOneRolePermissionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRolePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rolePermissionData: CreateRolePermissionDto = req.body;
      const createRolePermissionData = await this.rolePermissionsService.createRolePermission(rolePermissionData);

      res.status(201).json({ data: createRolePermissionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRolePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rolePermissionId: string = req.params.id;
      const rolePermissionData: UpdateRolePermissionDto = req.body;
      const updateRolePermissionData = await this.rolePermissionsService.updateRolePermission(rolePermissionId, rolePermissionData);

      res.status(200).json({ data: updateRolePermissionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRolePermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rolePermissionId: string = req.params.id;
      const deleteRolePermissionData = await this.rolePermissionsService.deleteRolePermission(rolePermissionId);

      res.status(200).json({ data: deleteRolePermissionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
