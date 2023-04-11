import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { zons, teams, states } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

@Component({
  selector: 'ngx-ib2',
  templateUrl: './ib2.component.html',
  styleUrls: ['./ib2.component.scss']
})
export class Ib2Component implements OnInit {

  private alive=true;

  public divice: teams[] = [];

  public zone: zons[] = [];

  public states: states [] = [];

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  @ViewChildren("IB2") public devicesDom: QueryList<ElementRef>;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.wSocketZoneIb2();
    // this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/info'],{skipLocationChange: true});
    return false;
  }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona8')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('bandaIB1:', res , 'band with zones', this.zone[1].idEquipo);
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona8')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any)=>{
      this.states  = res;
      this.bandaStateCharge();
      console.log('static:', this.states);
    });
  }

  public bandaStateCharge(){

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
    this.intervalSubscriptionStatusAlarm = interval(8000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona8')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona8"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZoneIb2() {
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

  // ClicIB2_1() {
  //   this.dialog.opendevice1(64);
  //   }

  // ClicIB2_2() {
  //   this.dialog.opendevice2(65);
  //   }

  // ClicIB2_3() {
  //   this.dialog.opendevice3(66);
  //   }

  // ClicIB2_4() {
  //   this.dialog.opendevice4(67);
  //   }

  // ClicIB2_5() {
  //   this.dialog.opendevice5(68);
  //   }

  // ClicIB2_6() {
  //   this.dialog.opendevice6(69);
  //   }

  // ClicIB2_7() {
  //   this.dialog.opendevice7(70);
  //   }

  // ClicIB2_8() {
  //   this.dialog.opendevice8(71);
  //   }

  // ClicIB2_9() {
  //   this.dialog.opendevice9(72);
  //   }

  ClicIB2_1() {
    this.dialog.opendevice1(64);
    }

  ClicIB2_2() {
    this.dialog.opendevice1(65);
    }

  ClicIB2_3() {
    this.dialog.opendevice1(66);
    }

  ClicIB2_4() {
    this.dialog.opendevice1(67);
    }

  ClicIB2_5() {
    this.dialog.opendevice1(68);
    }

  ClicIB2_6() {
    this.dialog.opendevice1(69);
    }

  ClicIB2_7() {
    this.dialog.opendevice1(70);
    }

  ClicIB2_8() {
    this.dialog.opendevice1(71);
    }

  ClicIB2_9() {
    this.dialog.opendevice1(72);
    }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
