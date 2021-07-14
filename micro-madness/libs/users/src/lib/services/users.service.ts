import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrlPrefix = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrlPrefix}users/`);
  }

  getUser(userId: string) : Observable<User> {
    return this.http.get<User>(`${this.apiUrlPrefix}users/${userId}`);
  }

  createUser(user: User) : Observable<User> {
    return this.http.post<User>(`${this.apiUrlPrefix}users/`, user);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put<User>(`${this.apiUrlPrefix}users/${user.id}`, user);
  }

  deleteUser(userId: string) : Observable<unknown> {
    return this.http.delete<unknown>(`${this.apiUrlPrefix}users/${userId}`);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlPrefix}users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}
