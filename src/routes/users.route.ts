import { Router } from 'express';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { UsersController } from '@/controllers/users.controller';

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.usersController.getUserById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateUserDto), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateUserDto), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.usersController.deleteUser);
  }
}
