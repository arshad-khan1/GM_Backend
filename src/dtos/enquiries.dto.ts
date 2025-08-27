import { IsString, IsOptional, IsNumber, IsMongoId } from 'class-validator';

export class CreateEnquiryDto {
  @IsMongoId()
  public gym_id: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsString()
  public Address: string;

  @IsNumber()
  @IsOptional()
  public isActive?: number; // 0-Active, 1-Inactive

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdateEnquiryDto {
  @IsMongoId()
  @IsOptional()
  public gym_id?: string;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public Address?: string;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}

export class UpdateEnquiryStatusDto {
  @IsMongoId()
  public _id: string;

  @IsNumber()
  public isActive: number;
}

export class GetEnquiriesByGymIdDto {
  @IsMongoId()
  public gymId: string;
}
