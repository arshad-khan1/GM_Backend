import { IsString, IsOptional, IsMongoId, IsDateString, IsEnum, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
  @IsMongoId()
  public gymId: string;

  @IsMongoId()
  public gymUserId: string;

  @IsMongoId()
  @IsOptional()
  public memberId?: string;

  @IsEnum(['payment_reminder', 'membership_renewal', 'general'])
  public type: 'payment_reminder' | 'membership_renewal' | 'general';

  @IsString()
  public message: string;

  @IsBoolean()
  @IsOptional()
  public readStatus?: boolean;

  @IsEnum(['email', 'sms', 'in_app'])
  public sendMethod: 'email' | 'sms' | 'in_app';

  @IsDateString()
  public scheduledFor: string;

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateNotificationDto {
  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsMongoId()
  @IsOptional()
  public gymUserId?: string;

  @IsMongoId()
  @IsOptional()
  public memberId?: string;

  @IsEnum(['payment_reminder', 'membership_renewal', 'general'])
  @IsOptional()
  public type?: 'payment_reminder' | 'membership_renewal' | 'general';

  @IsString()
  @IsOptional()
  public message?: string;

  @IsBoolean()
  @IsOptional()
  public readStatus?: boolean;

  @IsEnum(['email', 'sms', 'in_app'])
  @IsOptional()
  public sendMethod?: 'email' | 'sms' | 'in_app';

  @IsDateString()
  @IsOptional()
  public scheduledFor?: string;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}
