import { IsString, IsOptional, IsNumber, IsMongoId, IsDateString, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsMongoId()
  public subscriptionId: string;

  @IsMongoId()
  public memberId: string;

  @IsMongoId()
  public gymId: string;

  @IsNumber()
  public amount: number;

  @IsNumber()
  public dueAmount: number;

  @IsString()
  public paymentMethod: string; // e.g. cash, card, UPI, etc.

  @IsEnum(['paid', 'pending', 'advance_paid', 'scheduled'])
  public paymentStatus: 'paid' | 'pending' | 'advance_paid' | 'scheduled';

  @IsDateString()
  @IsOptional()
  public scheduledPaymentDate?: string;

  @IsDateString()
  public transactionDate: string;

  @IsMongoId()
  @IsOptional()
  public createdBy?: string;
}

export class UpdatePaymentDto {
  @IsMongoId()
  @IsOptional()
  public subscriptionId?: string;

  @IsMongoId()
  @IsOptional()
  public memberId?: string;

  @IsMongoId()
  @IsOptional()
  public gymId?: string;

  @IsNumber()
  @IsOptional()
  public amount?: number;

  @IsNumber()
  @IsOptional()
  public dueAmount?: number;

  @IsString()
  @IsOptional()
  public paymentMethod?: string;

  @IsEnum(['paid', 'pending', 'advance_paid', 'scheduled'])
  @IsOptional()
  public paymentStatus?: 'paid' | 'pending' | 'advance_paid' | 'scheduled';

  @IsDateString()
  @IsOptional()
  public scheduledPaymentDate?: string;

  @IsDateString()
  @IsOptional()
  public transactionDate?: string;

  @IsMongoId()
  @IsOptional()
  public updatedBy?: string;
}
