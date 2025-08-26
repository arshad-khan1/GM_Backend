import DealsModel from '@models/deals.model';
import { Deal } from '@interfaces/deals.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DealService {
  public deals = DealsModel;

  public async findAllDeals(): Promise<Deal[]> {
    const deals: Deal[] = await this.deals.find();
    return deals;
  }

  public async findDealById(dealId: string): Promise<Deal> {
    if (isEmpty(dealId)) throw new HttpException(400, 'DealId is empty');

    const findDeal: Deal = await this.deals.findOne({ _id: dealId });
    if (!findDeal) throw new HttpException(404, 'Deal not found');

    return findDeal;
  }

  public async createDeal(dealData: Deal): Promise<Deal> {
    if (isEmpty(dealData)) throw new HttpException(400, 'DealData is empty');

    const createDealData: Deal = await this.deals.create({ ...dealData });

    return createDealData;
  }

  public async updateDeal(dealId: string, dealData: Deal): Promise<Deal> {
    if (isEmpty(dealData)) throw new HttpException(400, 'DealData is empty');

    const updateDealData = await this.deals.findByIdAndUpdate(dealId, { ...dealData }, { new: true });
    if (!updateDealData) throw new HttpException(404, 'Deal not found');

    return updateDealData;
  }

  public async deleteDeal(dealId: string): Promise<Deal> {
    if (isEmpty(dealId)) throw new HttpException(400, 'DealId is empty');

    const deleteDealData = await this.deals.findByIdAndDelete(dealId);
    if (!deleteDealData) throw new HttpException(404, 'Deal not found');

    return deleteDealData;
  }
}

export default DealService;
