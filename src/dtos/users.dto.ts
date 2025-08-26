import { IsString, IsEmail, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsEnum(['SELLER', 'BUYER', 'BOTH'])
  public rolePreference: 'SELLER' | 'BUYER' | 'BOTH';

  @IsNumber()
  public roles: number;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public contactNumber?: string;

  @IsString()
  @IsOptional()
  public companyName?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsNumber()
  @IsOptional()
  public verified?: number;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsOptional()
  public metadata?: any;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsEnum(['SELLER', 'BUYER', 'BOTH'])
  @IsOptional()
  public rolePreference?: 'SELLER' | 'BUYER' | 'BOTH';

  @IsNumber()
  @IsOptional()
  public roles?: number;

  @IsString()
  @IsOptional()
  public contactNumber?: string;

  @IsString()
  @IsOptional()
  public companyName?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsNumber()
  @IsOptional()
  public verified?: number;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsOptional()
  public metadata?: any;
}
