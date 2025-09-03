import { IsString, IsOptional, IsNumber, IsMongoId, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMembershipPlanDto {
  @IsMongoId()
  public gymId: string;

  @IsString()
  @Transform(({ value, obj }) => (value ?? obj?.planName ?? obj?.name))
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  @Transform(({ value, obj }) => (value ?? obj?.duration ?? obj?.durationInMonths))
  public durationInMonths: string;

  @IsString()
  @IsOptional()
  public freeMonths?: string;

  @IsString()
  @IsOptional()
  public bonus?: string;

  @IsString()
  @IsOptional()
  public image?: string; // URL or path

  @IsNumber()
  public price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public benefits?: string[];

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateMembershipPlanDto {
  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value, obj }) => (value ?? obj?.planName ?? obj?.name))
  public name?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value, obj }) => (value ?? obj?.duration ?? obj?.durationInMonths))
  public durationInMonths?: string;

  @IsString()
  @IsOptional()
  public freeMonths?: string;

  @IsString()
  @IsOptional()
  public bonus?: string;

  @IsString()
  @IsOptional()
  public image?: string; // URL or path

  @IsNumber()
  @IsOptional()
  public price?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public benefits?: string[];

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}
