import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localstorageService: LocalstorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localstorageService.getToken();
    if (!token) {   
      this.router.navigate(['/login']); 
      return false;
    } else {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);
      if (tokenDecode.isAdmin && !this._checkTokenExpiry(tokenDecode.exp)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

  private _checkTokenExpiry(tokenExpiry: any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= tokenExpiry;
  }
}
