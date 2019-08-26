import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(): boolean {
    let isLoggedIn = localStorage.getItem("ISLOGGEDIN");
    if(isLoggedIn === 'true'){
      return true;
    }
    return false;
  }
}