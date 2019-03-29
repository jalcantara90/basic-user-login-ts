import jwt from 'jsonwebtoken';

export default class Token {

  private static seed: string = 'este es el seed de mi app hioputa';
  private static expireTime: string = '30d';

  static getJwtToken( payload: any ): string { 
    return jwt.sign({ user: payload }, this.seed, { expiresIn: this.expireTime });
  }

  static compareToken( token: string ): any {
    return new Promise( (resolve, reject) => {
      jwt.verify( token, this.seed, ( err, decoded ) => {
        if ( err ) reject(err);

        resolve(decoded);
      });
    });
  }
}