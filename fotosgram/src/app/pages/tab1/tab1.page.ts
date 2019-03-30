import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostResponse, Post } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  private _postSubscription: Subscription = new Subscription();
  public posts: Post[] = [];
  public infiniteScrollDisabled = false;

  constructor( private _postService: PostService ) {}

  ngOnInit(): void {
    this.loadNextPostPage();
  }

  public reload( event? ): void {
    this.infiniteScrollDisabled = false;
    this.posts = [];
    this.loadNextPostPage( event, true);
  }

  ngOnDestroy(): void {
    this._postSubscription.unsubscribe();
  }

  public loadNextPostPage( event?, pull: boolean = false ) {
    this._postSubscription = this._postService.getPost(pull)
      .subscribe( (res: PostResponse) => {
        console.log(res);
        this.posts.push( ...res.posts );

        if ( event ) {
          event.target.complete();

          if ( !res.posts.length ) {
            this.infiniteScrollDisabled = true;
          }
        }
      });
  }
}
