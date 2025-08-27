import { NextFunction, Request, Response } from 'express';
import { CreateEnquiryDto, UpdateEnquiryDto, UpdateEnquiryStatusDto } from '@dtos/enquiries.dto';
import EnquiriesService from '@services/enquiries.service';

export class EnquiriesController {
  public enquiriesService = new EnquiriesService();

  public getEnquiries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEnquiriesData = await this.enquiriesService.findAllEnquiries();

      res.status(200).json({ data: findAllEnquiriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEnquiryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiryId: string = req.params.id;
      const findOneEnquiryData = await this.enquiriesService.findEnquiryById(enquiryId);

      res.status(200).json({ data: findOneEnquiryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getEnquiriesByGymId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { gymId }: { gymId: string } = req.body;
      const findEnquiriesData = await this.enquiriesService.findEnquiriesByGymId(gymId);

      res.status(200).json({ data: findEnquiriesData, message: 'findByGymId' });
    } catch (error) {
      next(error);
    }
  };

  public createEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiryData: CreateEnquiryDto = req.body;
      const createEnquiryData = await this.enquiriesService.createEnquiry(enquiryData);

      res.status(201).json({ data: createEnquiryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiryId: string = req.params.id;
      const enquiryData: UpdateEnquiryDto = req.body;
      const updateEnquiryData = await this.enquiriesService.updateEnquiry(enquiryId, enquiryData);

      res.status(200).json({ data: updateEnquiryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiryId: string = req.params.id;
      const deleteEnquiryData = await this.enquiriesService.deleteEnquiry(enquiryId);

      res.status(200).json({ data: deleteEnquiryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateEnquiryStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statusData: UpdateEnquiryStatusDto = req.body;
      const updateEnquiryStatusData = await this.enquiriesService.updateEnquiryStatus(statusData);

      res.status(200).json({ data: updateEnquiryStatusData, message: 'status updated' });
    } catch (error) {
      next(error);
    }
  };
}
