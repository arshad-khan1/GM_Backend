import { NextFunction, Request, Response } from 'express';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';
import SubscriptionsService from '@services/subscriptions.service';

export class SubscriptionsController {
  public subscriptionsService = new SubscriptionsService();

  public getSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubscriptionsData = await this.subscriptionsService.findAllSubscriptions();

      res.status(200).json({ data: findAllSubscriptionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSubscriptionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId: string = req.params.id;
      const findOneSubscriptionData = await this.subscriptionsService.findSubscriptionById(subscriptionId);

      res.status(200).json({ data: findOneSubscriptionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionData: CreateSubscriptionDto = req.body;
      const createSubscriptionData = await this.subscriptionsService.createSubscription(subscriptionData);

      res.status(201).json({ data: createSubscriptionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId: string = req.params.id;
      const subscriptionData: UpdateSubscriptionDto = req.body;
      const updateSubscriptionData = await this.subscriptionsService.updateSubscription(subscriptionId, subscriptionData);

      res.status(200).json({ data: updateSubscriptionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subscriptionId: string = req.params.id;
      const deleteSubscriptionData = await this.subscriptionsService.deleteSubscription(subscriptionId);

      res.status(200).json({ data: deleteSubscriptionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
