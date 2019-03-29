import { Request, Response } from 'express';
import { IRequestInjectedUser } from '../interfaces/request-injected-user.interface';
import { Post } from '../models/post.model';
import { IFileUpload } from '../interfaces/file-upload.interface';
import FileSystem from '../classes/file-system';

const fileSystem = new FileSystem();

export const createPost = async (req: IRequestInjectedUser, res: Response) => {
  try {
    if (req.user) {
      const { message, coords } = req.body;
      const user =  req.user._id;
      
      let post = await Post.create( { message, coords, user } );
      post = await post.populate('user', '-password').execPopulate();

      res.json({
        success: true,
        post
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const getPost = async (req: Request, res: Response ) => {
  try {
    let { page, limit, skip } = req.query;
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    skip = (page - 1) * 10;


    const posts = await Post.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', '-password')
      .exec();

    res.json({
      success: true,
      posts
    });
  } catch (error) {
    
  }
};

export const uploadImg = async (req: any, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: true, message: 'No se subió ningún archivo'});
    }
    
    const img: IFileUpload = req.files.img;
    
    if (!img) {
      return res.status(400).json({ error: true, message: 'No se subió ningún archivo -image'}); 
    }
  
    if (!img.mimetype.includes('image')) {
      return res.status(400).json({ error: true, message: 'No se subió una imagen -image'}); 
    }
  
    
    await fileSystem.saveTempImg( img, req.user._id );
  
    res.json({
      success: true,
      img: img.mimetype
    });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Ocurrió un problema'}); 
  }
};