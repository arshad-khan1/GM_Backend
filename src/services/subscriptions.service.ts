import SubscriptionModel from '@models/subscriptions.model';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Subscription } from '@interfaces/subscriptions.interface';

class SubscriptionsService {
  public async findAllSubscriptions(): Promise<Subscription[]> {
    const subscriptions = await SubscriptionModel.find();
    return subscriptions;
  }

  public async findSubscriptionById(subscriptionId: string): Promise<Subscription> {
    if (isEmpty(subscriptionId)) throw new HttpException(400, 'SubscriptionId is empty');

    const findSubscription = await SubscriptionModel.findOne({ _id: subscriptionId });
    if (!findSubscription) throw new HttpException(409, "Subscription doesn't exist");

    return findSubscription;
  }

  public async createSubscription(subscriptionData: CreateSubscriptionDto): Promise<Subscription> {
    if (isEmpty(subscriptionData)) throw new HttpException(400, 'subscriptionData is empty');

    const createSubscriptionData = await SubscriptionModel.create({
      ...subscriptionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createSubscriptionData;
  }

  public async updateSubscription(subscriptionId: string, subscriptionData: UpdateSubscriptionDto): Promise<Subscription> {
    if (isEmpty(subscriptionData)) throw new HttpException(400, 'subscriptionData is empty');

    const updateSubscriptionById = await SubscriptionModel.findByIdAndUpdate(
      subscriptionId,
      { ...subscriptionData, updatedAt: new Date() },
      { new: true },
    );
    if (!updateSubscriptionById) throw new HttpException(409, "Subscription doesn't exist");

    return updateSubscriptionById;
  }

  public async deleteSubscription(subscriptionId: string): Promise<Subscription> {
    const deleteSubscriptionById = await SubscriptionModel.findByIdAndDelete(subscriptionId);
    if (!deleteSubscriptionById) throw new HttpException(409, "Subscription doesn't exist");

    return deleteSubscriptionById;
  }
}

export default SubscriptionsService;
