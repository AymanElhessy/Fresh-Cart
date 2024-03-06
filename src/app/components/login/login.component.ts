import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  isLoading: boolean = false;
  errMsg: string = '';
  /* 
  ! loginForm: FormGroup = new FormGroup({
  !  email: new FormControl('', [Validators.required, Validators.email]),
  !  password: new FormControl('', [
  !   Validators.required,
  !  Validators.pattern(/^\w{6,}$/),
    ]),
  });
   */

  // ? form builder
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  handelForm(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            localStorage.setItem('token', response.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
