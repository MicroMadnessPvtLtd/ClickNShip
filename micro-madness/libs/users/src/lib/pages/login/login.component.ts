import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LocalstorageService } from '@micro-madness/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Invalid Email or Password';
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginFrom();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
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
    this.authService.login(loginData.email, loginData.password).pipe(takeUntil(this.endsubs$)).subscribe((user) => {
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
