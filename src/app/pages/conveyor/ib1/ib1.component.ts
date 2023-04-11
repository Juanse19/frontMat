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
  selector: 'ngx-ib1',
  templateUrl: './ib1.component.html',
  styleUrls: ['./ib1.component.scss']
})
export class Ib1Component implements OnInit {

  private alive=true;

  public divice: teams[] = [];

  public zone: zons[] = [];

  public states: states [] = [];

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  @ViewChildren("IB1") public devicesDom: QueryList<ElementRef>;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage()
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.wSocketZoneIb1();
    // this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/info'],{skipLocationChange: true});
    return false;
  }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona7')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('bandaIB1:', res);
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona7')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona7')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona7"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZoneIb1() {
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

  // ClicIB1_1() {
  //   this.dialog.opendevice1(55);
  //   }

  // ClicIB1_2() {
  //   this.dialog.opendevice2(56);
  //   }

  // ClicIB1_3() {
  //   this.dialog.opendevice3(57);
  //   }

  // ClicIB1_4() {
  //   this.dialog.opendevice4(58);
  //   }

  // ClicIB1_5() {
  //   this.dialog.opendevice5(59);
  //   }

  // ClicIB1_6() {
  //   this.dialog.opendevice6(60);
  //   }

  // ClicIB1_7() {
  //   this.dialog.opendevice7(61);
  //   }

  // ClicIB1_8() {
  //   this.dialog.opendevice8(62);
  //   }

  // ClicIB1_9() {
  //   // this.dialog.opendevice9(194);
  //   }

  // ClicIB1_10() {
  //   // this.dialog.opendevice9(194);
  //   this.dialog.opendevice9(404);
  //   }

  // ClicIB1_11() {
  //   this.dialog.opendevice9(402);
  //   }

  ClicIB1_1() {
    this.dialog.opendevice1(55);
    }

  ClicIB1_2() {
    this.dialog.opendevice1(56);
    }

  ClicIB1_3() {
    this.dialog.opendevice1(57);
    }

  ClicIB1_4() {
    this.dialog.opendevice1(58);
    }

  ClicIB1_5() {
    this.dialog.opendevice1(59);
    }

  ClicIB1_6() {
    this.dialog.opendevice1(60);
    }

  ClicIB1_7() {
    this.dialog.opendevice1(61);
    }

  ClicIB1_8() {
    this.dialog.opendevice1(62);
    }

  ClicIB1_9() {
    // this.dialog.opendevice9(194);
    }

  ClicIB1_10() {
    // this.dialog.opendevice9(194);
    this.dialog.opendevice1(404);
    }

  ClicIB1_11M01() {
    this.dialog.opendevice1(402);
    }

    ClicIB1_11M02() {
      this.dialog.opendevice1(403);
      }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
