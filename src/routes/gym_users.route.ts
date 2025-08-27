import { Router } from 'express';
import { CreateGymUserDto, UpdateGymUserDto, UpdateGymUserStatusDto } from '@dtos/gym_users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { GymUsersController } from '@controllers/gym_users.controller';

export class GymUsersRoute implements Routes {
  public path = '/gym-users';
  public router = Router();
  public gymUsersController = new GymUsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.gymUsersController.getGymUsers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.gymUsersController.getGymUserById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateGymUserDto), this.gymUsersController.createGymUser);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateGymUserDto), this.gymUsersController.updateGymUser);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.gymUsersController.deleteGymUser);
    this.router.patch(
      `${this.path}/status`,
      AuthMiddleware,
      ValidationMiddleware(UpdateGymUserStatusDto),
      this.gymUsersController.updateGymUserStatus,
    );
  }
}
