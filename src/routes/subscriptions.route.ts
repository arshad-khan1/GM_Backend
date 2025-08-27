import { Router } from 'express';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { SubscriptionsController } from '@controllers/subscriptions.controller';

export class SubscriptionsRoute implements Routes {
  public path = '/subscriptions';
  public router = Router();
  public subscriptionsController = new SubscriptionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.subscriptionsController.getSubscriptions);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.subscriptionsController.getSubscriptionById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateSubscriptionDto), this.subscriptionsController.createSubscription);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateSubscriptionDto), this.subscriptionsController.updateSubscription);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.subscriptionsController.deleteSubscription);
  }
}
