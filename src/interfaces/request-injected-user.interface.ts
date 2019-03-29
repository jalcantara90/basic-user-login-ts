import { Request } from 'express';
import { IUser } from '../models/user.model';

export interface IRequestInjectedUser extends Request {
  user?: IUser;
}
