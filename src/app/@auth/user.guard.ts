import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbRoleProvider } from '@nebular/security';
import { ROLES } from './roles';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private roleProvider: NbRoleProvider) {}

  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.roleProvider.getRole()
      .pipe(map(role => {
        const roles = role instanceof Array ? role : [role];
        return roles.some(x => x && x.toLowerCase() === ROLES.USER);
      }));
  }
  
}
