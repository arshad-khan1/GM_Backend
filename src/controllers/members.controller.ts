import { NextFunction, Request, Response } from 'express';
import { CreateMemberDto, UpdateMemberDto, UpdateMemberStatusDto } from '@dtos/members.dto';
import MembersService from '@services/members.service';

export class MembersController {
  public membersService = new MembersService();

  public getMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllMembersData = await this.membersService.findAllMembers();

      res.status(200).json({ data: findAllMembersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId: string = req.params.id;
      const findOneMemberData = await this.membersService.findMemberById(memberId);

      res.status(200).json({ data: findOneMemberData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberData: CreateMemberDto = req.body;
      const createMemberData = await this.membersService.createMember(memberData);

      res.status(201).json({ data: createMemberData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId: string = req.params.id;
      const memberData: UpdateMemberDto = req.body;
      const updateMemberData = await this.membersService.updateMember(memberId, memberData);

      res.status(200).json({ data: updateMemberData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const memberId: string = req.params.id;
      const deleteMemberData = await this.membersService.deleteMember(memberId);

      res.status(200).json({ data: deleteMemberData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateMemberStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statusData: UpdateMemberStatusDto = req.body;
      const updateMemberStatusData = await this.membersService.updateMemberStatus(statusData);

      res.status(200).json({ data: updateMemberStatusData, message: 'status updated' });
    } catch (error) {
      next(error);
    }
  };
}
