import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service'
import { AuthService } from './../../../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    this._api.postTypeRequest('/login', form.value).subscribe((res: any) => {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
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