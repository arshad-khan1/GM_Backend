import UserModel from '@models/users.model';
import { User } from '@interfaces/users.interface';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class UserService {
  public async findAllUsers(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, 'User not found');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'UserData is empty');

    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const createUserData: User = await UserModel.create({ ...userData });

    return createUserData;
  }

  public async updateUser(userId: string, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'UserData is empty');

    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, 'User not found');

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { ...userData });
    if (!updateUserById) throw new HttpException(409, 'User not updated');

    const updatedUser: User = await UserModel.findOne({ _id: userId });

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(404, 'User not found');

    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, 'User not deleted');

    return findUser;
  }
}

export default UserService;
