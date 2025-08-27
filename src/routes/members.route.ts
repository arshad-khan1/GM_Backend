import { Router } from 'express';
import { CreateMemberDto, UpdateMemberDto, UpdateMemberStatusDto } from '@dtos/members.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { MembersController } from '@controllers/members.controller';

export class MembersRoute implements Routes {
  public path = '/members';
  public router = Router();
  public membersController = new MembersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.membersController.getMembers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.membersController.getMemberById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateMemberDto), this.membersController.createMember);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateMemberDto), this.membersController.updateMember);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.membersController.deleteMember);
    this.router.patch(`${this.path}/status`, AuthMiddleware, ValidationMiddleware(UpdateMemberStatusDto), this.membersController.updateMemberStatus);
  }
}
