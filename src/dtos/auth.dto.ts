import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
