import BidsModel from '@models/bids.model';
import { Bid } from '@interfaces/bids.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class BidService {
  public bids = BidsModel;

  public async findAllBids(): Promise<Bid[]> {
    const bids: Bid[] = await this.bids.find();
    return bids;
  }

  public async findBidById(bidId: string): Promise<Bid> {
    if (isEmpty(bidId)) throw new HttpException(400, 'BidId is empty');

    const findBid: Bid = await this.bids.findOne({ _id: bidId });
    if (!findBid) throw new HttpException(404, 'Bid not found');

    return findBid;
  }

  public async createBid(bidData: Bid): Promise<Bid> {
    if (isEmpty(bidData)) throw new HttpException(400, 'BidData is empty');

    const createBidData: Bid = await this.bids.create({ ...bidData });

    return createBidData;
  }

  public async updateBid(bidId: string, bidData: Bid): Promise<Bid> {
    if (isEmpty(bidData)) throw new HttpException(400, 'BidData is empty');

    const updateBidData = await this.bids.findByIdAndUpdate(bidId, { ...bidData }, { new: true });
    if (!updateBidData) throw new HttpException(404, 'Bid not found');

    return updateBidData;
  }

  public async deleteBid(bidId: string): Promise<Bid> {
    if (isEmpty(bidId)) throw new HttpException(400, 'BidId is empty');

    const deleteBidData = await this.bids.findByIdAndDelete(bidId);
    if (!deleteBidData) throw new HttpException(404, 'Bid not found');

    return deleteBidData;
  }
}

export default BidService;
