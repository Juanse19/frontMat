import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { delay, retryWhen, switchMap, take, takeWhile } from 'rxjs/operators';
import { Banda1, zons, teams, states } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { WindowComponent } from './../window/window.component';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
export const WS_DEVICE = environment.urlDevicesSocket;

@Component({
  providers: [
    WindowComponent
  ],
  selector: 'ngx-bhs1',
  templateUrl: './bhs1.component.html',
  styleUrls: ['./bhs1.component.scss']
})
export class Bhs1Component implements OnInit {

  @ViewChild('autoInput') input;

  private alive = true;

  public divice: teams[] = [];

  public zone: zons[] = [];

  public states: states[] = [];

  team: teams[] = [];

  public showCloseIcon: Boolean = true;

  intervalSubscriptionStatusAlarm: Subscription;

  @ViewChild(WindowComponent) dialog: WindowComponent;

  // @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>; 

  @ViewChild('ejDialog2') ejDialog2: DialogComponent;
  //----------------- Dialogs -------------------
  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;
  @ViewChild('ejDialogSF') ejDialogSF: DialogComponent;
  @ViewChild('ejDialogSS') ejDialogSS: DialogComponent;
  @ViewChild('ejDialogMU') ejDialogMU: DialogComponent;
  @ViewChild('ejDialogAL') ejDialogAL: DialogComponent;
  @ViewChild('ejDialogSFC') ejDialogSFC: DialogComponent;
  @ViewChild('ejDialogOSR') ejDialogOSR: DialogComponent;
  @ViewChild('ejDialogCL') ejDialogCL: DialogComponent;
  @ViewChild('ejDialogME') ejDialogME: DialogComponent;
  @ViewChild('ejDialogXO') ejDialogXO: DialogComponent;
  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  // This will resize the dialog in all the directions.
  public resizeHandleDirection: ResizeDirections[] = ['All'];
  public visible: Boolean = true;
  public hidden: Boolean = false;
  public position: object = { X: 'left', Y: 'top' };

