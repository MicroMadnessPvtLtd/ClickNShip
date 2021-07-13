import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrlPrefix = environment.apiURL;

  constructor(private http: HttpClient, private localstorageService: LocalstorageService, private router: Router) { }

  login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(this.apiUrlPrefix + 'authenticate/login', {email: email, password: password});
  }

  logout() {
    this.localstorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
