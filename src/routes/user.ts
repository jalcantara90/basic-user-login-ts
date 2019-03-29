import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { compareToken } from "../middlewares/authentication";
import { getUserById, createUser, userLogin, updateUser } from '../controllers/user.controller';

const userRoutes: Router = Router();

userRoutes.get('/:userId', getUserById );
userRoutes.post('/create', createUser);
userRoutes.post('/login', userLogin);
userRoutes.post('/update', compareToken, updateUser);

export default userRoutes;