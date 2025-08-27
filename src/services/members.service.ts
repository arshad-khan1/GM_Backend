import MemberModel from '@models/members.model';
import { CreateMemberDto, UpdateMemberDto, UpdateMemberStatusDto } from '@dtos/members.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Member } from '@interfaces/members.interface';

class MembersService {
  public async findAllMembers(): Promise<Member[]> {
    const members = await MemberModel.find();
    return members;
  }

  public async findMemberById(memberId: string): Promise<Member> {
    if (isEmpty(memberId)) throw new HttpException(400, 'MemberId is empty');

    const findMember = await MemberModel.findOne({ _id: memberId });
    if (!findMember) throw new HttpException(409, "Member doesn't exist");

    return findMember;
  }

  public async createMember(memberData: CreateMemberDto): Promise<Member> {
    if (isEmpty(memberData)) throw new HttpException(400, 'memberData is empty');

    const createMemberData = await MemberModel.create({
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createMemberData;
  }

  public async updateMember(memberId: string, memberData: UpdateMemberDto): Promise<Member> {
    if (isEmpty(memberData)) throw new HttpException(400, 'memberData is empty');

    const updateMemberById = await MemberModel.findByIdAndUpdate(memberId, { ...memberData, updatedAt: new Date() }, { new: true });
    if (!updateMemberById) throw new HttpException(409, "Member doesn't exist");

    return updateMemberById;
  }

  public async deleteMember(memberId: string): Promise<Member> {
    const deleteMemberById = await MemberModel.findByIdAndDelete(memberId);
    if (!deleteMemberById) throw new HttpException(409, "Member doesn't exist");

    return deleteMemberById;
  }

  public async updateMemberStatus(statusData: UpdateMemberStatusDto): Promise<Member> {
    if (isEmpty(statusData)) throw new HttpException(400, 'statusData is empty');

    const updateMemberStatus = await MemberModel.findByIdAndUpdate(
      statusData._id,
      { isActive: statusData.isActive, updatedAt: new Date() },
      { new: true },
    );
    if (!updateMemberStatus) throw new HttpException(409, "Member doesn't exist");

    return updateMemberStatus;
  }
}

export default MembersService;
