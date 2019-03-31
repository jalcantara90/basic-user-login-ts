export interface PostResponse {
  success: boolean;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  user?: User;
  created?: string;
  message?: string;
  coords?: string;
}

export interface User {
  avatar: string;
  _id?: string;
  name: string;
  email: string;
  password?: string;
}
