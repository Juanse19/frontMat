/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { switchMap, takeWhile } from 'rxjs/operators';
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
  ) {
    // this.initMenu();
   
    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.initMenu();
      });
      this.TetsIp();
      

  }

  initMenu() {
 
    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
      this.AutoLogoutCharge();
     // this.test();
     
  }

  TetsIp() {

    //console.log('Ip', ip.address);
    
    //console.log ( ip.address() );
  
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


// @HostListener('window:beforeunload', ['$event'])

//   beforeunloadHandler(event) {
//     this.tokenService.clear()
//     this.router.navigate(['/auth/logout']);
//     localStorage.clear();
// }



  // Prueba de websocket
  // myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8000');
  // myWebSocket: WebSocketSubject<any> = webSocket('ws://127.0.0.1:1880/ws/simple');
  // myWebSocket: WebSocketSubject<any> = webSocket( WS_ENDPOINT);

  // myWebSocket: WebSocketSubject<any> = webSocket('ws://10.120.18.15:1880/wc/alarms');

  enviar(){
    
    var respons = 
          {
            Email: this.userStore.getUser().email
          };

    //this.myWebSocket.next(respons);
  }

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
    // this.myWebSocket.complete();
  }

}
