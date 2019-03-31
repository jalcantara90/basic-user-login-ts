import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string = null;
  user: User = null;

  constructor(
    private _http: HttpClient,
    private _storage: Storage,
    private _navCtrl: NavController
  ) { }

  public login( email: string, password: string ): Promise<boolean> {
    const data = { email, password };

    return new Promise( resolve => {
      this._http.post(`${environment.backUrl}/user/login`, data)
        .subscribe( (res: { success: boolean, token: string }) => {
          if (res.success) {
            this.saveToken(res.token);
            resolve(true);
          } else {
            this.token = null;
            this._storage.clear();
            resolve(false);
          }
        });
    });
  }

  public signUp( user: User ) {
    return new Promise( resolve => {
      this._http.post(`${environment.backUrl}/user/create`, user)
        .subscribe( (res: { success: boolean, token: string }) => {
          if (res.success) {
            this.saveToken(res.token);
            resolve(true);
          } else {
            this.token = null;
            this._storage.clear();
            resolve(false);
          }
        }, error => {
          this.token = null;
          this._storage.clear();
          resolve(false);
        });
    });
  }

  private async saveToken( token: string ): Promise<void> {
    this.token = token;
    await this._storage.set('token', token);
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken();

    if ( !this.token ) {
      this._navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this._http.get(`${environment.backUrl}/user/`, { headers })
        .subscribe( (res: { success: boolean, user: User }) => {
          if ( res.success ) {
            this.user = res.user;
            resolve(true);
          } else {
            this._navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  async loadToken() {
    this.token = await this._storage.get('token') || null;
  }
}
