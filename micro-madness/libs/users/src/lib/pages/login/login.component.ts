import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LocalstorageService } from '@micro-madness/users';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Invalid Email or Password';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginFrom();
  }

  login() {
    this.isSubmitted = true;
    const loginData = {
      email: this.LoginForm.email.value, 
      password: this.LoginForm.password.value
    }
    console.log(loginData);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(loginData.email, loginData.password).subscribe((user) => {
      this.authError = false;
      this.localStorageService.setToken(user.token);
      console.log(user);
      this.router.navigate(['/']);
    }, (err : HttpErrorResponse) => {
      this.authError = true;
      if (err.status !== 400) {
        this.authMessage = 'Something went wrong with the server. Please try again.'
      }
    })
  }

  private _initLoginFrom(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get LoginForm() {
    return this.loginForm.controls;
  }

}
