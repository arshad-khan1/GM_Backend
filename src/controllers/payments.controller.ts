import { NextFunction, Request, Response } from 'express';
import { CreatePaymentDto, UpdatePaymentDto } from '@dtos/payments.dto';
import PaymentsService from '@services/payments.service';

export class PaymentsController {
  public paymentsService = new PaymentsService();

  public getPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPaymentsData = await this.paymentsService.findAllPayments();

      res.status(200).json({ data: findAllPaymentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const findOnePaymentData = await this.paymentsService.findPaymentById(paymentId);

      res.status(200).json({ data: findOnePaymentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentData: CreatePaymentDto = req.body;
      const createPaymentData = await this.paymentsService.createPayment(paymentData);

      res.status(201).json({ data: createPaymentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const paymentData: UpdatePaymentDto = req.body;
      const updatePaymentData = await this.paymentsService.updatePayment(paymentId, paymentData);

      res.status(200).json({ data: updatePaymentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const deletePaymentData = await this.paymentsService.deletePayment(paymentId);

      res.status(200).json({ data: deletePaymentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
