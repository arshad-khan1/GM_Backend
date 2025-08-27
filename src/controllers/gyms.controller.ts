import { NextFunction, Request, Response } from 'express';
import { CreateGymDto, UpdateGymDto, UpdateGymStatusDto } from '@dtos/gyms.dto';
import GymsService from '@services/gyms.service';

export class GymsController {
  public gymsService = new GymsService();

  public getGyms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllGymsData = await this.gymsService.findAllGyms();

      res.status(200).json({ data: findAllGymsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGymById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymId: string = req.params.id;
      const findOneGymData = await this.gymsService.findGymById(gymId);

      res.status(200).json({ data: findOneGymData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymData: CreateGymDto = req.body;
      const createGymData = await this.gymsService.createGym(gymData);

      res.status(201).json({ data: createGymData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymId: string = req.params.id;
      const gymData: UpdateGymDto = req.body;
      const updateGymData = await this.gymsService.updateGym(gymId, gymData);

      res.status(200).json({ data: updateGymData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGym = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymId: string = req.params.id;
      const deleteGymData = await this.gymsService.deleteGym(gymId);

      res.status(200).json({ data: deleteGymData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateGymStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statusData: UpdateGymStatusDto = req.body;
      const updateGymStatusData = await this.gymsService.updateGymStatus(statusData);

      res.status(200).json({ data: updateGymStatusData, message: 'status updated' });
    } catch (error) {
      next(error);
    }
  };
}
