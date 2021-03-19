import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-user-authentication';
  isLogin: boolean = false
  username :string =""

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isUserLogin();
  }
  ngDoCheck() {
    this.isUserLogin();
  }
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
      this.username= this._auth.getUserDetails().username;
    }
    else {
      this.isLogin = false;
    }
  }

  logout() {
    this._auth.clearStorage()
    this._router.navigate(['']);
  }
}
