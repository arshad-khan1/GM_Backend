import { NextFunction, Request, Response } from 'express';
import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from '@dtos/membership_plans.dto';
import MembershipPlansService from '@services/membership_plans.service';

export class MembershipPlansController {
  public membershipPlansService = new MembershipPlansService();

  public getMembershipPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllMembershipPlansData = await this.membershipPlansService.findAllMembershipPlans();

      res.status(200).json({ data: findAllMembershipPlansData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMembershipPlanById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const membershipPlanId: string = req.params.id;
      const findOneMembershipPlanData = await this.membershipPlansService.findMembershipPlanById(membershipPlanId);

      res.status(200).json({ data: findOneMembershipPlanData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMembershipPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const membershipPlanData: CreateMembershipPlanDto = req.body;
      const createMembershipPlanData = await this.membershipPlansService.createMembershipPlan(membershipPlanData);

      res.status(201).json({ data: createMembershipPlanData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMembershipPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const membershipPlanId: string = req.params.id;
      const membershipPlanData: UpdateMembershipPlanDto = req.body;
      const updateMembershipPlanData = await this.membershipPlansService.updateMembershipPlan(membershipPlanId, membershipPlanData);

      res.status(200).json({ data: updateMembershipPlanData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMembershipPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const membershipPlanId: string = req.params.id;
      const deleteMembershipPlanData = await this.membershipPlansService.deleteMembershipPlan(membershipPlanId);

      res.status(200).json({ data: deleteMembershipPlanData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
