import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsNumber()
  public role: number;

  @IsString()
  public phone: string;

  @IsString()
  public profilePhotoUrl: string;

  @IsNumber()
  public isVerified: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public fullName?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsNumber()
  @IsOptional()
  public role?: number;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public profilePhotoUrl?: string;

  @IsNumber()
  @IsOptional()
  public isVerified?: number;

  @IsNumber()
  @IsOptional()
  public isActive?: number;
}
