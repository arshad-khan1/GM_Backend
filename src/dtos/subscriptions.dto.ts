import { IsOptional, IsNumber, IsMongoId, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsMongoId()
  public memberId: string;

  @IsMongoId()
  public gymId: string;

  @IsMongoId()
  public membershipPlanId: string;

  @IsDateString()
  public startDate: string;

  @IsDateString()
  public endDate: string;

  @IsNumber()
  @IsOptional()
  public subscriptionActive?: number; // 0-Inactive, 1-Active

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateSubscriptionDto {
  @IsMongoId()
  @IsOptional()
  public memberId?: string;

  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsMongoId()
  @IsOptional()
  public membershipPlanId?: string;

  @IsDateString()
  @IsOptional()
  public startDate?: string;

  @IsDateString()
  @IsOptional()
  public endDate?: string;

  @IsNumber()
  @IsOptional()
  public subscriptionActive?: number;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}
