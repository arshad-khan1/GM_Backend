import UserModel from '@models/users.model';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import PasswordModel from '@/models/passwords.model';

class AuthService {
  public async register(userData: CreateUserDto): Promise<{ user: any; token: string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'UserData is empty');

    const findUser = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const createUserData = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    const createPassword = await PasswordModel.create({
      user_id: createUserData._id,
      password: hashedPassword,
    });
    if (!createPassword) throw new HttpException(409, 'Password not created');

    const token = jwt.sign({ _id: createUserData._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    return { user: createUserData, token };
  }

  public async login(email: string, password: string): Promise<{ token: string }> {
    if (isEmpty(email) || isEmpty(password)) throw new HttpException(400, 'Invalid credentials');

    const findUser = await UserModel.findOne({ email });
    if (!findUser) throw new HttpException(404, 'User not found');

    const findPassword = await PasswordModel.findOne({ user_id: findUser._id });
    if (!findPassword) throw new HttpException(404, 'Password not found');

    const isPasswordMatching = await bcrypt.compare(password, findPassword.password);
    if (!isPasswordMatching) throw new HttpException(400, 'Invalid credentials');

    const token = jwt.sign({ _id: findUser._id }, SECRET_KEY, { expiresIn: '7d' }); // Replace 'secretKey' with a strong, environment-specific secret

    return { token };
  }
}

export default AuthService;
