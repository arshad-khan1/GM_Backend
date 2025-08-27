import NotificationModel from '@models/notifications.model';
import { CreateNotificationDto, UpdateNotificationDto } from '@dtos/notifications.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Notification } from '@interfaces/notifications.interface';

class NotificationsService {
  public async findAllNotifications(): Promise<Notification[]> {
    const notifications = await NotificationModel.find();
    return notifications;
  }

  public async findNotificationById(notificationId: string): Promise<Notification> {
    if (isEmpty(notificationId)) throw new HttpException(400, 'NotificationId is empty');

    const findNotification = await NotificationModel.findOne({ _id: notificationId });
    if (!findNotification) throw new HttpException(409, "Notification doesn't exist");

    return findNotification;
  }

  public async createNotification(notificationData: CreateNotificationDto): Promise<Notification> {
    if (isEmpty(notificationData)) throw new HttpException(400, 'notificationData is empty');

    const createNotificationData = await NotificationModel.create({
      ...notificationData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createNotificationData;
  }

  public async updateNotification(notificationId: string, notificationData: UpdateNotificationDto): Promise<Notification> {
    if (isEmpty(notificationData)) throw new HttpException(400, 'notificationData is empty');

    const updateNotificationById = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { ...notificationData, updatedAt: new Date() },
      { new: true },
    );
    if (!updateNotificationById) throw new HttpException(409, "Notification doesn't exist");

    return updateNotificationById;
  }

  public async deleteNotification(notificationId: string): Promise<Notification> {
    const deleteNotificationById = await NotificationModel.findByIdAndDelete(notificationId);
    if (!deleteNotificationById) throw new HttpException(409, "Notification doesn't exist");

    return deleteNotificationById;
  }
}

export default NotificationsService;
