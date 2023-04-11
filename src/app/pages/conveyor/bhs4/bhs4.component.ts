import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core'; 
import { NbPopoverDirective } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { delay, map, takeUntil, takeWhile, timeout,switchMap, take, retryWhen } from 'rxjs/operators';
import { Banda4, states, teams, zons } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

let te: teams;
{

}
@Component({
  selector: 'ngx-bhs4',
  templateUrl: './bhs4.component.html',
  styleUrls: ['./bhs4.component.scss']
})
export class Bhs4Component implements OnInit {

  public zone: zons[] = [];

  public divice: teams[] = [];

  public states: states [] = [];

  private alive=true;
  
  team: teams[] = [];
  
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  tea = te;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  @ViewChildren("AL") public devicesDom: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage();
    // this.banda4NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    // this.bandaStatesCharge();
    this.wSocketZone4();
    // this.ChangeTeam();
    // this.teamsCharge();
    // this.bandaCharge();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }


  // public banda4NameCharge(){

  //   this.http.get(this.api.apiUrlNode1 + '/al')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any)=>{
  //     this.dataBanda4=res[0];
  //     console.log('data-banda4:', res);
      
  //   });

  // }

  public bandaNameCharge(){

    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona5')
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

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona5')
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
      switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona5')),
    )
    .subscribe((res: any) => {
        this.states  = res;
        // console.log('status:', res);
    });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);
  
  sendMessage() {

    let dataSend = {
      "Zone": "zona5"
    }
    
    this.myWebSocket.next(dataSend);
  }


  wSocketZone4() {
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

  // ClicAL1_1() {
  //   // // debugger
  //   this.dialog.opendevice1(8);
  //  }

  //  ClicAL1_2() {
  //   // // debugger
  //   this.dialog.opendevice2(10);
  //  }

  //  ClicAL1_3() {
  //   // // debugger
  //   this.dialog.opendevice3(1);
  //  }

  //  ClicAL1_4() {
  //   // // debugger
  //   this.dialog.opendevice4(5);
  //  }

  //  ClicAL1_5() {
  //   // // debugger
  //   this.dialog.opendevice5(4);
  //  }

  //  ClicAL1_6() {
  //   // debugger
  //   this.dialog.opendevice6(2);
  //  }

  //  ClicAL1_7() {
  //   // debugger
  //   this.dialog.opendevice7(3);
  //  }

  //  ClicAL1_8() {
  //   // debugger
  //   this.dialog.opendevice8(6);
  //  }

  //  ClicAL1_9() {
  //   // debugger
  //   this.dialog.opendevice9(11);
  //  }

  //  ClicAL1_10() {
  //   // debugger
  //   this.dialog.opendevice10(9);
  //  }

  //  ClicAL1_11() {
  //   // debugger
  //   this.dialog.opendevice11(7);
  //  }

  //  ClicAL2_1() {
  //   // debugger
  //   this.dialog.opendevice12(13);
  //  }
   
  //  ClicAL2_2() {
  //   // debugger
  //   this.dialog.opendevice13(12);
  //  }

  //  ClicAL2_3() {
  //   // debugger
  //   this.dialog.opendevice14(14);
  //  }

  //  ClicAL2_4() {
  //   // debugger
  //   this.dialog.opendevice15(15);
  //  }

  ClicAL1_1() {
    // // debugger
    this.dialog.opendevice1(8);
   }

   ClicAL1_2() {
    // // debugger
    this.dialog.opendevice1(10);
   }

   ClicAL1_3() {
    // // debugger
    this.dialog.opendevice1(1);
   }

   ClicAL1_4() {
    // // debugger
    this.dialog.opendevice1(5);
   }

   ClicAL1_5() {
    // // debugger
    this.dialog.opendevice1(4);
   }

   ClicAL1_6() {
    // debugger
    this.dialog.opendevice1(2);
   }

   ClicAL1_7() {
    // debugger
    this.dialog.opendevice1(3);
   }

   ClicAL1_8() {
    // debugger
    this.dialog.opendevice1(6);
   }

   ClicAL1_9() {
    // debugger
    this.dialog.opendevice1(11);
   }

   ClicAL1_10() {
    // debugger
    this.dialog.opendevice1(9);
   }

   ClicAL1_11() {
    // debugger
    this.dialog.opendevice1(7);
   }

   ClicAL2_1() {
    // debugger
    this.dialog.opendevice1(13);
   }
   
   ClicAL2_2() {
    // debugger
    this.dialog.opendevice1(12);
   }

   ClicAL2_3() {
    // debugger
    this.dialog.opendevice1(14);
   }

   ClicAL2_4() {
    // debugger
    this.dialog.opendevice1(15);
   }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
