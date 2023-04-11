import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { Banda8, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { UserStore } from '../../../@core/stores/user.store';
export const WS_DEVICE = environment.urlDevicesSocket;
 
@Component({
  selector: 'ngx-bhs8',
  templateUrl: './bhs8.component.html',
  styleUrls: ['./bhs8.component.scss']
})
export class Bhs8Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent) dialog: WindowComponent;

  @ViewChildren("ME") public devicesDom: QueryList<ElementRef>;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2,
    private userStore: UserStore,) { }

  ngOnInit(): void {

    this.sendMessage();
    // this.banda8NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    // this.bandaStatesCharge();
    this.wSocketZone8();
    // this.emitir();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  } 

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona11')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('ss:', res , 'band with zones', this.zone[1].Name);
    });
  }

  public changeId(tea: any){
 
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId='+ tea)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.divice=res;
      // console.log('Zons:', res , 'states');
      
    });
  }

  public bandaStatesCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona11')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any)=>{
      this.states  = res;
      this.bandaStateCharge();
      // console.log('static:', this.states);
    });
  }

  public bandaStateCharge(){

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
    this.intervalSubscriptionStatusAlarm = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona11')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona11"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone8() {
    const subcription1 = this.myWebSocket
    .pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(10))),

    )
    .subscribe(
      (msg) => {
        
        this.devicesDom.forEach(elemento => {
          if (msg.Estado === 'Bloqueado') {
            // console.log('Dispositivo Bloqueado');
            if(msg.DeviceName === elemento.nativeElement.id){
              // filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px);
              this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(white -5px -5px 5px); animation: blinkingAlarm 2s infinite`);
            }
          } else if (msg.Estado === 'Motor con paro de emergencia activo') {
            if(msg.DeviceName === elemento.nativeElement.id){
              this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px); animation: blinkingAlarmEmergencia 2s infinite`);
            }
          } else {
            if(msg.DeviceName === elemento.nativeElement.id){
              this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px)`);
            }
          }
        })

      },
      (err) => {
        this.toastrService.danger(err.type, "Error de conexión del WebSocket", {
          duration: 30000,
        });
      },
      () => {
        console.log("complete");
      }
    );
  }

  emitir() {
    
    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
    this.intervalSubscriptionStatusAlarm = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      
    )
    .subscribe((res: any) => {
       console.log(res);
       
      var respons = 
      {
        // IdUser: this.userStore.getUser().id,
        Key: 'pbthxoybp',
        IdUser: this.userStore.getUser().id,
        Email: this.userStore.getUser().email,
        Zone: 'zona11'
      };

      this.myWebSocket.next(respons);
    });
    

  }

  randomKanji(){
   
    console.log('ID2', Math.random().toString(36).substr(2, 9));

  }

  // ClicME1() {
  //   this.dialog.opendevice1(94);
  //   }

  // ClicME2() {
  //   this.dialog.opendevice2(95);
  //   this.randomKanji()
  //   }

  //  ClicME3() {
  //    this.dialog.opendevice3(96);
  //   }

  //   ClicME4() {
  //     this.dialog.opendevice4(97);
  //    }

  ClicME1() {
    this.dialog.opendevice1(94);
    }

  ClicME2() {
    this.dialog.opendevice1(95);
    // this.randomKanji()
    }

   ClicME3() {
     this.dialog.opendevice1(96);
    }

    ClicME4() {
      this.dialog.opendevice1(97);
     }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
