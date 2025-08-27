import { IsString, IsOptional, IsNumber, IsMongoId, IsDateString, IsArray } from 'class-validator';

export class CreateMemberDto {
  @IsMongoId()
  public gymId: string;

  @IsMongoId()
  public userId: string;

  @IsString()
  public batch: string;

  @IsDateString()
  public dateOfBirth: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  public subscriptions?: string[];

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateMemberDto {
  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public batch?: string;

  @IsDateString()
  @IsOptional()
  public dateOfBirth?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  public subscriptions?: string[];

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}

export class UpdateMemberStatusDto {
  @IsMongoId()
  public _id: string;

  @IsNumber()
  public isActive: number;
}
