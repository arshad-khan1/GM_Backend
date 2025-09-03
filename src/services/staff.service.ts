import GymUserModel from '@/models/staff.model';
import { CreateStaffDto, UpdateStaffDto, UpdateStaffStatusDto } from '@/dtos/staff.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import UserModel from '@models/users.model';
import { Staff } from '@/interfaces/staff.interface';

class StaffService {
  public async findAllStaff(): Promise<Staff[]> {
    const staff = await GymUserModel.find();
    return staff;
  }

  public async findStaffById(staffId: string): Promise<Staff> {
    if (isEmpty(staffId)) throw new HttpException(400, 'staffId is empty');

    const findStaff = await GymUserModel.findOne({ _id: staffId });
    if (!findStaff) throw new HttpException(409, "Staff doesn't exist");

    return findStaff;
  }

  public async createStaff(staffData: CreateStaffDto): Promise<Staff> {
    if (isEmpty(staffData)) throw new HttpException(400, 'staffData is empty');

    // Step 1: resolve/create user first
    let resolvedUserId = staffData.userId;
    const info = (staffData.userInfo || {}) as any;

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
            isActive: staffData.isActive ?? 1,
            createdBy: staffData.createdBy || null,
            updatedBy: staffData.createdBy || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          resolvedUserId = newUser._id.toString();
        }
      } else {
        // Cannot create user without either userId or email
        throw new HttpException(400, 'Either userId or userInfo.email is required to create a gym user');
      }
    } else if (staffData.userInfo) {
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
    const existingRelation = await GymUserModel.findOne({ gymId: staffData.gymId, userId: resolvedUserId });
    if (existingRelation) {
      const updatePayload: any = {
        updatedAt: new Date(),
      };
      if (staffData.role !== undefined) updatePayload.role = staffData.role;
      if (staffData.userInfo !== undefined) updatePayload.userInfo = staffData.userInfo;
      if (staffData.isActive !== undefined) updatePayload.isActive = staffData.isActive;
      if ((staffData as any).updatedBy !== undefined) updatePayload.updatedBy = (staffData as any).updatedBy;

      const updated = await GymUserModel.findByIdAndUpdate(existingRelation._id, updatePayload, { new: true });
      return updated as any;
    }

    const createStaffData = await GymUserModel.create({
      ...staffData,
      userId: resolvedUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createStaffData;
  }

  public async updateStaff(staffId: string, staffData: UpdateStaffDto): Promise<Staff> {
    if (isEmpty(staffData)) throw new HttpException(400, 'staffData is empty');

    const updateStaffById = await GymUserModel.findByIdAndUpdate(staffId, { ...staffData, updatedAt: new Date() }, { new: true });
    if (!updateStaffById) throw new HttpException(409, "Staff doesn't exist");

    // Sync userInfo to Users collection if provided
    if (staffData.userInfo) {
      const targetUserId = staffData.userId || (updateStaffById as any).userId?.toString();
      if (targetUserId) {
        const { name, email, phone, profilePhotoUrl } = staffData.userInfo as any;
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

    return updateStaffById;
  }

  public async deleteStaff(staffId: string): Promise<Staff> {
    const deleteStaffById = await GymUserModel.findByIdAndDelete(staffId);
    if (!deleteStaffById) throw new HttpException(409, "Staff doesn't exist");

    return deleteStaffById;
  }

  public async updateStaffStatus(statusData: UpdateStaffStatusDto): Promise<Staff> {
    if (isEmpty(statusData)) throw new HttpException(400, 'statusData is empty');

    const updateStaffStatus = await GymUserModel.findByIdAndUpdate(
      statusData._id,
      { isActive: statusData.isActive, updatedAt: new Date() },
      { new: true },
    );
    if (!updateStaffStatus) throw new HttpException(409, "Staff doesn't exist");

    return updateStaffStatus;
  }
}

export default StaffService;
