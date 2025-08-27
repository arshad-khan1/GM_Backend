import { IsString, IsOptional, IsMongoId, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PermissionDto {
  @IsString()
  public resource: string;

  @IsArray()
  @IsString({ each: true })
  public actions: string[];
}

export class CreateRolePermissionDto {
  @IsEnum(['superadmin', 'admin', 'staff', 'member'])
  public role: 'superadmin' | 'admin' | 'staff' | 'member';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  public permissions: PermissionDto[];

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateRolePermissionDto {
  @IsEnum(['superadmin', 'admin', 'staff', 'member'])
  @IsOptional()
  public role?: 'superadmin' | 'admin' | 'staff' | 'member';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  @IsOptional()
  public permissions?: PermissionDto[];

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}
