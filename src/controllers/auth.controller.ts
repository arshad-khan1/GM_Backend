import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth.service';
import { RegisterOwnerByEmailDto, RegisterOwnerByPhoneDto } from '@/dtos/auth.dto';

export class AuthController {
  public authService = new AuthService();

  public registerOwnerByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterOwnerByEmailDto = req.body;
      const { user, token } = await this.authService.registerOwnerByEmail(userData);

      res.status(201).json({ data: { user, token }, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public registerOwnerByPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterOwnerByPhoneDto = req.body;
      const { user, token } = await this.authService.registerOwnerByPhone(userData);

      res.status(201).json({ data: { user, token }, message: 'register' });
    } catch (error) {
      next(error);
    }
  };

  public loginOwnerByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.authService.loginOwnerByEmail(email, password);

      res.status(200).json({ data: { user, token }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public loginOwnerByPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone } = req.body;
      const { token } = await this.authService.loginOwnerByPhone(phone);

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
