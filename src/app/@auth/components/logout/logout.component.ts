/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS, NbAuthService, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import {UserStore} from '../../../@core/stores/user.store';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import {ApiGetService} from '../../../@auth/components/register/apiGet.services';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');
  private alive = true;
  public time: number = 1000;

  constructor(protected service: NbAuthService,
              private userStore: UserStore,
              private apiGetComp: ApiGetService,
              private api: HttpService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) { }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    // debugger
    const currentUserId = this.userStore.getUser().id;
  // console.log("este es el usuario: ",this.userStore.getUser().firstName);
      let respons = {
            user: currentUserId,
            sesion: 0, 
            
    };
      this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/updateSesion', respons)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
        //  console.log("Envió: ", res);
          });

    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay, this.time);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
