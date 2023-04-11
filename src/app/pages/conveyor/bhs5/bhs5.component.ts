import { Component, OnInit, ViewChild, Renderer2, ElementRef, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, map, retryWhen, switchMap, take, filter, takeWhile } from 'rxjs/operators';
import { Banda5, zons, states, teams } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { MessageService } from "../../../pages/dashboard/services/MessageService";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

interface BHS5 {
  deviceId: number,
  deviceName: string,
  color: string
}

@Component({
  selector: 'ngx-bhs5',
  templateUrl: './bhs5.component.html',
  styleUrls: ['./bhs5.component.scss']
})
export class Bhs5Component implements OnInit {
 
  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  public color: [];

  devicesSocket$: Observable<any[]>;

  public arrayData: 
  [{
    name: "SF1_1",
    color: "red"
    },
    {
      name: "SF1_2",
    color: "green"
    }
  ]

  intervalSubscriptionStatusAlarm: Subscription;
 
  @ViewChild(WindowComponent) dialog: WindowComponent;

  @ViewChild('asSF1_1') image: ElementRef;
  @ViewChild('asSF1_2') image2: ElementRef;
  @ViewChild('asSF3_1') image3: ElementRef;
  @ViewChild('asSF3_2') image4: ElementRef;


  @ViewChildren("SFC") public devicesDom: QueryList<ElementRef>;

