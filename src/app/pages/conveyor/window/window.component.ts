import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Injectable, TemplateRef } from '@angular/core';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { NbAccessChecker } from '@nebular/security'
import { takeWhile } from 'rxjs/operators';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { Banda1, zons, teams, states } from '../_interfaces/MatBag.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class WindowComponent implements OnInit {

  private alive = true;
  public title: string;
  public header: string;
  public message: string;
  public deviceState: string;
  public atrState: string;
  public deviceSpeed: string;
  public deviceConsumption: string;
  public devicecounter: string;
  public deviceRead: string;
  public deviceNoRead: string;
  public deviceEficiencia: string;
 
  // --------- DEVICES --------
  public divices1: teams[] = [];
  public header1: string;
  public divices2: teams[] = [];
  public header2: string;
  public divices3: teams[] = [];
  public header3: string;
  public divices4: teams[] = [];
  public header4: string;
  public divices5: teams[] = [];
  public header5: string;
  public divices6: teams[] = [];
  public header6: string;
  public divices7: teams[] = [];
  public header7: string;
  public divices8: teams[] = [];
  public header8: string;
  public divices9: teams[] = [];
  public header9: string;
  public divices10: teams[] = [];
  public header10: string;
  public divices11: teams[] = [];
  public header11: string;
  public divices12: teams[] = [];
  public header12: string;
  public divices13: teams[] = [];
  public header13: string;
  public divices14: teams[] = [];
  public header14: string;
  public divices15: teams[] = [];
  public header15: string;
  public divices16: teams[] = [];
  public header16: string;
  public divices17: teams[] = [];
  public header17: string;
  public divices18: teams[] = [];
  public header18: string;
  public divices19: teams[] = [];
  public header19: string;
  public divices20: teams[] = [];
  public header20: string;
  public divices21: teams[] = [];
  public header21: string;
  public divices22: teams[] = [];
  public header22: string;
  public divices23: teams[] = [];
  public header23: string;
  public divices24: teams[] = [];
  public header24: string;
  public divices25: teams[] = [];
  public header25: string;
  public divices26: teams[] = [];
  public header26: string;
  public divices27: teams[] = [];
  public header27: string;
  public divices28: teams[] = [];
  public header28: string;
  public divices29: teams[] = [];
  public header29: string;
  public divices30: teams[] = [];
  public header30: string;
  public divices31: teams[] = [];
  public header31: string;
  public divices32: teams[] = [];
  public header32: string;
  public divices33: teams[] = [];
  public header33: string;
  public divices34: teams[] = [];
  public header34: string;
  public divices35: teams[] = [];
  public header35: string;
  public divices36: teams[] = [];
  public header36: string;

  public showCloseIcon: Boolean = true;

  constructor(
    public accessChecker: NbAccessChecker,
    private http: HttpClient,
    private api: HttpService,
  ) { }

  @ViewChild('device1') device1: DialogComponent;
  @ViewChild('device2') device2: DialogComponent;
  @ViewChild('device3') device3: DialogComponent;
  @ViewChild('device4') device4: DialogComponent;
  @ViewChild('device5') device5: DialogComponent;
  @ViewChild('device6') device6: DialogComponent;
  @ViewChild('device7') device7: DialogComponent;
  @ViewChild('device8') device8: DialogComponent;
  @ViewChild('device9') device9: DialogComponent;
  @ViewChild('device10') device10: DialogComponent;
  @ViewChild('device11') device11: DialogComponent;
  @ViewChild('device12') device12: DialogComponent;
  @ViewChild('device13') device13: DialogComponent;
  @ViewChild('device14') device14: DialogComponent;
  @ViewChild('device15') device15: DialogComponent;
  @ViewChild('device16') device16: DialogComponent;
  @ViewChild('device17') device17: DialogComponent;
  @ViewChild('device18') device18: DialogComponent;
  @ViewChild('device19') device19: DialogComponent;
  @ViewChild('device20') device20: DialogComponent;
  @ViewChild('device21') device21: DialogComponent;
  @ViewChild('device22') device22: DialogComponent;
  @ViewChild('device23') device23: DialogComponent;
  @ViewChild('device24') device24: DialogComponent;
  @ViewChild('device25') device25: DialogComponent;
  @ViewChild('device26') device26: DialogComponent;
  @ViewChild('device27') device27: DialogComponent;
  @ViewChild('device28') device28: DialogComponent;
  @ViewChild('device29') device29: DialogComponent;
  @ViewChild('device30') device30: DialogComponent;
  @ViewChild('device31') device31: DialogComponent;
  @ViewChild('device32') device32: DialogComponent;
  @ViewChild('device33') device33: DialogComponent;
  @ViewChild('device34') device34: DialogComponent;
  @ViewChild('device35') device35: DialogComponent;
  @ViewChild('device36') device36: DialogComponent;

  // Create element reference for dialog target element.
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  public visible: Boolean = true;
  public hidden: Boolean = false;
  

  ngOnInit(): void {
    // this.initilaizeTarget();
  }

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  // Hide the Dialog when click the footer button.
  public hideDialog: EmitType<object> = () => {
    // this.ejDialog.hide();
    // this.ejDialog1.hide();
    // this.ejDialog2.hide();
  }
  // Enables the footer buttons
  public buttons: Object = [
    // {
    //     'click': this.hideDialog.bind(this),
    //     // Accessing button component properties by buttonModel property
    //       buttonModel: {
    //       content: 'OK',
    //       isPrimary: true
    //     }
    // },
    // {
    //     'click': this.hideDialog.bind(this),
    //     buttonModel: {
    //       content: 'Cancel'
    //     }
    // }
  ];

  public opendevice1(idDevice?: number) {
    // console.log('test...! 1');
    // debugger

    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        // debugger
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices1 = res;
          console.log('divices1: ', this.divices1);
          this.device1.show();
        } else {
          this.divices1 = res;
          this.device1.show();
          console.log('divices1: ', this.divices1);
          this.header1 = this.divices1[0]?.DeviceName;
          this.device1.position = { X: 305.328, Y: 180.125 };
          this.deviceState = `Estados:
                          1. Apagado.
                          2. Activo.
                          3. Falla.
                          4. Acumulacion.
                          5. Atasque.
                          6. Ahorro de energia.
                          7. Bloqueado.
                          8. Alarma Seccionardor Abierto.
                          9. Motor con paro de emergencia activo.`;

          this.deviceSpeed = `Velocidad parametrizada para este equipo.`;
          this.deviceConsumption = `Media del cálculo de potencia del equipo en el rango de una hora  `;
          this.devicecounter = `Contador de objetos en el equipo en un día`;
        }
      },
        err => console.log('Error', err));
  }

  public opendevice2(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {

        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices2 = res;
          this.device2.show();
        } else {
          this.divices2 = res;
          this.device2.show();
          this.header2 = this.divices2[0]?.DeviceName;
          this.device2.position = { X: 305.328, Y: 366.133 };
          this.atrState = `Estados:
                          1. Activo.
                          2. Inactivo.`;
          this.deviceRead = `BAGTAG's leidos`;
          this.deviceNoRead = `BAGTAG's no leidos`;
          this.deviceEficiencia = `lecturas sobre no lecturas`;
          // console.log('Zons:', res , 'states', this.states[0]?.Color);
        }

      },
        err => console.log('Error', err));
  }

  public opendevice3(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices3 = res;
          this.device3.show();
        } else {
          this.divices3 = res;
          this.device3.show();
          this.header3 = this.divices3[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice4(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices4 = res;
          this.device4.show();
        } else {
          this.divices4 = res;
          this.device4.show();
          this.header4 = this.divices4[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice5(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices5 = res;
          this.device5.show();
        } else {
          this.divices5 = res;
          this.device5.show();
          this.header5 = this.divices5[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice6(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices6 = res;
          this.device6.show();
        } else {
          this.divices6 = res;
          this.device6.show();
          this.header6 = this.divices6[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice7(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices7 = res;
          this.device7.show();
        } else {
          this.divices7 = res;
          this.device7.show();
          this.header7 = this.divices7[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice8(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices8 = res;
          this.device8.show();
        } else {
          this.divices8 = res;
          this.device8.show();
          this.header8 = this.divices8[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice9(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices9 = res;
          this.device9.show();
        } else {
          this.divices9 = res;
          this.device9.show();
          this.header9 = this.divices9[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice10(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices10 = res;
          this.device10.show();
        } else {
          this.divices10 = res;
          this.device10.show();
          this.header10 = this.divices10[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice11(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices11 = res;
          this.device11.show();
        } else {
          this.divices11 = res;
          this.device11.show();
          this.header11 = this.divices11[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice12(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices12 = res;
          this.device12.show();
        } else {
          this.divices12 = res;
          this.device12.show();
          this.header12 = this.divices12[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice13(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices13 = res;
          this.device13.show();
        } else {
          this.divices13 = res;
          this.device13.show();
          this.header13 = this.divices13[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice14(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices14 = res;
          this.device14.show();
        } else {
          this.divices14 = res;
          this.device14.show();
          this.header14 = this.divices14[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice15(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices15 = res;
          this.device15.show();
        } else {
          this.divices15 = res;
          this.device15.show();
          this.header15 = this.divices15[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice16(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices16 = res;
          this.device16.show();
        } else {
          this.divices16 = res;
          this.device16.show();
          this.header16 = this.divices16[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice17(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices17 = res;
          this.device17.show();
        } else {
          this.divices17 = res;
          this.device17.show();
          this.header17 = this.divices17[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice18(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices18 = res;
          this.device18.show();
        } else {
          this.divices18 = res;
          this.device18.show();
          this.header18 = this.divices18[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice19(idDevice?: number) {
    // console.log('test...! 19');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices19 = res;
          this.device19.show();
        } else {
          this.divices19 = res;
          this.device19.show();
          this.header19 = this.divices19[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice20(idDevice?: number) {
    // console.log('test...! 20');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices20 = res;
          this.device20.show();
        } else {
          this.divices20 = res;
          this.device20.show();
          this.header20 = this.divices20[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice21(idDevice?: number) {
    // console.log('test...! 21');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices21 = res;
          this.device21.show();
        } else {
          this.divices21 = res;
          this.device21.show();
          this.header21 = this.divices21[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice22(idDevice?: number) {
    // console.log('test...! 22');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices22 = res;
          this.device22.show();
        } else {
          this.divices22 = res;
          this.device22.show();
          this.header22 = this.divices22[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice23(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices23 = res;
          this.device23.show();
        } else {
          this.divices23 = res;
          this.device23.show();
          this.header23 = this.divices23[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice24(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices24 = res;
          this.device24.show();
        } else {
          this.divices24 = res;
          this.device24.show();
          this.header24 = this.divices24[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice25(idDevice?: number) {
    // console.log('test...! 2');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices25 = res;
          this.device25.show();
        } else {
          this.divices25 = res;
          this.device25.show();
          this.header25 = this.divices25[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice26(idDevice?: number) {
    // console.log('test...! 26');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices26 = res;
          this.device26.show();
        } else {
          this.divices26 = res;
          this.device26.show();
          this.header26 = this.divices26[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice27(idDevice?: number) {
    // console.log('test...! 27');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices27 = res;
          this.device27.show();
        } else {
          this.divices27 = res;
          this.device27.show();
          this.header27 = this.divices27[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice28(idDevice?: number) {
    // console.log('test...! 28');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices28 = res;
          this.device28.show();

        } else {
          this.divices28 = res;
          this.device28.show();
          this.header28 = this.divices28[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice29(idDevice?: number) {
    // console.log('test...! 29');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices29 = res;
          this.device29.show();
        } else {
          this.divices29 = res;
          this.device29.show();
          this.header29 = this.divices29[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice30(idDevice?: number) {
    // console.log('test...! 30');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices30 = res;
          this.device30.show();
        } else {
          this.divices30 = res;
          this.device30.show();
          this.header30 = this.divices30[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice31(idDevice?: number) {
    // console.log('test...! 31');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices31 = res;
          this.device31.show();
        } else {
          this.divices31 = res;
          this.device31.show();
          this.header31 = this.divices31[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice32(idDevice?: number) {
    // console.log('test...! 32');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices32 = res;
          this.device32.show();
        } else {
          this.divices32 = res;
          this.device32.show();
          this.header32 = this.divices32[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice33(idDevice?: number) {
    // console.log('test...! 32');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices33 = res;
          this.device33.show();
        } else {
          this.divices33 = res;
          this.device33.show();
          this.header33 = this.divices33[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice34(idDevice?: number) {
    // console.log('test...! 32');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices34 = res;
          this.device34.show();
        } else {
          this.divices34 = res;
          this.device34.show();
          this.header34 = this.divices34[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice35(idDevice?: number) {
    // console.log('test...! 32');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices35 = res;
          this.device35.show();
        } else {
          this.divices35 = res;
          this.device35.show();
          this.header35 = this.divices35[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opendevice36(idDevice?: number) {
    // console.log('test...! 32');
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apideviceconsume?DeviceId=' + idDevice)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (typeof res.DeviceId === 'string') {
          res = [{
            Estado: "Off",
            // DeviceId: 148,
            TiempoOn: "0",
            Consumo: "0",
            TiempoOff: 0
          }]
          this.divices36 = res;
          this.device36.show();
        } else {
          this.divices36 = res;
          this.device36.show();
          this.header36 = this.divices36[0]?.DeviceName;
          // this.ejDialogTX.position = { X: 171.33, Y: 100.14 };
        }

      });
  }

  opentest() {
    console.log('test de comunicación');

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
