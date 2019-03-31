import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('mainSlide') slides: IonSlides;

  public avatars: { img: string, selected: boolean }[] = [
    { img: 'av-1.png', selected: true },
    { img: 'av-2.png', selected: false },
    { img: 'av-3.png', selected: false },
    { img: 'av-4.png', selected: false },
    { img: 'av-5.png', selected: false },
    { img: 'av-6.png', selected: false },
    { img: 'av-7.png', selected: false },
    { img: 'av-8.png', selected: false }
  ];

  avatarSlidesOptions = {
    slidesPerView: 3.5
  };

  constructor(
    private _userService: UserService,
    private _navCtrl: NavController,
    private _uiService: UiServiceService
  ) { }

  ngOnInit(): void {
    this.slides.lockSwipes(true);
  }

  async login( form: NgForm ): Promise<void> {
    if ( form.invalid ) { return; }

    if ( await this._userService.login( form.value.email, form.value.password ) ) {
      this._navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      this._uiService.infoAlert('Usuario y contraseña incorrectos');
    }
  }

  async signUp( form: NgForm ): Promise<void> {
    const { email, password, name } = form.value;
    const avatar = this.avatars.find( item => item.selected ).img;

    if ( form.invalid ) { return; }

    if ( await this._userService.signUp( { email, password, name, avatar } ) ) {
      this._navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      this._uiService.infoAlert('Ese correo ya está registrado');
    }

  }

  avatarSelected( avatar: { img: string, selected: boolean } ): void {
    this.avatars.forEach( av => av.selected = false );
    avatar.selected = true;
  }

  goToLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  goToSignup() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
