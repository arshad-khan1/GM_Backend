import { Router } from 'express';
import { CreatePaymentDto, UpdatePaymentDto } from '@dtos/payments.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { PaymentsController } from '@controllers/payments.controller';

export class PaymentsRoute implements Routes {
  public path = '/payments';
  public router = Router();
  public paymentsController = new PaymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.paymentsController.getPayments);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.paymentsController.getPaymentById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreatePaymentDto), this.paymentsController.createPayment);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdatePaymentDto), this.paymentsController.updatePayment);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.paymentsController.deletePayment);
  }
}
