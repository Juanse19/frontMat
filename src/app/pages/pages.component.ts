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
    private socketService: WebSocketService,
  ) {
    // this.initMenu();

    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.initMenu();
        this.reload()
        // console.log(res.accessTokenPayload.user.access);
        // console.log(res.accessTokenPayload.user.email);
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
      // this.socketService.connect();
      console.log('TestV1');
    } else {
      this.socketService.restoreSocket();
      console.log('TestV2');
      this.newConnection();
      // this.socketService.sendMessage({ route: "updateIDSocket", email: this.userStore.getUser().email });
    }


    // Guardar la conexión antes de recargar la página
    window.addEventListener('beforeunload', () => {
      this.socketService.saveSocket();
    });

  }

  newConnection() {
    this.socketService.connect();
    this.socketService.getSocket().pipe(
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
              // timer: 10000,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "NO",
              cancelButtonText: "SI",
            }).then((result) => {

              if (result.value) {
                console.log('Si!');
                this.socketService.sendMessage({ route: "changeSession", changeSession: false, email: this.userStore.getUser().email });
              } else {
                console.log('Se cierra por tiempo');


                this.socketService.sendMessage({ route: "changeSession", changeSession: true, email: this.userStore.getUser().email });
                this.router.navigate(['/auth/logout']);
                localStorage.removeItem('socket');
                localStorage.clear();
                // this.socketService.sendMessage({ email: this.loginForm.value.email });
                this.socketService.sendMessage({ route: "logoutUser", email: this.userStore.getUser().email })

              }
            });

          }

        });

    this.socketService.sendMessage({ route: "updateIDSocket", email: this.userStore.getUser().email });
  }

  // public AutoLogoutCharge() {
  //   try {
  //   if (this.intervalSubscriptionStatusSesion) {
  //     this.intervalSubscriptionStatusSesion.unsubscribe();
  //   }
  //   // debugger
  //   this.intervalSubscriptionStatusSesion = interval(1000)
  //   .pipe(
  //     takeWhile(() => this.alive),
  //     switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/getlEmailuser?Email=' + this.userStore.getUser().email)),
  //   )
  //   .subscribe((res: any) => {
  //       // this.states  = res;
  //       // console.log('status:', res);

  //       if (res == undefined) {
  //         console.log('no hay data');
  //         this.AutoLogoutCharge();
  //       } else {
  //         // console.log('Si hay');


  //       this.validData = res;
  //       // debugger
  //       // console.log('Email ValidData: ', this.validData[0].Id)
  //       if ( this.validData[0].Lat === 0 && this.validData[0].Licens_id === '1') {
  //         // debugger
  //         this.intervalSubscriptionStatusSesion.unsubscribe();
  //         Swal.fire({
  //           title: 'Se cerrará la sesión?',
  //           text: `¡Desea continuar con la sesión activa!`,
  //           icon: 'warning',
  //           timer: 3500,
  //           showCancelButton: false,
  //           confirmButtonColor: '#3085d6',
  //           // cancelButtonColor: '#d33',
  //           cancelButtonText: 'Cerrar!',
  //           confirmButtonText: '¡Desea continuar!',
  //         }).then(result => {
  //           if (result.value) {

  //             let respon = {
  //               user: this.validData[0].Id,
  //               sesion: 1,
  //             };
  //             this.apiGetComp
  //               .PostJson(this.api.apiUrlNode1 + '/updateSesion', respon)
  //               .pipe(takeWhile(() => this.alive))
  //               .subscribe((res: any) => {
  //                 //  console.log("Envió: ", res);
  //               });
  //             // this.intervalSubscriptionStatusSesion.unsubscribe();

  //             // console.log("Continua navegando: ", res);
  //             this.AutoLogoutCharge();
  //       // Swal.fire('¡Se sincronizo Exitosamente', 'success');
  //           } else {
  //             // console.log('Se cierra por tiempo');

  //             this.router.navigate(['/auth/logout']);
  //           }
  //         });

  //         // this.router.navigate(['/auth/logout']);
  //         // console.log('Se cerro la sesion');

  //       } else {

  //         //  console.log('Continue con la sesion');

  //       }
  //   }
  // },
  //   );
  // } catch (error) {
  //       console.log('No fount data.');

  // }
  // }


  @HostListener('window:beforeunload', ['$event'])

    onfocus(event) {
      console.log('event1', event);
      
      if (this.reconnect) {
        this.reconnect = false;
        console.log('this.reconnect', this.reconnect);
        
        // alert("Perform an auto-login here!");
      }
    } 

    beforeunloadHandler(event) {
      // this.tokenService.clear()
      // this.router.navigate(['/auth/logout']);
      // localStorage.clear();
      console.log('event2', event);
      var msg = "Are you sure you want to leave?";
      this.reconnect = true;
      console.log('reconnect', this.reconnect);
      
      return msg;
  }
  

  



  // Prueba de websocket
  // myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8000');
  // myWebSocket: WebSocketSubject<any> = webSocket('ws://127.0.0.1:1880/ws/simple');
  // myWebSocket: WebSocketSubject<any> = webSocket( WS_ENDPOINT);

  // myWebSocket: WebSocketSubject<any> = webSocket('ws://10.120.18.15:1880/wc/alarms');



  // test(){

  //   const subcription1  = this.myWebSocket.subscribe(msg => {
  //     //console.log('Mensaje recibido', msg.message);
  //     //this.validData[0] = msg[0];

  //     this.index += 1;

  //     console.log('Acumulador',this.index);


  //     if (msg.payload === 0 || msg.payload === 1 || msg.payload === 2 || msg.payload === 6 || msg.payload === 21) {
  //       let duration = 6000
  //       this.toastrService.success(msg.topic,  msg.message, {duration});
  //     } 
  //     else if(msg.payload === 3 || msg.payload === 9) {
  //       let duration = 6000
  //       this.toastrService.danger(msg.topic, msg.message, {duration});
  //     }
  //     else if(msg.payload === 4 || msg.payload === 4 || msg.payload === 7 || msg.payload === 8 || msg.payload === 20 ) {
  //       let duration = 6000
  //       this.toastrService.warning(msg.topic, msg.message, {duration});
  //     }

  //   })

  //   console.log('message subscribe:', subcription1.add);


  //   this.myWebSocket.subscribe(    
  //     //msg => console.log('message received: ', msg), 
  //     // Called whenever there is a message from the server    
  //     err => console.log(err), 
  //     // Called if WebSocket API signals some kind of error    
  //     () => console.log('complete') 
  //     // Called when connection is closed (for whatever reason)  
  //  );

  // }


  ngOnDestroy(): void {
    this.alive = false;
    this.socketService.close();
    //  this.tokenService.clear()
    //   this.router.navigate(['/auth/logout']);
    //   localStorage.clear();
    // this.myWebSocket.complete();
  }

}
