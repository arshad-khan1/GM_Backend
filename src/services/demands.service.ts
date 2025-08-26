import DemandsModel from '@models/demands.model';
import { Demand } from '@interfaces/demands.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DemandService {
  public demands = DemandsModel;

  public async findAllDemands(): Promise<Demand[]> {
    const demands: Demand[] = await this.demands.find();
    return demands;
  }

  public async findDemandById(demandId: string): Promise<Demand> {
    if (isEmpty(demandId)) throw new HttpException(400, 'DemandId is empty');

    const findDemand: Demand = await this.demands.findOne({ _id: demandId });
    if (!findDemand) throw new HttpException(404, 'Demand not found');

    return findDemand;
  }

  public async createDemand(demandData: Demand): Promise<Demand> {
    if (isEmpty(demandData)) throw new HttpException(400, 'DemandData is empty');

    const createDemandData: Demand = await this.demands.create({ ...demandData });

    return createDemandData;
  }

  public async updateDemand(demandId: string, demandData: Demand): Promise<Demand> {
    if (isEmpty(demandData)) throw new HttpException(400, 'DemandData is empty');

    const updateDemandData = await this.demands.findByIdAndUpdate(demandId, { ...demandData }, { new: true });
    if (!updateDemandData) throw new HttpException(404, 'Demand not found');

    return updateDemandData;
  }

  public async deleteDemand(demandId: string): Promise<Demand> {
    if (isEmpty(demandId)) throw new HttpException(400, 'DemandId is empty');

    const deleteDemandData = await this.demands.findByIdAndDelete(demandId);
    if (!deleteDemandData) throw new HttpException(404, 'Demand not found');

    return deleteDemandData;
  }
}

export default DemandService;
