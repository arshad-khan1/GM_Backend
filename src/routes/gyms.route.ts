import { Router } from 'express';
import { CreateGymDto, UpdateGymDto, UpdateGymStatusDto } from '@dtos/gyms.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { GymsController } from '@controllers/gyms.controller';

export class GymsRoute implements Routes {
  public path = '/gyms';
  public router = Router();
  public gymsController = new GymsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.gymsController.getGyms);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.gymsController.getGymById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateGymDto), this.gymsController.createGym);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateGymDto), this.gymsController.updateGym);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.gymsController.deleteGym);
    this.router.patch(`${this.path}/status`, AuthMiddleware, ValidationMiddleware(UpdateGymStatusDto), this.gymsController.updateGymStatus);
    this.router.get(`${this.path}/owner/:owner_id`, AuthMiddleware, this.gymsController.getGymByOwnerId);
  }
}
