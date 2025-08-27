import RolePermissionModel from '@models/roles_permissions.model';
import { CreateRolePermissionDto, UpdateRolePermissionDto } from '@dtos/roles_permissions.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RolePermission } from '@interfaces/roles_permissions.interface';

class RolePermissionsService {
  public async findAllRolePermissions(): Promise<RolePermission[]> {
    const rolePermissions = await RolePermissionModel.find();
    return rolePermissions;
  }

  public async findRolePermissionById(rolePermissionId: string): Promise<RolePermission> {
    if (isEmpty(rolePermissionId)) throw new HttpException(400, 'RolePermissionId is empty');

    const findRolePermission = await RolePermissionModel.findOne({ _id: rolePermissionId });
    if (!findRolePermission) throw new HttpException(409, "RolePermission doesn't exist");

    return findRolePermission;
  }

  public async createRolePermission(rolePermissionData: CreateRolePermissionDto): Promise<RolePermission> {
    if (isEmpty(rolePermissionData)) throw new HttpException(400, 'rolePermissionData is empty');

    const createRolePermissionData = await RolePermissionModel.create({
      ...rolePermissionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createRolePermissionData;
  }

  public async updateRolePermission(rolePermissionId: string, rolePermissionData: UpdateRolePermissionDto): Promise<RolePermission> {
    if (isEmpty(rolePermissionData)) throw new HttpException(400, 'rolePermissionData is empty');

    const updateRolePermissionById = await RolePermissionModel.findByIdAndUpdate(
      rolePermissionId,
      { ...rolePermissionData, updatedAt: new Date() },
      { new: true },
    );
    if (!updateRolePermissionById) throw new HttpException(409, "RolePermission doesn't exist");

    return updateRolePermissionById;
  }

  public async deleteRolePermission(rolePermissionId: string): Promise<RolePermission> {
    const deleteRolePermissionById = await RolePermissionModel.findByIdAndDelete(rolePermissionId);
    if (!deleteRolePermissionById) throw new HttpException(409, "RolePermission doesn't exist");

    return deleteRolePermissionById;
  }
}

export default RolePermissionsService;
