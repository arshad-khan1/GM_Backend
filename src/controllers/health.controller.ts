import { NextFunction, Request, Response } from 'express';

export class HealthController {
  public Health = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      next(error);
    }
  };
}
