import { IsOptional, IsNumber, IsMongoId, IsEmail } from 'class-validator';

export class CreateGymUserDto {
  @IsMongoId()
  public gymId: string;

  @IsMongoId()
  public userId: string;

  @IsNumber()
  public role: number; // 0-Admin, 1-Staff

  @IsEmail()
  public email: string;

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

  @IsEmail()
  @IsOptional()
  public email?: string;

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
