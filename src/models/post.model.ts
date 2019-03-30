import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({
  created: { type: Date },
  message: { type: String },
  imgs: [ { type: String } ],
  coords: { type: String },
  user: { type: Schema.Types.ObjectId , ref: 'User' , required: [ true, 'Usuario requerido' ]}
});

postSchema.pre<IPost>('save', function( next ) {
  this.created = new Date();
  next();
});

export interface IPost extends Document {
  created: Date;
  message: string;
  imgs: string[];
  coords: string;
  user: string;
}

export const Post = model<IPost>('Post', postSchema);