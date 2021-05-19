import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginApiService } from './login-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private loginApiService : LoginApiService, private router : Router) {

  }

  canActivate() : boolean {
    if (this.loginApiService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
