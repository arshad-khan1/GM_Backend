import { NextFunction, Request, Response } from 'express';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';
import NotificationsService from '@services/notifications.service';

export class NotificationsController {
  public notificationsService = new NotificationsService();

  public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNotificationsData = await this.notificationsService.findAllNotifications();

      res.status(200).json({ data: findAllNotificationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId: string = req.params.id;
      const findOneNotificationData = await this.notificationsService.findNotificationById(notificationId);

      res.status(200).json({ data: findOneNotificationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationData: CreateNotificationDto = req.body;
      const createNotificationData = await this.notificationsService.createNotification(notificationData);

      res.status(201).json({ data: createNotificationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId: string = req.params.id;
      const notificationData: UpdateNotificationDto = req.body;
      const updateNotificationData = await this.notificationsService.updateNotification(notificationId, notificationData);

      res.status(200).json({ data: updateNotificationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId: string = req.params.id;
      const deleteNotificationData = await this.notificationsService.deleteNotification(notificationId);

      res.status(200).json({ data: deleteNotificationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
