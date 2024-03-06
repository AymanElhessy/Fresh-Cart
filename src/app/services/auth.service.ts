import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { UserData } from './../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  userData: any;
  register(userData: UserData): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  login(userData: UserData): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
  userId: string = '';
  decodeUserData() {
    if (localStorage.getItem('token') != null) {
      let encodeToken: any = localStorage.getItem('token');

      let decodeToken = jwtDecode(encodeToken);

      this.userData = decodeToken;
      this.userId = this.userData;
    }
  }

  signOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