  @ViewChildren("TX") public devicesDom: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private compo1: WindowComponent,
    private toastrService: NbToastrService,
    private render2: Renderer2) { }

  ngOnInit(): void {
    this.sendMessage();
    // this.banda1NameCharge();
    this.bandaNameCharge();
    // this.bandaStateCharge();
    this.wSocketZone1();
    // this.bandaStatesCharge();
    // this.initilaizeTarget();
  }

  back() {
    this.router.navigate(['/pages/conveyor/BhsSalidas']);
    return false;
  }

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
    this.resizeHandleDirection = ['All'];
  }

  public hideDialog: EmitType<object> = () => {
    this.ejDialogTX.hide();
  }

  public bandaNameCharge() {
    this.http.get(this.api.apiUrlNode1 + '/apizonename?zone=zona13')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: zons[] = []) => {
        this.zone = res;
        // console.log('banda1:', res , 'band with zones', this.zone[1].idEquipo);
      });
  }

  public changeId(tea: any) {

    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + tea)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.divice = res;
        // console.log('Zons:', res , 'states', this.states[0]?.Color);

      });
  }

  public bandaStatesCharge() {

    this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona13')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.states = res;
        this.bandaStateCharge();
        // console.log('static:', this.states);
      });
  }

  public bandaStateCharge() {

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }

    this.intervalSubscriptionStatusAlarm = interval(10000)
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => this.http.get(this.api.apiUrlNode1 + '/apizonestate?zone=zona13')),
      )
      .subscribe((res: any) => {
        this.states = res;
        // console.log('status:', this.states);
      });

  }

  openTx1(idDevices?: number) {
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevices)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.divice = res;
        // console.log('Zons:', res , 'states', this.states[0]?.Color);
        this.ejDialogTX.show();
        this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
      });
  }

  myWebSocket: WebSocketSubject<any> = webSocket(WS_DEVICE);

  sendMessage() {

    let dataSend = {
      "Zone": "zona13"
    }

    console.log(dataSend);
    
    this.myWebSocket.next(dataSend);
  }

  wSocketZone1() {
    const subcription1 = this.myWebSocket
      .pipe(
        retryWhen(errors => errors.pipe(delay(1000), take(10))),

      )
      .subscribe(
        (msg) => {

          this.devicesDom.forEach(elemento => {
            if (msg.Estado === 'Bloqueado') {
              // console.log('Dispositivo Bloqueado');
              if (msg.DeviceName === elemento.nativeElement.id) {
                // filter: drop-shadow(${msg.Color} 5px 5px 5px) drop-shadow(${msg.Color} -5px -5px 5px);
                this.render2.setAttribute(elemento.nativeElement, "style", `filter: box-shadow(${msg.Color} 5px 5px 3px) box-shadow(${msg.Color}  -5px -5px 3px); animation: blinkingAlarm 2s infinite`);
                // this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} inset 5px 5px 5px) drop-shadow(${msg.Color} inset -5px -5px 5px); animation: blinkingAlarm 2s infinite`);

              }
            } else if (msg.Estado === 'Motor con paro de emergencia activo') {
              if (msg.DeviceName === elemento.nativeElement.id) {
                this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 3px) drop-shadow(${msg.Color} -5px -5px 3px); animation: blinkingAlarmEmergencia 2s infinite`);
              }
            } else {
              if (msg.DeviceName === elemento.nativeElement.id) {
                this.render2.setAttribute(elemento.nativeElement, "style", `filter: drop-shadow(${msg.Color} 5px 5px 3px) drop-shadow(${msg.Color} -5px -5px 3px)`);
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

  // ClicTX1() {
  //   this.dialog.opendevice1(173);
  // }

  // ClicTX2() {
  //   this.dialog.opendevice2(172);
  // }

  // ClicTX3() {
  //   this.dialog.opendevice3(175);
  // }

  // ClicTX4() {
  //   this.dialog.opendevice4(181);
  // }

  // ClicTX5() {
  //   this.dialog.opendevice5(178);
  // }

  // ClicTX6() {
  //   this.dialog.opendevice6(180);
  // }

  // ClicTX7() {
  //   this.dialog.opendevice7(179);
  // }

  // ClicTX8() {
  //   this.dialog.opendevice8(176);
  // }

  // ClicTX9() {
  //   this.dialog.opendevice9(177);
  // }

  // ClicTX10() {
  //   this.dialog.opendevice10(174);
  // }

  // ClicTX11() {
  //   this.dialog.opendevice11(182);
  // }

  // ClicTX12() {
  //   this.dialog.opendevice12(183);
  // }

  // ClicTX13() {
  //   this.dialog.opendevice13(184);
  // }

  // ClicTX14() {
  //   this.dialog.opendevice14(185);
  // }

  ClicTX1() {
    this.dialog.opendevice1(173);
  }

  ClicTX2() {
    this.dialog.opendevice1(172);
  }

  ClicTX3() {
    this.dialog.opendevice1(175);
  }

  ClicTX4() {
    this.dialog.opendevice1(181);
  }

  ClicTX5() {
    this.dialog.opendevice1(178);
  }

  ClicTX6() {
    this.dialog.opendevice1(180);
  }

  ClicTX7() {
    this.dialog.opendevice1(179);
  }

  ClicTX8() {
    this.dialog.opendevice1(176);
  }

  ClicTX9() {
    this.dialog.opendevice1(177);
  }

  ClicTX10() {
    this.dialog.opendevice1(174);
  }

  ClicTX11() {
    this.dialog.opendevice1(182);
  }

  ClicTX12() {
    this.dialog.opendevice1(183);
  }

  ClicTX13() {
    this.dialog.opendevice1(184);
  }

  ClicTX14() {
    this.dialog.opendevice1(185);
  }

  //Doors

  ClicTX1_2() {
    this.dialog.opendevice3(172);
  }

  ngOnDestroy() {
    this.alive = false;
    this.myWebSocket.complete();
  }

}
