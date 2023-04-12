import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Injectable, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NbPopoverDirective, NbToastrService, NbWindowService } from '@nebular/theme';
import { delay, map, takeUntil, takeWhile, timeout, switchMap } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject, interval, Subscription } from 'rxjs';
import { Zones, syste, teams, Consumezone, departures, Zonass } from '../../conveyor/_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { CustomToastsComponent } from './custom-toast.component';
import { WindowComponent } from '../window/window.component';

@Component({
  selector: 'ngx-bhs-salidas',
  templateUrl: './bhs-salidas.component.html',
  styleUrls: ['./bhs-salidas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BhsSalidasComponent implements OnInit {

  // ------------------------------------
  public zone: Zones[] = [];

  public deparData: departures[];

  private alive = true;

  message: string;

  mostarTX: boolean;
  mostarSF: boolean;
  mostarSFC: boolean;
  mostarSS: boolean;
  mostarMU: boolean;
  mostarAL: boolean;
  mostarOSR: boolean;
  mostarCL: boolean;
  mostarME: boolean;
  mostarXO: boolean;

  public header: string;

  /** ---------------------------------------- */
  public tXData: Consumezone[]

  public sFData: any[] = [];

  public sSData: Consumezone[] = [];

  public mUData: Consumezone[] = [];

  public aLData: Consumezone[] = [];

  public sFCData: Consumezone[] = [];

  public oSRData: Consumezone[] = [];

  public cLData: Consumezone[] = [];

  public mEData: Consumezone[] = [];

  public xOData: Consumezone[] = [];
  /** ---------------------------------------- */
  team: teams[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public showCloseIcon: Boolean = true;

  intervalSubscriptionStatusAlarm: Subscription;

  public deviceState: string;
  public deviceSpeed: string;
  public deviceConsumption: string;
  public devicecounter: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private toastrService: NbToastrService
  ) { }

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

  @ViewChild(WindowComponent, { static: true }) public dialog: WindowComponent;

  public targetElement: HTMLElement;

  public visible: Boolean = true;
  public hidden: Boolean = false;
  public position: object = { X: 'left', Y: 'top' };
  public initialPage: Object;

  ngOnInit(): void {

    this.message = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).';

    this.GetSystem();
    this.initilaizeTarget();
    this.pageSettings = { pageSize: 5 };
    this.filterOptions = {
      type: 'Menu',
    };
    this.initialPage = { pageSizes: true, pageSize: 5 };
  }

  close() {
    setTimeout(() => {
      this.ejDialogTX.hide();
    }, 20000);
  }

  // Initialize the Dialog component's target element.
  public initilaizeTarget: EmitType<object> = () => {
  }

  public hideDialog: EmitType<object> = () => {
    this.ejDialogTX.hide();
  }
  // Enables the footer buttons
  public buttons: Object = [
    {
      'click': this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'OK',
        isPrimary: true
      }
    }
  ];

  private GetSystem() {
    this.http.get(this.api.apiUrlNode1 + '/apifront')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: Zones[]) => {
        this.zone = res;
        // console.log('zonas: ', this.zone);
      });
  }

  public changeId(tea: any) {
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + tea)
      .pipe()
      .subscribe((res: any) => {
        this.tXData = res;
        // console.log('Zons:', res , 'states');
      });
  }

  public changeIdMakeUp(mak: any) {

    this.http.get(this.api.apiUrlNode1 + '/api/departuresInfo?Id=' + mak)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.deparData = res;
      });
  }


  changestest(idDevice?: number) {
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevice)
      .pipe()
      .subscribe((res: any) => {
        if (res.length === 0) {

          res = [{
            // ZoneId: 0,
            ZoneName: "TX",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.tXData = res;
          this.ejDialogTX.show();
          this.ejDialogTX.position = { X: 90.3125, Y: 330.125 };
        } else {
          this.tXData = res;
          this.ejDialogTX.show();
          this.ejDialogTX.position = { X: 90.3125, Y: 330.125 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest(idDevice?: number) {
    this.changestest(idDevice)
  }

  opentest1(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any) => {
        this.sFData = res;
        this.header = this.sFData[0]?.ZoneName;
        this.ejDialogSF.show();
        this.ejDialogSF.position = { X: 955.317, Y: 121.133 };
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
          this.devicecounter = `Número de objetos que han sido identificado en el trasnportador`;

      });
  }

  changestest2(idDevic?: number) {
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevic)
      .pipe()
      .subscribe((res: any) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "SS",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.sSData = res;
          this.ejDialogSS.show();
          this.ejDialogSS.position = { X: 716.312, Y: 137.125 };
        } else {
          this.sSData = res;
          this.ejDialogSS.show();
          this.ejDialogSS.position = { X: 716.312, Y: 137.125 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest2(idDevic?: number) {
    this.changestest2(idDevic)
  }

  opentest3(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "MU",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.mUData = res;
          this.ejDialogMU.show();
          this.ejDialogMU.position = { X: 670.312, Y: 334.125 };
        } else {
          this.mUData = res;
          this.ejDialogMU.show();
          this.ejDialogMU.position = { X: 670.312, Y: 334.125 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest4(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "AL",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.aLData = res;
          this.ejDialogAL.show();
          this.ejDialogAL.position = { X: 186.479, Y: 465.25 };
        } else {
          this.aLData = res;
          this.ejDialogAL.show();
          this.ejDialogAL.position = { X: 186.479, Y: 465.25 };
        }

        // console.log('Zons:', res , 'states');
      });
  }

  opentest5(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any[]) => {

        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "SFC",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.sFCData = res;
          console.log('SFC', this.sFCData);
          this.ejDialogSFC.show();
          this.ejDialogSFC.position = { X: ('411.312%'), Y: ('183.125%') };
        } else {
          this.sFCData = res;
          this.ejDialogSFC.show();
          this.ejDialogSFC.position = { X: '411.312', Y: '183.125' };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest6(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any[]) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "OSR",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.oSRData = res;
          this.ejDialogOSR.show();
          this.ejDialogOSR.position = { X: 968, Y: 260.292 };
        } else {
          this.oSRData = res;
          this.mostarOSR === true;
          this.ejDialogOSR.show();
          this.ejDialogOSR.position = { X: 968, Y: 260.292 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest7(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "CL",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.cLData = res;
          this.ejDialogCL.show();
          this.ejDialogCL.position = { X: 715.313, Y: 547 };
        } else {
          this.cLData = res;
          this.ejDialogCL.show();
          this.ejDialogCL.position = { X: 715.313, Y: 547 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest8(idDevices?: number) {
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any[]) => {
        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "ME",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.mEData = res;
          this.ejDialogME.show();
          this.ejDialogME.position = { X: 455.292, Y: 535.125 };
        } else {
          this.mEData = res;
          this.ejDialogME.show();
          this.ejDialogME.position = { X: 455.292, Y: 535.125 };
          // console.log('Zons:', res , 'states');
        }

      });
  }

  opentest9(idDevices?: number) {
    // this.changestest1(idDevices)
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone=' + idDevices)
      .pipe()
      .subscribe((res: any) => {

        if (res.length === 0) {
          res = [{
            // ZoneId: 0,
            ZoneName: "XO",
            Estado: "0",
            Consumo: "0",
            ContadorMaletas: "0",
            TiempoOn: 0,
            TiempoOff: 0,
          }]
          this.xOData = res;
          this.ejDialogXO.show();
          this.ejDialogXO.position = { X: 345.312, Y: 57.125 };
        } else {
          this.xOData = res;
          this.ejDialogXO.show();
          this.ejDialogXO.position = { X: 345.312, Y: 57.125 };
          // console.log('Zons:', res );
        }


      });
  }

  ClicTX() {
    this.opentest1(13);
    // this.close();
  }

  ClicSF1() {
    // this.comp3.openWindowForms(1);
    this.opentest1(1);
  }

  ClicSF2() {
    // this.comp3.openWindowForms(1);
    this.opentest1(16);
  }

  ClicSS1() {
    // this.comp3.openWindowForms(2);
    this.opentest1(2);
  }

  ClicSS2() {
    // this.comp3.openWindowForms(2);
    this.opentest1(17);
  }

  ClicMU1() {
    this.opentest1(6);
  }

  ClicMU2() {
    this.opentest1(21);
  }

  ClicAL1() {
    this.opentest1(5);
  }

  ClicAL2() {
    this.opentest1(20);
  }

  ClicSFC1() {
    this.opentest1(12);
  }

  ClicSFC2() {
    this.opentest1(24);
  }

  ClicOSR1() {
    this.opentest1(3);
  }

  ClicOSR2() {
    this.opentest1(18);
  }

  ClicCL1() {
    this.opentest1(4);
  }

  ClicCL2() {
    this.opentest1(19);
  }

  ClicME(): void {
    this.opentest1(11);
  }

  ClicXO(): void {
    this.opentest1(10);
  }

  // Navegacion a zonas

  bhs1() {
    this.router.navigate(['/pages/conveyor/bhs1']);
  }

  bhs2() {
    this.router.navigate(['/pages/conveyor/bhs2']);
  }

  bhs3() {
    this.router.navigate(['/pages/conveyor/bhs3']);
  }

  bhs4() {
    this.router.navigate(['/pages/conveyor/bhs4']);
  }

  bhs5() {
    this.router.navigate(['/pages/conveyor/bhs5']);
  }

  bhs6() {
    this.router.navigate(['/pages/conveyor/bhs6']);
  }

  bhs7() {
    this.router.navigate(['/pages/conveyor/bhs7']);
  }

  bhs8() {
    this.router.navigate(['/pages/conveyor/bhs8']);
  }

  bhs9() {
    this.router.navigate(['/pages/conveyor/bhs9']);
  }

  bhs10() {
    this.router.navigate(['/pages/conveyor/bhs10']);
  }

  closed() {
    setTimeout(() => {
      // console.log('Cerrar Dialogs');
      this.ejDialogTX.hide();
      this.ejDialogSF.hide();
      this.ejDialogSS.hide();
      this.ejDialogMU.hide();
      this.ejDialogAL.hide();
      this.ejDialogSFC.hide();
      this.ejDialogOSR.hide();
      this.ejDialogCL.hide();
      this.ejDialogME.hide();
      this.ejDialogXO.hide();
    }, 10000);
  }

  openDialogs() {
    // this.ClicTX();
    // this.ClicSF();
    // this.ClicSS();
    // this.ClicMU();
    // this.ClicAL();
    // // this.ClicSFC();
    // this.ClicOSR();
    // this.ClicCL();
    // this.ClicME();
    // this.ClicXO();
    this.closed();
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
