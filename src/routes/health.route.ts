import { Router } from 'express';
import { HealthController } from '@controllers/health.controller';
import { Routes } from '@interfaces/routes.interface';

export class HealthRouter implements Routes {
  public path = '/health';
  public router = Router();
  public health = new HealthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.health.Health);
  }
}
