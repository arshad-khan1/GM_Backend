import { IsString, IsOptional, IsNumber, IsMongoId, IsArray } from 'class-validator';

export class CreateMembershipPlanDto {
  @IsMongoId()
  public gymId: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public durationInMonths: string;

  @IsString()
  @IsOptional()
  public freeMonths?: string;

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
  public name?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public durationInMonths?: string;

  @IsString()
  @IsOptional()
  public freeMonths?: string;

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
