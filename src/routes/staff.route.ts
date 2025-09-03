import { Router } from 'express';
import { CreateStaffDto, UpdateStaffDto, UpdateStaffStatusDto } from '@/dtos/staff.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { StaffController } from '@/controllers/staff.controller';

export class StaffRoute implements Routes {
  public path = '/staff';
  public router = Router();
  public staffController = new StaffController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.staffController.getStaff);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.staffController.getStaffById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateStaffDto), this.staffController.createStaff);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateStaffDto), this.staffController.updateStaff);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.staffController.deleteStaff);
    this.router.patch(`${this.path}/status`, AuthMiddleware, ValidationMiddleware(UpdateStaffStatusDto), this.staffController.updateStaffStatus);
  }
}
