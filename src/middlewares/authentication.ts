import { Request, Response, NextFunction } from 'express';
import Token from '../classes/token';
import { IRequestInjectedUser } from '../interfaces/request-injected-user.interface';

export const compareToken = async (req: IRequestInjectedUser, res: Response, next: NextFunction) => {
  try {
    const userToken = req.get('x-token') || '';
  
    const decoded: any = await Token.compareToken( userToken );
    req.user = decoded.user;
  
    next();
  } catch (error) {
    res.json({
      error: true,
      message: 'Token inválido'
    });
  }
};
