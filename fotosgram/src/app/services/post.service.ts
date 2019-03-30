import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PostResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _postPage: number = 0;
  constructor( private _http: HttpClient ) { }

  public getPost( reset: boolean = false ): Observable<PostResponse> {
    if (reset) {
      this._postPage = 0;
    }

    this._postPage++;
    return this._http.get<PostResponse>(`${environment.backUrl}/posts?page=${this._postPage}`);
  }
}
