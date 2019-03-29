import { Router } from 'express';
import { compareToken } from '../middlewares/authentication';
import { createPost, getPost, uploadImg } from '../controllers/post.controller';

const postRoutes = Router();

postRoutes.get('/', [ compareToken ], getPost);
postRoutes.post('/', [ compareToken ], createPost);
postRoutes.post('/upload', [ compareToken ], uploadImg);

export default postRoutes;