import MembershipPlanModel from '@models/membership_plans.model';
import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from '@dtos/membership_plans.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { MembershipPlan } from '@interfaces/membership_plans.interface';

class MembershipPlansService {
  public async findAllMembershipPlans(): Promise<MembershipPlan[]> {
    const membershipPlans = await MembershipPlanModel.find();
    return membershipPlans;
  }

  public async findMembershipPlanById(membershipPlanId: string): Promise<MembershipPlan> {
    if (isEmpty(membershipPlanId)) throw new HttpException(400, 'MembershipPlanId is empty');

    const findMembershipPlan = await MembershipPlanModel.findOne({ _id: membershipPlanId });
    if (!findMembershipPlan) throw new HttpException(409, "MembershipPlan doesn't exist");

    return findMembershipPlan;
  }

  public async createMembershipPlan(membershipPlanData: CreateMembershipPlanDto): Promise<MembershipPlan> {
    if (isEmpty(membershipPlanData)) throw new HttpException(400, 'membershipPlanData is empty');

    const createMembershipPlanData = await MembershipPlanModel.create({
      ...membershipPlanData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createMembershipPlanData;
  }

  public async updateMembershipPlan(membershipPlanId: string, membershipPlanData: UpdateMembershipPlanDto): Promise<MembershipPlan> {
    if (isEmpty(membershipPlanData)) throw new HttpException(400, 'membershipPlanData is empty');

    const updateMembershipPlanById = await MembershipPlanModel.findByIdAndUpdate(
      membershipPlanId,
      { ...membershipPlanData, updatedAt: new Date() },
      { new: true },
    );
    if (!updateMembershipPlanById) throw new HttpException(409, "MembershipPlan doesn't exist");

    return updateMembershipPlanById;
  }

  public async deleteMembershipPlan(membershipPlanId: string): Promise<MembershipPlan> {
    const deleteMembershipPlanById = await MembershipPlanModel.findByIdAndDelete(membershipPlanId);
    if (!deleteMembershipPlanById) throw new HttpException(409, "MembershipPlan doesn't exist");

    return deleteMembershipPlanById;
  }
}

export default MembershipPlansService;
