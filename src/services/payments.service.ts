import PaymentModel from '@models/payments.model';
import { CreatePaymentDto, UpdatePaymentDto } from '@dtos/payments.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Payment } from '@interfaces/payments.interface';

class PaymentsService {
  public async findAllPayments(): Promise<Payment[]> {
    const payments = await PaymentModel.find();
    return payments;
  }

  public async findPaymentById(paymentId: string): Promise<Payment> {
    if (isEmpty(paymentId)) throw new HttpException(400, 'PaymentId is empty');

    const findPayment = await PaymentModel.findOne({ _id: paymentId });
    if (!findPayment) throw new HttpException(409, "Payment doesn't exist");

    return findPayment;
  }

  public async createPayment(paymentData: CreatePaymentDto): Promise<Payment> {
    if (isEmpty(paymentData)) throw new HttpException(400, 'paymentData is empty');

    const createPaymentData = await PaymentModel.create({
      ...paymentData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createPaymentData;
  }

  public async updatePayment(paymentId: string, paymentData: UpdatePaymentDto): Promise<Payment> {
    if (isEmpty(paymentData)) throw new HttpException(400, 'paymentData is empty');

    const updatePaymentById = await PaymentModel.findByIdAndUpdate(paymentId, { ...paymentData, updatedAt: new Date() }, { new: true });
    if (!updatePaymentById) throw new HttpException(409, "Payment doesn't exist");

    return updatePaymentById;
  }

  public async deletePayment(paymentId: string): Promise<Payment> {
    const deletePaymentById = await PaymentModel.findByIdAndDelete(paymentId);
    if (!deletePaymentById) throw new HttpException(409, "Payment doesn't exist");

    return deletePaymentById;
  }
}

export default PaymentsService;
