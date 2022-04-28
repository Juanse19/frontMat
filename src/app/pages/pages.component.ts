/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../@core/backend/common/api/http.service';
import { Router } from '@angular/router';
import { UserStore } from '../@core/stores/user.store';
import Swal from 'sweetalert2';
import { ApiGetService } from '../@core/backend/common/api/apiGet.services';

interface dataLicens {
  Id: number;
  Lat: number;
  States: number;
  Licens_id: string;
}

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {

  menu: NbMenuItem[];
  alive: boolean = true;
  public validData: dataLicens[] = [];
  intervalSubscriptionStatusSesion: Subscription;

  constructor(private pagesMenu: PagesMenu,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
    private http: HttpClient,
    private router: Router,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private userStore: UserStore,
  ) {
    this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });

  }

  initMenu() {
    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
      this.AutoLogoutCharge();
  }

  public AutoLogoutCharge() {
    try {
    if (this.intervalSubscriptionStatusSesion) {
      this.intervalSubscriptionStatusSesion.unsubscribe();
    }
    // debugger
    this.intervalSubscriptionStatusSesion = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/getlEmailuser?Email=' + this.userStore.getUser().email)),
    )
    .subscribe((res: any) => {
        // this.states  = res;
        // console.log('status:', res);

        if (res == undefined) {
          console.log('no hay data');
          this.AutoLogoutCharge();
        } else {
          // console.log('Si hay');
          
        
        this.validData = res;
        // debugger
        // console.log('Email ValidData: ', this.validData[0].Id)
        if ( this.validData[0].Lat === 0 && this.validData[0].Licens_id === '1') {
          // debugger
          this.intervalSubscriptionStatusSesion.unsubscribe();
          Swal.fire({
            title: 'Se cerrará la sesión?',
            text: `¡Desea continuar con la sesión activa!`,
            icon: 'warning',
            timer: 3500,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            cancelButtonText: 'Cerrar!',
            confirmButtonText: '¡Desea continuar!',
          }).then(result => {
            if (result.value) {
             
              let respon = {
                user: this.validData[0].Id,
                sesion: 1,
              };
              this.apiGetComp
                .PostJson(this.api.apiUrlNode1 + '/updateSesion', respon)
                .pipe(takeWhile(() => this.alive))
                .subscribe((res: any) => {
                  //  console.log("Envió: ", res);
                });
              // this.intervalSubscriptionStatusSesion.unsubscribe();
              
              // console.log("Continua navegando: ", res);
              this.AutoLogoutCharge();
        // Swal.fire('¡Se sincronizo Exitosamente', 'success');
            } else {
              // console.log('Se cierra por tiempo');
              
              this.router.navigate(['/auth/logout']);
            }
          });

          // this.router.navigate(['/auth/logout']);
          // console.log('Se cerro la sesion');

        } else {
         
          //  console.log('Continue con la sesion');

        }
    }
  },
    );
  } catch (error) {
        console.log('No fount data.');
        
  }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

//   ngDoCheck(){
//     this.AutoLogoutCharge();
//     console.log('ngDoCheck');
//     console.log('DoCheck: ', this.AutoLogoutCharge);
    
// }

// ngOnChanges(){
//     console.log('ngOnChanges');
//     this.AutoLogoutCharge();
// }
  
}
