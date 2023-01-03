import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private TokenService : TokenService,
    private authservice : AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    //const token = this.TokenService.getToken();
    //if ( !token) {
    //  this.router.navigate(['/home']);
    //  return false;
    //}
    //return true;


    return this.authservice.user$
    .pipe(
      map(user => {
        if(!user) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    )

  }

}
