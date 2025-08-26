import OffersModel from '@models/offers.model';
import { Offer } from '@interfaces/offers.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class OfferService {
  public offers = OffersModel;

  public async findAllOffers(): Promise<Offer[]> {
    const offers: Offer[] = await this.offers.find();
    return offers;
  }

  public async findOfferById(offerId: string): Promise<Offer> {
    if (isEmpty(offerId)) throw new HttpException(400, 'OfferId is empty');

    const findOffer: Offer = await this.offers.findOne({ _id: offerId });
    if (!findOffer) throw new HttpException(404, 'Offer not found');

    return findOffer;
  }

  public async createOffer(offerData: Offer): Promise<Offer> {
    if (isEmpty(offerData)) throw new HttpException(400, 'OfferData is empty');

    const createOfferData: Offer = await this.offers.create({ ...offerData });

    return createOfferData;
  }

  public async updateOffer(offerId: string, offerData: Offer): Promise<Offer> {
    if (isEmpty(offerData)) throw new HttpException(400, 'OfferData is empty');

    const updateOfferData = await this.offers.findByIdAndUpdate(offerId, { ...offerData }, { new: true });
    if (!updateOfferData) throw new HttpException(404, 'Offer not found');

    return updateOfferData;
  }

  public async deleteOffer(offerId: string): Promise<Offer> {
    if (isEmpty(offerId)) throw new HttpException(400, 'OfferId is empty');

    const deleteOfferData = await this.offers.findByIdAndDelete(offerId);
    if (!deleteOfferData) throw new HttpException(404, 'Offer not found');

    return deleteOfferData;
  }
}

export default OfferService;
