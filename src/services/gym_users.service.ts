import GymUserModel from '@models/gym_users.model';
import { CreateGymUserDto, UpdateGymUserDto, UpdateGymUserStatusDto } from '@dtos/gym_users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { GymUser } from '@interfaces/gym_users.interface';
import UserModel from '@models/users.model';

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

    // Step 1: resolve/create user first
    let resolvedUserId = gymUserData.userId;
    const info = (gymUserData.userInfo || {}) as any;

    if (!resolvedUserId) {
      // Try to find by email if provided
      if (info.email) {
        const existing = await UserModel.findOne({ email: info.email.toLowerCase().trim() });
        if (existing) {
          resolvedUserId = existing._id.toString();
          // Update existing user with any provided fields
          const updatePayload: any = {};
          if (info.name !== undefined) updatePayload.fullName = info.name;
          if (info.phone !== undefined) updatePayload.phone = info.phone;
          if (info.profilePhotoUrl !== undefined) updatePayload.profilePhotoUrl = info.profilePhotoUrl;
          if (Object.keys(updatePayload).length > 0) {
            await UserModel.findByIdAndUpdate(existing._id, { ...updatePayload, updatedAt: new Date() });
          }
        } else {
          // Create new user (email is required by users model)
          const newUser = await UserModel.create({
            role: 1, // Admin/Staff user
            email: info.email,
            fullName: info.name || '',
            phone: info.phone || '',
            profilePhotoUrl: info.profilePhotoUrl || '',
            isActive: gymUserData.isActive ?? 1,
            createdBy: gymUserData.createdBy || null,
            updatedBy: gymUserData.createdBy || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          resolvedUserId = newUser._id.toString();
        }
      } else {
        // Cannot create user without either userId or email
        throw new HttpException(400, 'Either userId or userInfo.email is required to create a gym user');
      }
    } else if (gymUserData.userInfo) {
      // If userId provided, update user with given info
      const { name, email, phone, profilePhotoUrl } = info;
      const updatePayload: any = {};
      if (name !== undefined) updatePayload.fullName = name;
      if (email !== undefined) updatePayload.email = email;
      if (phone !== undefined) updatePayload.phone = phone;
      if (profilePhotoUrl !== undefined) updatePayload.profilePhotoUrl = profilePhotoUrl;
      if (Object.keys(updatePayload).length > 0) {
        await UserModel.findByIdAndUpdate(resolvedUserId, { ...updatePayload, updatedAt: new Date() });
      }
    }

    // Step 2: if relation exists, update it; else create new
    const existingRelation = await GymUserModel.findOne({ gymId: gymUserData.gymId, userId: resolvedUserId });
    if (existingRelation) {
      const updatePayload: any = {
        updatedAt: new Date(),
      };
      if (gymUserData.role !== undefined) updatePayload.role = gymUserData.role;
      if (gymUserData.userInfo !== undefined) updatePayload.userInfo = gymUserData.userInfo;
      if (gymUserData.isActive !== undefined) updatePayload.isActive = gymUserData.isActive;
      if ((gymUserData as any).updatedBy !== undefined) updatePayload.updatedBy = (gymUserData as any).updatedBy;

      const updated = await GymUserModel.findByIdAndUpdate(existingRelation._id, updatePayload, { new: true });
      return updated as any;
    }

    const createGymUserData = await GymUserModel.create({
      ...gymUserData,
      userId: resolvedUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createGymUserData;
  }

  public async updateGymUser(gymUserId: string, gymUserData: UpdateGymUserDto): Promise<GymUser> {
    if (isEmpty(gymUserData)) throw new HttpException(400, 'gymUserData is empty');

    const updateGymUserById = await GymUserModel.findByIdAndUpdate(gymUserId, { ...gymUserData, updatedAt: new Date() }, { new: true });
    if (!updateGymUserById) throw new HttpException(409, "GymUser doesn't exist");

    // Sync userInfo to Users collection if provided
    if (gymUserData.userInfo) {
      const targetUserId = gymUserData.userId || (updateGymUserById as any).userId?.toString();
      if (targetUserId) {
        const { name, email, phone, profilePhotoUrl } = gymUserData.userInfo as any;
        const updatePayload: any = {};
        if (name !== undefined) updatePayload.fullName = name;
        if (email !== undefined) updatePayload.email = email;
        if (phone !== undefined) updatePayload.phone = phone;
        if (profilePhotoUrl !== undefined) updatePayload.profilePhotoUrl = profilePhotoUrl;
        if (Object.keys(updatePayload).length > 0) {
          await UserModel.findByIdAndUpdate(targetUserId, { ...updatePayload, updatedAt: new Date() });
        }
      }
    }

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
