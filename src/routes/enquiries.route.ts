import { Router } from 'express';
import { CreateEnquiryDto, UpdateEnquiryDto, UpdateEnquiryStatusDto, GetEnquiriesByGymIdDto } from '@dtos/enquiries.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { EnquiriesController } from '@controllers/enquiries.controller';

export class EnquiriesRoute implements Routes {
  public path = '/enquiries';
  public router = Router();
  public enquiriesController = new EnquiriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.enquiriesController.getEnquiries);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.enquiriesController.getEnquiryById);
    this.router.post(
      `${this.path}/by-gym`,
      AuthMiddleware,
      ValidationMiddleware(GetEnquiriesByGymIdDto),
      this.enquiriesController.getEnquiriesByGymId,
    );
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateEnquiryDto), this.enquiriesController.createEnquiry);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateEnquiryDto), this.enquiriesController.updateEnquiry);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.enquiriesController.deleteEnquiry);
    this.router.patch(
      `${this.path}/status`,
      AuthMiddleware,
      ValidationMiddleware(UpdateEnquiryStatusDto),
      this.enquiriesController.updateEnquiryStatus,
    );
  }
}
