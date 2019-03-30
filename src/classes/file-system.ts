import { IFileUpload } from "../interfaces/file-upload.interface";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';
import { resolve } from "dns";

export default class FileSystem {

  public saveTempImg( img: IFileUpload, userId: string ): Promise<void> {
    return new Promise( (resolve, reject ) => {

      const directory = this.createUserDirectory( userId );
      const imgName = this.generateUniqueFileName( img.name );
  
      img.mv( path.join( directory, imgName), (err: any) => {
        if (err) reject(err);
        
        resolve();
      });
    });
  }

  private createUserDirectory( userId: string ): string {
    const pathUser = path.resolve( __dirname, '../uploads/', userId );
    const pathUserTemp = path.join( pathUser, 'temp');
    
    const exists = fs.existsSync( pathUser );

    if (!exists) {
      fs.mkdirSync( pathUser );
      fs.mkdirSync( pathUserTemp );
    }
    
    return pathUserTemp;
  }

  private generateUniqueFileName( originalName: string ): string {
    const nameArr: string[] = originalName.split('.');
    const ext: string = nameArr[ nameArr.length - 1 ];
    
    return `${uniqid()}.${ext}`;
  }

  public moveImagesFromTempToPost( userId: string ): string[] {
    const pathTemp = path.resolve( __dirname, '../uploads', userId, 'temp' );
    const pathPost = path.resolve( __dirname, '../uploads', userId, 'post' );

    if ( !fs.existsSync( pathTemp ) ) {
      return [];
    }

    if ( !fs.existsSync( pathPost) ) {
      fs.mkdirSync( pathPost );
    }

    const tempImages = this.getTempImages( pathTemp );
   
    tempImages
      .forEach( ( image: string ) => fs.renameSync( path.join(pathTemp, image), path.join(pathPost, image) ) );

    return tempImages;
  }

  private getTempImages( pathTemp: string ): string[] {
    return fs.readdirSync( pathTemp ) || [];
  }

  public getImageUrl( userId: string , img: string  ) {
    const imagePath = path.resolve( __dirname, '../uploads', userId, 'post' , img );
    return fs.existsSync(imagePath) ? imagePath : path.resolve( __dirname, '../assets/400x250.jpg' );
  }
}