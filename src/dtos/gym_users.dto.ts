import { IsOptional, IsNumber, IsMongoId, IsEmail } from 'class-validator';
import { IsObject, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserInfoDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public profilePhotoUrl?: string;
}

export class CreateGymUserDto {
  @IsMongoId()
  public gymId: string;

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsNumber()
  public role: number; // 0-Admin, 1-Staff

  @IsObject()
  @ValidateNested()
  @Type(() => UserInfoDto)
  @IsOptional()
  public userInfo?: UserInfoDto;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateGymUserDto {
  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsNumber()
  @IsOptional()
  public role?: number;

  @IsObject()
  @ValidateNested()
  @Type(() => UserInfoDto)
  @IsOptional()
  public userInfo?: UserInfoDto;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}

export class UpdateGymUserStatusDto {
  @IsMongoId()
  public _id: string;

  @IsNumber()
  public isActive: number;
}
