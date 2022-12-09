import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateadminGuard implements CanActivate {

  constructor(
    private authentication: AuthenticationService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      let token = this.authentication.getToken();
      let userRole = this.authentication.getUserRole();

      return this.authentication.authenticateToken(token).pipe(map((res: any) => {
        // console.log(`authentic role?: ${userRole}`);
        return res['isAuthenticated'] && userRole == 'admin';
      }));

      // return this.authentication.
  }

}
