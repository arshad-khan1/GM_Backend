import { IsString, IsOptional, IsNumber, ValidateNested, IsMongoId, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsOptional()
  public line1?: string;

  @IsString()
  @IsOptional()
  public line2?: string;

  @IsString()
  public city: string;

  @IsString()
  @IsOptional()
  public state?: string;

  @IsString()
  @IsOptional()
  public zipcode?: string;

  @IsString()
  @IsOptional()
  public country: string;
}

class LocationDto {
  @IsString()
  public lat: string;

  @IsString()
  public lon: string;

  @IsString()
  public name: string;
}

export class CreateGymDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => AddressDto)
  public address?: AddressDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => LocationDto)
  public location?: LocationDto;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public userId?: string;

  @IsString()
  @IsOptional()
  public note?: string;
}

export class UpdateGymDto {
  @IsMongoId()
  @IsOptional()
  public ownerId?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  public address?: AddressDto;

  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  public location?: LocationDto;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;

  @IsString()
  @IsOptional()
  public note?: string;
}

export class UpdateGymStatusDto {
  @IsMongoId()
  public _id: string;

  @IsNumber()
  public isActive: number;
}
