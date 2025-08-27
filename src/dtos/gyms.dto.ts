import { IsString, IsOptional, IsNumber, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  public line1: string;

  @IsString()
  @IsOptional()
  public line2?: string;

  @IsString()
  public city: string;

  @IsString()
  public state: string;

  @IsString()
  public zipcode: string;

  @IsString()
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
  @IsMongoId()
  public ownerId: string;

  @IsString()
  public name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  public address: AddressDto;

  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;

  @IsNumber()
  @IsOptional()
  public isActive?: number;

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
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
}

export class UpdateGymStatusDto {
  @IsMongoId()
  public _id: string;

  @IsNumber()
  public isActive: number;
}
