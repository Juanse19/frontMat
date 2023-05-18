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
export const WS_DEVICE = environment.urlDevicesSocket;

@Component({
  selector: 'ngx-bhs9',
  templateUrl: './bhs9.component.html',
  styleUrls: ['./bhs9.component.scss']
})
export class Bhs9Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  @ViewChildren("SS") public devicesDom: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    // this.bandaStatesCharge();
    this.wSocketZone9();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas'],{skipLocationChange: true});
    return false;
  } 

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona2')
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona2')
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
    
    this.intervalSubscriptionStatusAlarm = interval(6000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona2')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', this.states);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona2"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone9() {
    const subcription1 = this.myWebSocket
    .pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(10))),

    )
    .subscribe(
      (msg) => {
        
        this.devicesDom.forEach(elemento => {
          if (msg.Estado === 'Bloqueado') {
            if(msg.DeviceName === elemento.nativeElement.id){
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

    // ClicSS1_1() {
    //   this.dialog.opendevice1(166);
    //  }

    //  ClicSS1_2() {
    //   this.dialog.opendevice2(167);
    //  }

    //  ClicSS1_3() {
    //   this.dialog.opendevice3(171);
    //  }

    //  ClicSS1_4() {
    //   this.dialog.opendevice4(169);
    //  }

    //  ClicSS1_5() {
    //   this.dialog.opendevice5(168);
    //  }

    //  ClicSS1_6() {
    //   this.dialog.opendevice6(170);
    //  }

    //  ClicSS2_1() {
    //   this.dialog.opendevice7(159);
    //  }

    //  ClicSS2_2() {
    //   this.dialog.opendevice8(160);
    //  }

    //  ClicSS2_3() {
    //   this.dialog.opendevice9(158);
    //  }

    //  ClicSS2_4() {
    //   this.dialog.opendevice10(161);
    //  }

    //  ClicSS2_5() {
    //   this.dialog.opendevice11(165);
    //  }

    //  ClicSS2_6() {
    //   this.dialog.opendevice12(162);
    //  }

    //  ClicSS2_7() {
    //   this.dialog.opendevice13(163);
    //  }

    //  ClicSS2_8() {
    //   this.dialog.opendevice13(164);
    //  }

    ClicSS1_1() {
      this.dialog.opendevice1(166);
     }

     ClicSS1_2() {
      this.dialog.opendevice1(167);
     }

     // ATR 1
     ClicSS1_3() {
      this.dialog.opendevice2(171);
     }

     ClicSS1_4() {
      this.dialog.opendevice1(169);
     }

     ClicSS1_5() {
      this.dialog.opendevice1(168);
     }

     ClicSS1_6() {
      this.dialog.opendevice1(170);
     }

     ClicSS2_1() {
      this.dialog.opendevice1(159);
     }

     ClicSS2_2() {
      this.dialog.opendevice1(160);
     }

     // ATR 2
     ClicSS2_3() {
      this.dialog.opendevice2(158);
     }

     ClicSS2_4() {
      this.dialog.opendevice1(161);
     }

     ClicSS2_5() {
      this.dialog.opendevice1(165);
     }

     ClicSS2_6() {
      this.dialog.opendevice1(162);
     }

     ClicSS2_7() {
      this.dialog.opendevice1(163);
     }

     ClicSS2_8() {
      this.dialog.opendevice1(164);
     }

     // EDS 1
     ClicEDS_1() {
      this.dialog.opendevice4('EDS1');
     }

     ClicEDS_2() {
      this.dialog.opendevice4('EDS2');
     }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
