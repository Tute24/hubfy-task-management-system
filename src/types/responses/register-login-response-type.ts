import { UserType } from '../user-type';

export type RegisterLoginResponseType = {
  message: string;
  user: UserType;
  token: string;
};
