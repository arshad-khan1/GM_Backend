import GymUserModel from '@models/gym_users.model';
import { CreateGymUserDto, UpdateGymUserDto, UpdateGymUserStatusDto } from '@dtos/gym_users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { GymUser } from '@interfaces/gym_users.interface';

class GymUsersService {
  public async findAllGymUsers(): Promise<GymUser[]> {
    const gymUsers = await GymUserModel.find();
    return gymUsers;
  }

  public async findGymUserById(gymUserId: string): Promise<GymUser> {
    if (isEmpty(gymUserId)) throw new HttpException(400, 'GymUserId is empty');

    const findGymUser = await GymUserModel.findOne({ _id: gymUserId });
    if (!findGymUser) throw new HttpException(409, "GymUser doesn't exist");

    return findGymUser;
  }

  public async createGymUser(gymUserData: CreateGymUserDto): Promise<GymUser> {
    if (isEmpty(gymUserData)) throw new HttpException(400, 'gymUserData is empty');

    const createGymUserData = await GymUserModel.create({
      ...gymUserData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createGymUserData;
  }

  public async updateGymUser(gymUserId: string, gymUserData: UpdateGymUserDto): Promise<GymUser> {
    if (isEmpty(gymUserData)) throw new HttpException(400, 'gymUserData is empty');

    const updateGymUserById = await GymUserModel.findByIdAndUpdate(gymUserId, { ...gymUserData, updatedAt: new Date() }, { new: true });
    if (!updateGymUserById) throw new HttpException(409, "GymUser doesn't exist");

    return updateGymUserById;
  }

  public async deleteGymUser(gymUserId: string): Promise<GymUser> {
    const deleteGymUserById = await GymUserModel.findByIdAndDelete(gymUserId);
    if (!deleteGymUserById) throw new HttpException(409, "GymUser doesn't exist");

    return deleteGymUserById;
  }

  public async updateGymUserStatus(statusData: UpdateGymUserStatusDto): Promise<GymUser> {
    if (isEmpty(statusData)) throw new HttpException(400, 'statusData is empty');

    const updateGymUserStatus = await GymUserModel.findByIdAndUpdate(
      statusData._id,
      { isActive: statusData.isActive, updatedAt: new Date() },
      { new: true },
    );
    if (!updateGymUserStatus) throw new HttpException(409, "GymUser doesn't exist");

    return updateGymUserStatus;
  }
}

export default GymUsersService;
