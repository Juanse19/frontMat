import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { Banda3, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from '../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

@Component({
  selector: 'ngx-bhs3',
  templateUrl: './bhs3.component.html',
  styleUrls: ['./bhs3.component.scss']
})
export class Bhs3Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  @ViewChildren("MU") public devicesDom: QueryList<ElementRef>;
  

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage();
    // this.banda3NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.wSocketZone3();
    // this.bandaStatesCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  // public banda3NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/mu')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda3=res[0];
  //     console.log('data-banda4:', res);
      
  //   });
  // }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona6')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons3:', res , 'band with zones', this.zone[1].Name);
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona6')
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
    
    this.intervalSubscriptionStatusAlarm = interval(8000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona6')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona6"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone3() {
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
              this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(gray 5px 5px 5px) drop-shadow(gray -5px -5px ); animation: blinkingAlarm 2s infinite`);
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

  // ClicMU1_1() {
  //   this.dialog.opendevice1(82);
  //   }

  // ClicMU1_2() {
  //   this.dialog.opendevice2(86);
  //   }

  // ClicMU1_3() {
  //   this.dialog.opendevice3(85);
  //   }

  // ClicMU1_4() {
  //   this.dialog.opendevice4(87);
  //   }

  // ClicMU1_5() {
  //   this.dialog.opendevice5(83);
  //   }

  //   // MU2

  // ClicMU2_1() {
  //   this.dialog.opendevice6(91);
  //   }

  // ClicMU2_2() {
  //   this.dialog.opendevice7(89);
  //   }

  // ClicMU2_3() {
  //   this.dialog.opendevice8(88);
  //   }

  // ClicMU2_4() {
  //   this.dialog.opendevice9(90);
  //   }

  // ClicMU2_5() {
  //   this.dialog.opendevice10(92);
  //   }

  ClicMU1_1() {
    this.dialog.opendevice1(82);
    }

  ClicMU1_2() {
    this.dialog.opendevice1(86);
    }

  ClicMU1_3() {
    this.dialog.opendevice1(85);
    }

  ClicMU1_4() {
    this.dialog.opendevice1(87);
    }

  ClicMU1_5() {
    this.dialog.opendevice1(83);
    }

    // MU2

  ClicMU2_1() {
    this.dialog.opendevice1(91);
    }

  ClicMU2_2() {
    this.dialog.opendevice1(89);
    }

  ClicMU2_3() {
    this.dialog.opendevice1(88);
    }

  ClicMU2_4() {
    this.dialog.opendevice1(90);
    }

  ClicMU2_5() {
    this.dialog.opendevice1(92);
    }


  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
