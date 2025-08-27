import { Router } from 'express';
import { CreateMembershipPlanDto, UpdateMembershipPlanDto } from '@dtos/membership_plans.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { MembershipPlansController } from '@controllers/membership_plans.controller';

export class MembershipPlansRoute implements Routes {
  public path = '/membership-plans';
  public router = Router();
  public membershipPlansController = new MembershipPlansController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.membershipPlansController.getMembershipPlans);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.membershipPlansController.getMembershipPlanById);
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      ValidationMiddleware(CreateMembershipPlanDto),
      this.membershipPlansController.createMembershipPlan,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      ValidationMiddleware(UpdateMembershipPlanDto),
      this.membershipPlansController.updateMembershipPlan,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.membershipPlansController.deleteMembershipPlan);
  }
}
