import GymModel from '@models/gyms.model';
import { CreateGymDto, UpdateGymDto, UpdateGymStatusDto } from '@dtos/gyms.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Gym } from '@interfaces/gyms.interface';

class GymsService {
  public async findAllGyms(): Promise<Gym[]> {
    const gyms = await GymModel.find();
    return gyms;
  }

  public async findGymById(gymId: string): Promise<Gym> {
    if (isEmpty(gymId)) throw new HttpException(400, 'GymId is empty');

    const findGym = await GymModel.findOne({ _id: gymId });
    if (!findGym) throw new HttpException(409, "Gym doesn't exist");

    return findGym;
  }

  public async createGym(gymData: CreateGymDto): Promise<Gym> {
    if (isEmpty(gymData)) throw new HttpException(400, 'gymData is empty');

    const createGymData = await GymModel.create({
      ...gymData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createGymData;
  }

  public async updateGym(gymId: string, gymData: UpdateGymDto): Promise<Gym> {
    if (isEmpty(gymData)) throw new HttpException(400, 'gymData is empty');

    const updateGymById = await GymModel.findByIdAndUpdate(gymId, { ...gymData, updatedAt: new Date() }, { new: true });
    if (!updateGymById) throw new HttpException(409, "Gym doesn't exist");

    return updateGymById;
  }

  public async deleteGym(gymId: string): Promise<Gym> {
    const deleteGymById = await GymModel.findByIdAndDelete(gymId);
    if (!deleteGymById) throw new HttpException(409, "Gym doesn't exist");

    return deleteGymById;
  }

  public async updateGymStatus(statusData: UpdateGymStatusDto): Promise<Gym> {
    if (isEmpty(statusData)) throw new HttpException(400, 'statusData is empty');

    const updateGymStatus = await GymModel.findByIdAndUpdate(statusData._id, { isActive: statusData.isActive, updatedAt: new Date() }, { new: true });
    if (!updateGymStatus) throw new HttpException(409, "Gym doesn't exist");

    return updateGymStatus;
  }
}

export default GymsService;
