import { IUser } from './user.interface';

export type UserWithoutPass = Omit<IUser, 'password'>;
