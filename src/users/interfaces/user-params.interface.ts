import { IUser } from './user.interface';

// export type UserParams = {
//   userId: string;
// };
export type IUserParams = Omit<IUser, 'id'>;
