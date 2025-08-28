import { Router } from 'express';
import { LoginOwnerByEmailDto, LoginOwnerByPhoneDto, RegisterOwnerByEmailDto, RegisterOwnerByPhoneDto } from '@dtos/auth.dto';
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
    // Owner Register
    this.router.post(`${this.path}/register/owner/email`, ValidationMiddleware(RegisterOwnerByEmailDto), this.authController.registerOwnerByEmail);
    this.router.post(`${this.path}/register/owner/phone`, ValidationMiddleware(RegisterOwnerByPhoneDto), this.authController.registerOwnerByPhone);
    // this.router.post(`${this.path}/register/owner/google`, ValidationMiddleware(RegisterDto), this.authController.registerOwnerByGoogle);
    // Login
    this.router.post(`${this.path}/login/owner/email`, ValidationMiddleware(LoginOwnerByEmailDto), this.authController.loginOwnerByEmail);
    this.router.post(`${this.path}/login/owner/phone`, ValidationMiddleware(LoginOwnerByPhoneDto), this.authController.loginOwnerByPhone);
    // this.router.post(`${this.path}/login/owner/google`, ValidationMiddleware(LoginDto), this.authController.loginOwnerByGoogle);
    // Logout
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}