  public dataBHS5: BHS5[];

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) {
      this.wSocketZone12();
     }

  ngOnInit(): void {
    
    this.sendMessage();
    this.bandaNameCharge();
    
    // this.bandaStatesCharge();
    // this.wSocketZone12();
    
  }

  

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona12')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons:', res );
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona12')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona12')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:',  this.states );
    }); 
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona12"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone12() {
    const subcription1 = this.myWebSocket
    .pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(10))),

    )
    .subscribe(
      (msg) => {
        
        // this.devicesDom.forEach(elemento => {
        //   if(msg.DeviceName === elemento.nativeElement.id){
        //     this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px)`);
        //   }
        // })

        this.devicesDom.forEach(elemento => {
          if (msg.Estado === 'Bloqueado') {
            // console.log('Dispositivo Bloqueado');
            if(msg.DeviceName === elemento.nativeElement.id){
              // filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px); animation: blinkingAlarm 2s infinite
              this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px); animation: blinkingAlarm 2s infinite`);
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

  // ClicSf1_1() { 
  //   this.dialog.opendevice1(148);
  // }

  // ClicSf1_2() {
  //   this.dialog.opendevice2(149);
  // }

  // ClicSf3_1() {
  //   this.dialog.opendevice3(150);
  // }

  // ClicSf3_2() {
  //   this.dialog.opendevice4(151);
  // }

  // ClicSf2_1() {
  //   this.dialog.opendevice5(152);
  // }

  // ClicSf2_2() {
  //   this.dialog.opendevice6(153);
  // }

  // ClicSf4_1() {
  //   this.dialog.opendevice7(154);
  // }

  // ClicSf4_2() {
  //   this.dialog.opendevice8(155);
  // }

  // ClicXO1_1() {
  //   this.dialog.opendevice9(156);
  // }

  // ClicXO2_1() {
  //   this.dialog.opendevice10(157);
  // }

  // ClicCS1_3M02() {
  //   this.dialog.opendevice10(327);
  // }

  // ClicCS1_4M02() {
  //   this.dialog.opendevice10(329);
  // }

  // ClicCS1_5M02() {
  //   this.dialog.opendevice10(331);
  // }

  // ClicCS1_6M02() {
  //   this.dialog.opendevice10(333);
  // }

  // ClicCS1_7M02() {
  //   this.dialog.opendevice10(335);
  // }

  // ClicCS3_3M02() {
  //   this.dialog.opendevice10(337);
  // }

  // ClicCS3_4M02() {
  //   this.dialog.opendevice10(339);
  // }

  // ClicCS3_5M02() {
  //   this.dialog.opendevice10(341);
  // }

  // ClicCS3_6M02() {
  //   this.dialog.opendevice10(343);
  // }

  // ClicCS3_7M02() {
  //   this.dialog.opendevice10(345);
  // }

  // ClicCS2_3M02() {
  //   this.dialog.opendevice10(372);
  // }

  // ClicCS2_4M02() {
  //   this.dialog.opendevice10(374);
  // }

  // ClicCS2_5M02() {
  //   this.dialog.opendevice10(376);
  // }

  // ClicCS2_6M02() {
  //   this.dialog.opendevice10(378);
  // }

  // ClicCS2_7M02() {
  //   this.dialog.opendevice10(380);
  // }

  // ClicCS4_3M02() {
  //   this.dialog.opendevice10(382);
  // }

  // ClicCS4_4M02() {
  //   this.dialog.opendevice10(384);
  // }

  // ClicCS4_5M02() {
  //   this.dialog.opendevice10(386);
  // }

  // ClicCS4_6M02() {
  //   this.dialog.opendevice10(388);
  // }

  // ClicCS4_7M02() {
  //   this.dialog.opendevice10(390);
  // }

  ClicSf1_1() { 
    this.dialog.opendevice1(148);
  }

  ClicSf1_2() {
    this.dialog.opendevice1(149);
  }

  ClicSf3_1() {
    this.dialog.opendevice1(150);
  }

  ClicSf3_2() {
    this.dialog.opendevice1(151);
  }

  ClicSf2_1() {
    this.dialog.opendevice1(152);
  }

  ClicSf2_2() {
    this.dialog.opendevice1(153);
  }

  ClicSf4_1() {
    this.dialog.opendevice1(154);
  }

  ClicSf4_2() {
    this.dialog.opendevice1(155);
  }

  ClicXO1_1() {
    this.dialog.opendevice1(156);
  }

  ClicXO2_1() {
    this.dialog.opendevice1(157);
  }

  ClicCS1_3M01() {
    this.dialog.opendevice1(326);
  }

  ClicCS1_3M02() {
    this.dialog.opendevice1(327);
  }

  ClicCS1_4M01() {
    this.dialog.opendevice1(328);
  }

  ClicCS1_4M02() {
    this.dialog.opendevice1(329);
  }

  ClicCS1_5M01() {
    this.dialog.opendevice1(330);
  }

  ClicCS1_5M02() {
    this.dialog.opendevice1(331);
  }

  ClicCS1_6M01() {
    this.dialog.opendevice1(332);
  }

  ClicCS1_6M02() {
    this.dialog.opendevice1(333);
  }

  ClicCS1_7M01() {
    this.dialog.opendevice1(334);
  }

  ClicCS1_7M02() {
    this.dialog.opendevice1(335);
  }

  ClicCS3_3M01() {
    this.dialog.opendevice1(336);
  }

  ClicCS3_3M02() {
    this.dialog.opendevice1(337);
  }

  ClicCS3_4M01() {
    this.dialog.opendevice1(338);
  }

  ClicCS3_4M02() {
    this.dialog.opendevice1(339);
  }

  ClicCS3_5M01() {
    this.dialog.opendevice1(340);
  }

  ClicCS3_5M02() {
    this.dialog.opendevice1(341);
  }

  ClicCS3_6M01() {
    this.dialog.opendevice1(342);
  }

  ClicCS3_6M02() {
    this.dialog.opendevice1(343);
  }

  ClicCS3_7M01() {
    this.dialog.opendevice1(344);
  }

  ClicCS3_7M02() {
    this.dialog.opendevice1(345);
  }

  ClicCS2_3M01() {
    this.dialog.opendevice1(371);
  }

  ClicCS2_3M02() {
    this.dialog.opendevice1(372);
  }

  ClicCS2_4M01() {
    this.dialog.opendevice1(373);
  }

  ClicCS2_4M02() {
    this.dialog.opendevice1(374);
  }

  ClicCS2_5M01() {
    this.dialog.opendevice1(375);
  }

  ClicCS2_5M02() {
    this.dialog.opendevice1(376);
  }

  ClicCS2_6M01() {
    this.dialog.opendevice1(377);
  }

  ClicCS2_6M02() {
    this.dialog.opendevice1(378);
  }

  ClicCS2_7M01() {
    this.dialog.opendevice1(379);
  }

  ClicCS2_7M02() {
    this.dialog.opendevice1(380);
  }

  ClicCS4_3M01() {
    this.dialog.opendevice1(381);
  }

  ClicCS4_3M02() {
    this.dialog.opendevice1(382);
  }

  ClicCS4_4M01() {
    this.dialog.opendevice1(383);
  }

  ClicCS4_4M02() {
    this.dialog.opendevice1(384);
  }

  ClicCS4_5M01() {
    this.dialog.opendevice1(385);
  }

  ClicCS4_5M02() {
    this.dialog.opendevice1(386);
  }

  ClicCS4_6M01() {
    this.dialog.opendevice1(387);
  }

  ClicCS4_6M02() {
    this.dialog.opendevice1(388);
  }

  ClicCS4_7M01() {
    this.dialog.opendevice1(389);
  }

  ClicCS4_7M02() {
    this.dialog.opendevice1(390);
  }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
