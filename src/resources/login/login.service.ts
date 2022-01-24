import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { JWT_SECRET_KEY } from '../../common/config';
import User from '../users/user.model';
import { User as UserEntity } from '../../entity/User';
import usersRepo from '../users/user.memory.repository';
import { NAME, LOGIN, PASSWORD, SALT } from '../../constants';

const SECRET_KEY = `${JWT_SECRET_KEY}`;

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const checkPassword = async (password: string, hash: string) => {
  const isSimilar = await bcrypt.compare(password, hash);
  return isSimilar;
};

const addAdmin = async () => {
  const userRepository = getRepository(UserEntity);
  const admin = await userRepository.findOne({ where: { login: LOGIN } });
  if (!admin) {
    const hash = await hashPassword(PASSWORD);
    const newUser = new User(NAME, LOGIN, hash);

    await userRepository.save(newUser);
    return User.toResponse(newUser);
  }
  return null;
};

const signToken = async (userLogin: string, password: string) => {
  const user = await usersRepo.getUserByProps(userLogin);
  if (!user) {
    return null;
  }
  const { password: hashedPassword } = user;
  if (hashedPassword) {
    const isSimilar = await checkPassword(password, hashedPassword);
    if (isSimilar) {
      const { id, login } = user;
      const token = jwt.sign({ id, login }, SECRET_KEY);
      return token;
    }
  }
  return null;
};

export default {
  signToken,
  hashPassword,
  checkPassword,
  addAdmin,
};
