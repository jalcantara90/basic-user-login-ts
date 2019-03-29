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
}