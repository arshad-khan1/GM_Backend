import { NextFunction, Request, Response } from 'express';
import { CreateGymUserDto, UpdateGymUserDto, UpdateGymUserStatusDto } from '@dtos/gym_users.dto';
import GymUsersService from '@services/gym_users.service';

export class GymUsersController {
  public gymUsersService = new GymUsersService();

  public getGymUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllGymUsersData = await this.gymUsersService.findAllGymUsers();

      res.status(200).json({ data: findAllGymUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGymUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymUserId: string = req.params.id;
      const findOneGymUserData = await this.gymUsersService.findGymUserById(gymUserId);

      res.status(200).json({ data: findOneGymUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGymUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymUserData: CreateGymUserDto = req.body;
      const createGymUserData = await this.gymUsersService.createGymUser(gymUserData);

      res.status(201).json({ data: createGymUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGymUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymUserId: string = req.params.id;
      const gymUserData: UpdateGymUserDto = req.body;
      const updateGymUserData = await this.gymUsersService.updateGymUser(gymUserId, gymUserData);

      res.status(200).json({ data: updateGymUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGymUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gymUserId: string = req.params.id;
      const deleteGymUserData = await this.gymUsersService.deleteGymUser(gymUserId);

      res.status(200).json({ data: deleteGymUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public updateGymUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statusData: UpdateGymUserStatusDto = req.body;
      const updateGymUserStatusData = await this.gymUsersService.updateGymUserStatus(statusData);

      res.status(200).json({ data: updateGymUserStatusData, message: 'status updated' });
    } catch (error) {
      next(error);
    }
  };
}
