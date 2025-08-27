import { Router } from 'express';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { NotificationsController } from '@controllers/notifications.controller';

export class NotificationsRoute implements Routes {
  public path = '/notifications';
  public router = Router();
  public notificationsController = new NotificationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.notificationsController.getNotifications);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.notificationsController.getNotificationById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateNotificationDto), this.notificationsController.createNotification);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateNotificationDto), this.notificationsController.updateNotification);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.notificationsController.deleteNotification);
  }
}
