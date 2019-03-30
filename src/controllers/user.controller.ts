
import { Request, Response } from 'express';
import { IUser, User } from '../models/user.model';
import bcrypt  from 'bcrypt';
import Token from '../classes/token';
import { IRequestInjectedUser } from '../interfaces/request-injected-user.interface';

export const createUser = async ( req: Request, res: Response ) => {
  
  const { name, password, email, avatar } = req.body;

  const user: IUser = await User.create( { name, password: bcrypt.hashSync(password, 10), email, avatar } );

  res.json({
    success: true,
    user
  });
};

export const getUserById = async ( req: Request, res: Response ) => {
  const { userId } = req.params;

  if (!userId) return res.status(401).send({ error: true, message: 'llamada no válida' });
  
  const user: IUser | null = await User.findById( userId );
  
  if (!user) return res.status(404).send({ error: true, message: 'usuario no encontrado' });

  res.json({
    success: true,
    user
  });
};

export const userLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email }, ( err, userDB ) => {
    if ( err ) throw err;
    
    if ( !userDB ) {
      return res.json({
        error: true,
        message: 'Usuario/contraseña inválidos'
      });
    }

    if ( userDB.comparePassword( password ) ) {
    
      const token = Token.getJwtToken({ _id: userDB._id, name: userDB.name, email: userDB.email, avatar: userDB.avatar });

      res.json({
        success: true,
        token
      });
    } else {
      res.json({
        error: true,
        message:  'Usuario/contraseña inválidos ***'
      });
    }
  });
};

export const updateUser = (req: IRequestInjectedUser, res: Response) => {
  const { name, email, avatar } = req.body;

  if ( req.user ) {
    const user = {
      name: name ? name : req.user.name,
      avatar: avatar ? avatar : req.user.avatar,
      email: email ? email : req.user.email,
    };

    User.findByIdAndUpdate( req.user._id, user, { new: true }, (err, userDB) => {
      if ( err ) throw err;

      if ( !userDB ) {
        return res.json({
          error: true,
          message: 'Usuario no existe'
        });
      }

      const token = Token.getJwtToken({ _id: userDB._id, name: userDB.name, email: userDB.email, avatar: userDB.avatar });

      res.json({
        success: true,
        token
      });
    });
  }
};

export const getUserData = (req: IRequestInjectedUser, res: Response) => {
  const { user } = req;

  res.json({
    success: true,
    user
  });
};