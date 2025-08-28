import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterOwnerByEmailDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class RegisterOwnerByPhoneDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;
}

export class LoginOwnerByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class LoginOwnerByPhoneDto {
  @IsString()
  @IsNotEmpty()
  public phone: string;
}
