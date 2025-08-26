import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import AuthService from '@/services/auth.service';

export class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, token } = await this.authService.register(userData);

      res.status(201).json({ data: { user, token }, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token } = await this.authService.login(email, password);

      res.status(200).json({ data: { token }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Implement logout logic here (e.g., invalidate token)
      res.status(200).json({ data: {}, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
