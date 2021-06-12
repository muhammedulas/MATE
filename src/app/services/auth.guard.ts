import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tokenResponse } from '../models/tokenResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private session: tokenResponse = new tokenResponse();
  private date: Date = new Date();
  constructor(
    private router: Router,
    private auth:AuthService
  ) {
    this.auth.observeSessionInfo().subscribe(s=>{
      this.session = s
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isLoggedIn || (Date.parse(this.date.toString()) < Date.parse(this.session['.expires']))) {
      if (route.routeConfig.path == 'admin') {
        if (this.auth.isAdmin) return true
        else {
          this.router.navigate(['/login'])
          return false
        }
      }
      else return true
    }
    else {
      this.auth.logout()
      this.router.navigate(['/login'])
      return false
    }
  }

}
