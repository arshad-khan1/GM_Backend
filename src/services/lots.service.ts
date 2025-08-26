import LotsModel from '@models/lots.model';
import { Lot } from '@interfaces/lots.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class LotService {
  public lots = LotsModel;

  public async findAllLots(): Promise<Lot[]> {
    const lots: Lot[] = await this.lots.find();
    return lots;
  }

  public async findLotById(lotId: string): Promise<Lot> {
    if (isEmpty(lotId)) throw new HttpException(400, 'LotId is empty');

    const findLot: Lot = await this.lots.findOne({ _id: lotId });
    if (!findLot) throw new HttpException(404, 'Lot not found');

    return findLot;
  }

  public async createLot(lotData: Lot): Promise<Lot> {
    if (isEmpty(lotData)) throw new HttpException(400, 'LotData is empty');

    const createLotData: Lot = await this.lots.create({ ...lotData });

    return createLotData;
  }

  public async updateLot(lotId: string, lotData: Lot): Promise<Lot> {
    if (isEmpty(lotData)) throw new HttpException(400, 'LotData is empty');

    const updateLotData = await this.lots.findByIdAndUpdate(lotId, { ...lotData }, { new: true });
    if (!updateLotData) throw new HttpException(404, 'Lot not found');

    return updateLotData;
  }

  public async deleteLot(lotId: string): Promise<Lot> {
    if (isEmpty(lotId)) throw new HttpException(400, 'LotId is empty');

    const deleteLotData = await this.lots.findByIdAndDelete(lotId);
    if (!deleteLotData) throw new HttpException(404, 'Lot not found');

    return deleteLotData;
  }
}

export default LotService;
