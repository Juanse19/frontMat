import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { Banda2, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

@Component({
  selector: 'ngx-bhs10',
  templateUrl: './bhs10.component.html',
  styleUrls: ['./bhs10.component.scss']
})
export class Bhs10Component implements OnInit {

  public zone: zons[] = [];

  public zons: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive=true;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild(WindowComponent) dialog: WindowComponent;

  @ViewChildren("XO") public devicesDom: QueryList<ElementRef>;

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { 
    }

  ngOnInit(): void {
    this.sendMessage(); 
    this.bandaNameXOCharge();
    // this.bandaNameCharge();
    // this.bandaStatesCharge();
    this.wSocketZone10();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas'],{skipLocationChange: true});
    return false;
  }

  public bandaNameXOCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona10')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zons=res;
      // console.log('Zons10:', res );
      
    });
  }

  public bandaNameCharge(){
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona1')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:zons[]=[])=>{
      this.zone=res;
      // console.log('Zons2:', res , 'band with zones', this.zone[1].Name);
      
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona10')
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
    
    this.intervalSubscriptionStatusAlarm = interval(40000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona10')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona10"
    }
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone10() {
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

  ClicXO1() {
    this.dialog.opendevice1(125);
    }

  ClicXO2() {
    this.dialog.opendevice1(126);
    }

   ClicXO3() {
     this.dialog.opendevice1(53);
    }

    ClicXO4() {
      this.dialog.opendevice1(54);
     }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
