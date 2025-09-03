import GymModel from '@models/gyms.model';
import { CreateGymDto, UpdateGymDto, UpdateGymStatusDto } from '@dtos/gyms.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Gym } from '@interfaces/gyms.interface';
import UserModel from '@/models/users.model';

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

  public async createGym(gymData: CreateGymDto): Promise<{ gymData: Gym }> {
    if (isEmpty(gymData)) throw new HttpException(400, 'gymData is empty');

    const user = await UserModel.findById(gymData.userId);
    if (!user) throw new HttpException(409, "User doesn't exist");

    const createGymData = await GymModel.create({
      name: gymData.name,
      address: {
        line1: gymData?.address?.line1,
        line2: gymData?.address?.line2,
        city: gymData?.address?.city,
        state: gymData?.address?.state,
        zipcode: gymData?.address?.zipcode,
        country: gymData?.address?.country,
      },
      location: {
        lat: gymData?.location?.lat,
        lon: gymData?.location?.lon,
        name: gymData?.location?.name,
      },
      note: gymData.note,
      ownerId: gymData.userId,
      createdBy: gymData.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { gymData: createGymData };
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

  public async getGymByOwnerId(ownerId: string): Promise<Gym[]> {
    if (isEmpty(ownerId)) throw new HttpException(400, 'ownerId is empty');

    const getGymByOwnerId = await GymModel.find({ ownerId });
    if (!getGymByOwnerId) throw new HttpException(409, "Gym doesn't exist");

    return getGymByOwnerId;
  }
}

export default GymsService;
