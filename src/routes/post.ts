import { Router } from 'express';
import { compareToken } from '../middlewares/authentication';
import { createPost, getPost, uploadImg, getImg } from '../controllers/post.controller';

const postRoutes = Router();

postRoutes.get('/', [ compareToken ], getPost);
postRoutes.get('/image/:userId/:img', getImg);
postRoutes.post('/', [ compareToken ], createPost);
postRoutes.post('/upload', [ compareToken ], uploadImg);

export default postRoutes;