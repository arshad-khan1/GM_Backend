import UserModel from '@models/users.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import PasswordModel from '@/models/passwords.model';
import { RegisterOwnerByEmailDto, RegisterOwnerByPhoneDto } from '@dtos/auth.dto';
import GymModel from '@/models/gyms.model';
import GymUserModel from '@/models/staff.model';

class AuthService {
  public async registerOwnerByEmail(data: RegisterOwnerByEmailDto): Promise<{ user: any; token: string }> {
    if (isEmpty(data)) throw new HttpException(400, 'UserData is empty');

    const findUser = await UserModel.findOne({ email: data.email });
    if (findUser) throw new HttpException(409, `This email ${data.email} already exists`);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createUserData = await UserModel.create({
      email: data.email,
      fullName: data.name,
      role: 1, // 0 - For Owner
    });

    const createPassword = await PasswordModel.create({
      userId: createUserData._id,
      passwordHash: hashedPassword,
    });
    if (!createPassword) {
      const deleteUserData = await UserModel.findByIdAndDelete(createUserData._id);
      if (!deleteUserData) throw new HttpException(409, 'User not deleted');
      throw new HttpException(409, 'Password not created');
    }

    const token = jwt.sign({ _id: createUserData._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    return { user: createUserData, token };
  }

  public async registerOwnerByPhone(data: RegisterOwnerByPhoneDto): Promise<{ user: any; token: string }> {
    if (isEmpty(data)) throw new HttpException(400, 'UserData is empty');

    const findUser = await UserModel.findOne({ phone: data.phone });
    if (findUser) throw new HttpException(409, `This phone ${data.phone} already exists`);

    const createUserData = await UserModel.create({
      phone: data.phone,
      fullName: data.name,
      role: 1, // 0 - For Owner
    });

    const token = jwt.sign({ _id: createUserData._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    return { user: createUserData, token };
  }

  public async loginOwnerByEmail(email: string, password: string): Promise<{ token: string; user: any; gym: any; gymUser: any }> {
    if (isEmpty(email) || isEmpty(password)) throw new HttpException(400, 'Invalid credentials');

    const findUser = await UserModel.findOne({ email });
    if (!findUser) throw new HttpException(404, 'User not found');

    const findPassword = await PasswordModel.findOne({ userId: findUser._id });
    if (!findPassword) throw new HttpException(404, 'Password not found');

    const isPasswordMatching = await bcrypt.compare(password, findPassword.passwordHash);
    if (!isPasswordMatching) throw new HttpException(400, 'Invalid credentials');

    const token = jwt.sign({ _id: findUser._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    let gym, gymUser;
    if (findUser.role === 1) {
      gym = await GymModel.find({ ownerId: findUser._id });
      if (!gym) throw new HttpException(404, 'Gym not found');

      gymUser = await GymUserModel.find({ gymId: gym._id });
      if (!gymUser) throw new HttpException(404, 'Gym User not found');
    }

    return { token, user: findUser, gym, gymUser };
  }

  public async loginOwnerByPhone(phone: string): Promise<{ token: string }> {
    if (isEmpty(phone)) throw new HttpException(400, 'Invalid credentials');

    const findUser = await UserModel.findOne({ phone });
    if (!findUser) throw new HttpException(404, 'User not found');

    const token = jwt.sign({ _id: findUser._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    return { token };
  }
}

export default AuthService;
