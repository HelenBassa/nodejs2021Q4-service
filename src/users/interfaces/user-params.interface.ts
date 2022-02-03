import { IUser } from './user.interface';

export type IUserParams = Omit<IUser, 'id'>;
