/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { delay, retry, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { NbTokenService } from '@nebular/auth';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { InitUserService } from '../@theme/services/init-user.service';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../@core/backend/common/api/http.service';
import { Router } from '@angular/router';
import { UserStore } from '../@core/stores/user.store';
import Swal from 'sweetalert2';
import { ApiGetService } from '../@core/backend/common/api/apiGet.services';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketService } from '../@core/backend/common/services/web-socket.service';
import { WebSocketV2Service } from '../@core/backend/common/services/webSocketV2.service';
//import ip from "ip"


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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnDestroy {

  reconnect = false;
  menu: NbMenuItem[];
  alive: boolean = true;
  rutaMenu: NbMenuItem[];
  public validData: dataLicens[] = [];
  intervalSubscriptionStatusSesion: Subscription;

  private index: number = 0;

  constructor(private pagesMenu: PagesMenu,
    private tokenService: NbTokenService,
    protected initUserService: InitUserService,
    private http: HttpClient,
    private router: Router,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private userStore: UserStore,
    private toastrService: NbToastrService,
    private socketV2Service: WebSocketV2Service,
  ) {
    // this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.initMenu();
        this.reload()
      });

  }

  initMenu() {

    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
    // this.AutoLogoutCharge();
    // this.test();

  }

  reload() {
    // Crear una nueva conexión WebSocket si no se ha guardado una antes
    if (!localStorage.getItem('socket')) {
      this.newConnection();
      console.log('TestV1');
    } else {
      this.socketV2Service.restoreSocket();
      console.log('TestV2');
      this.newConnection();
      // this.socketService.sendMessage({ route: "updateIDSocket", email: this.userStore.getUser().email });
    }


    // Guardar la conexión antes de recargar la página
    window.addEventListener('beforeunload', () => {
      this.socketV2Service.connect();
      // this.socketV2Service.saveSocket();
    });

  }

  newConnection() {
    console.log('pagesNew');
    this.socketV2Service.connect();
    this.socketV2Service.getSocket().pipe(
      retry(3),
      retryWhen(errors => errors.pipe(delay(5000), take(10))),

    )
      .subscribe(
        (msg) => {
          // console.log(msg);
          if (msg.isActive === true && msg.message === 'intentando cambiar sesion') {
            // console.log(msg.message);

            Swal.fire({
              title: `${msg.message}, Sesión encontrada`,
              text: "Desea cerrar la sesión",
              timer: 4000,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "NO",
              cancelButtonText: "SI",
              // onOpen: () => {
                
              //   setTimeout(() => {
              //     console.log("Sesión finalizada pague");
              //     this.socketV2Service.sendMessage({ route: "changeSession", changeSession: true, email: this.userStore.getUser().email });
              //   this.router.navigate(['/auth/logout']);
              //   localStorage.removeItem('socket');
              //   localStorage.clear();
              //   this.socketV2Service.sendMessage({ route: "logoutUser", email: this.userStore.getUser().email })
              //   Swal.close();
              //   }, 4000);
              // },
            }).then((result) => {

              if (result.value) {
                console.log('Si!');
                this.socketV2Service.sendMessage({ route: "changeSession", changeSession: false, email: this.userStore.getUser().email });
              } else {
                console.log('Se cierra por tiempo');


                this.socketV2Service.sendMessage({ route: "changeSession", changeSession: true, email: this.userStore.getUser().email });
                this.router.navigate(['/auth/logout']);
                localStorage.removeItem('socket');
                localStorage.clear();
                this.socketV2Service.sendMessage({ route: "logoutUser", email: this.userStore.getUser().email })

              }
            });

          }

        });

    this.socketV2Service.sendMessage({ route: "updateIDSocket", email: this.userStore.getUser().email });
  }

  @HostListener('window:beforeunload', ['$event'])

  
    onfocus(event) {
      console.log('event1', event);
      if (!this.reconnect) {
        this.reconnect = false;
        console.log('this.reconnect', this.reconnect);
      }
    } 

    beforeunloadHandler(event) {
      console.log('event2', event);
      this.socketV2Service.connect();
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.socketV2Service.connect();
    // this.socketService.close();
    //  this.tokenService.clear()
    //   this.router.navigate(['/auth/logout']);
    //   localStorage.clear();
    // this.myWebSocket.complete();
  }

}
