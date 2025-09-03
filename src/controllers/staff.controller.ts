import { NextFunction, Request, Response } from 'express';
import { CreateStaffDto, UpdateStaffDto, UpdateStaffStatusDto } from '@/dtos/staff.dto';
import StaffService from '@/services/staff.service';

export class StaffController {
  public staffService = new StaffService();

  public getStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStaffData = await this.staffService.findAllStaff();

      res.status(200).json({ data: findAllStaffData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStaffById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffId: string = req.params.id;
      const findOneStaffData = await this.staffService.findStaffById(staffId);

      res.status(200).json({ data: findOneStaffData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffData: CreateStaffDto = req.body;
      const createStaffData = await this.staffService.createStaff(staffData);

      res.status(201).json({ data: createStaffData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffId: string = req.params.id;
      const staffData: UpdateStaffDto = req.body;
      const updateStaffData = await this.staffService.updateStaff(staffId, staffData);

      res.status(200).json({ data: updateStaffData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStaff = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const staffId: string = req.params.id;
      const deleteStaffData = await this.staffService.deleteStaff(staffId);

      res.status(200).json({ data: deleteStaffData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateStaffStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statusData: UpdateStaffStatusDto = req.body;
      const updateStaffStatusData = await this.staffService.updateStaffStatus(statusData);

      res.status(200).json({ data: updateStaffStatusData, message: 'status updated' });
    } catch (error) {
      next(error);
    }
  };
}
