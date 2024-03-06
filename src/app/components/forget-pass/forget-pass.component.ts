import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/forget-password.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css'],
})
export class ForgetPassComponent {
  constructor(
    private _ForgetPasswordService: ForgetPasswordService,
    private _Router: Router
  ) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg: string = '';

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  forgetPassword(): void {
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    this._ForgetPasswordService.forgetPassword(userEmail).subscribe({
      next: (response) => {
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
  resetCode(): void {
    let userCode = this.resetCodeForm.value;
    this._ForgetPasswordService.resetCode(userCode).subscribe({
      next: (response) => {
        this.userMsg = response.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
  newPassword(): void {
    let resetForm = this.resetPassword.value;
    resetForm.email = this.email;

    this._ForgetPasswordService.resetPassword(resetForm).subscribe({
      next: (response) => {
        console.log(response);
        if (response?.token) {
          localStorage.setItem('token', response.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
    });
  }
}
