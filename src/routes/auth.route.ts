import { Router } from 'express';
import { LoginDto, RegisterDto } from '@dtos/auth.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthController } from '@/controllers/auth.controller';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, ValidationMiddleware(RegisterDto), this.authController.register);
    this.router.post(`${this.path}/login`, ValidationMiddleware(LoginDto), this.authController.login);
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}
