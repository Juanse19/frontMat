import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { UserStore } from '../../../../stores/user.store';


@Injectable({
  providedIn: 'root'
})
export class PermissionGuardGuard implements CanActivate {

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  alive: boolean = true;
  data: any;
  dataAcces: any;

  constructor(private authService: NbAuthService, private router: Router, private userStore: UserStore,) {

    this.authService.getToken()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any) => {
        // console.log(res.accessTokenPayload.user);
        this.data = res.accessTokenPayload.user;
      });

      this.dataAcces = this.userStore.getUser().access
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const expectedPermission = route.data.expectedPermission;

    // const user = this.data;
    // const permissions = user.access;

    const user = this.data;
    const permissions = this.dataAcces === undefined ? user.access : this.dataAcces;

    console.log(this.dataAcces.includes(expectedPermission));
    
    
    // console.log(permissions.includes(expectedPermission));

    if (permissions.includes(expectedPermission)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
