import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Injectable, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { NbPopoverDirective, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { delay, map, takeUntil, takeWhile, timeout,switchMap } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject, interval,Subscription } from 'rxjs';
import { Zones, syste, teams, Consumezone, departures, Zonass } from '../../conveyor/_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { WindowComponent } from '../../conveyor/window/window.component';
import { DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'ngx-bhs-salidas',
  templateUrl: './bhs-salidas.component.html',
  styleUrls: ['./bhs-salidas.component.scss']
})
export class BhsSalidasComponent implements OnInit {

  public zone: Zones[] = [];

  public deparData: departures[];

  private alive=true;

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

  /** ---------------------------------------- */
  public tXData: Consumezone [] 
  
  // = {
  //   ZoneId: 0,
  //   ZoneName: "TX",
  //   Estado: "",
  //   Consumo: "",
  //   ContadorMaletas: "0",
  //   TiempoOn: 0,
  //   TiempoOff: 0,
  // }

  public sFData: Consumezone[] = [];

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

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public showCloseIcon: Boolean = true;

  intervalSubscriptionStatusAlarm:Subscription;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('resizeDialog' , {static: true}) specialistObj: DialogComponent;

  constructor(
    private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private windowService: NbWindowService,
    private comp5: WindowComponent,
    private comp6: WindowComponent,
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
    // Create element reference for dialog target element.
    // @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
    // The Dialog shows within the target element.
    public targetElement: HTMLElement;
    // This will resize the dialog in all the directions.
    // public resizeHandleDirection: ResizeDirections[] = ['All'];
    public visible: Boolean = true;
    public hidden: Boolean = false;
    public position: object={ X: 'left', Y: 'top' };
    public initialPage: Object;

    ngOnInit(): void {
      this.GetSystem();
      this.initilaizeTarget();
      this.pageSettings = { pageSize: 5 };
      this.filterOptions = {
        type: 'Menu',
     };
     this.initialPage = { pageSizes: true, pageSize: 5 };
    }

    close(){
      setTimeout(() => {
        // console.log('Cerrar Dialog', this.ejDialogTX.hide());
        this.ejDialogTX.hide();
      }, 20000);
    }

      // Initialize the Dialog component's target element.
      public initilaizeTarget: EmitType<object> = () => {
        // this.targetElement = this.container.nativeElement.parentElement;
        // this.resizeHandleDirection = ['All'];
          }

          public hideDialog: EmitType<object> = () =>  {
            this.ejDialogTX.hide();
        }
        // public hideDialog1: EmitType<object> = () => {
        //   this.ejDialog1.hide();
        // }
        // public hideDialog2: EmitType<object> = () =>  {
        //     this.ejDialog2.hide();
        // }
          // Hide the Dialog when click the footer button.
          // public hideDialog: EmitType<object> = () => {
          //   // this.ejDialog.hide();
          //   this.ejDialog1.hide();
          //   this.ejDialog2.hide();
          // }
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
          // ,
          // {
          //     'click': this.hideDialog.bind(this),
          //     buttonModel: {
          //       content: 'Cancel'
          //     }
          // }
          ];
          // Sample level code to handle the button click action
        //   public onOpenDialog = function(event: any): void {
        // // Call the show method to open the Dialog
        // // this.ejDialog.show();
        //   };

      //   public dialogClose = (): void => {
      //     (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).classList.remove('e-btn-hide');
      //     (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).classList.remove('e-btn-hide');
      //     (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).classList.remove('e-btn-hide');
      // }

  private GetSystem(){    
    this.http.get(this.api.apiUrlNode1 + '/apifront')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:Zones[])=>{
      this.zone=res;
      // console.log('zonas: ', this.zone);
    });
  }

  public changeId(tea: any){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ tea)
    .pipe()
    .subscribe((res: any)=>{
      this.tXData=res;
      // console.log('Zons:', res , 'states');
    });
  }

  public changeIdMakeUp(mak: any){
 
    this.http.get(this.api.apiUrlNode1 + '/api/departuresInfo?Id='+ mak)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.deparData=res;
    });
  }

  
  changestest(idDevice?: number){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevice)
    .pipe()
    .subscribe((res: any)=>{
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
        this.tXData=res;
        this.ejDialogTX.show();
        this.ejDialogTX.position = { X: 90.3125, Y: 330.125 };
      } else {
        this.tXData=res;
        this.ejDialogTX.show();
        this.ejDialogTX.position = { X: 90.3125, Y: 330.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest(idDevice?: number){
    this.changestest(idDevice)
  }

  opentest1(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any)=>{
      if (res.length === 0) {
        res = [{
          // ZoneId: 0,
          ZoneName: "SF",
          Estado: "0",
          Consumo: "0",
          ContadorMaletas: "0",
          TiempoOn: 0,
          TiempoOff: 0,
          }]
          this.sFData=res;
          this.ejDialogSF.show();
          this.ejDialogSF.position = { X: 570.312, Y: 153.125 };
      } else {
        this.sFData=res;
        this.ejDialogSF.show();
        this.ejDialogSF.position = { X: 570.312, Y: 153.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  changestest2(idDevic?: number){
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevic)
    .pipe()
    .subscribe((res: any)=>{
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
          this.sSData=res;
        this.ejDialogSS.show();
      this.ejDialogSS.position = { X: 716.312, Y: 137.125 };
      } else {
        this.sSData=res;
      this.ejDialogSS.show();
      this.ejDialogSS.position = { X: 716.312, Y: 137.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest2(idDevic?: number){
    this.changestest2(idDevic)
  }

  opentest3(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any)=>{
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
          this.mUData=res;
        this.ejDialogMU.show();
        this.ejDialogMU.position = { X: 670.312, Y: 334.125 };
      } else {
        this.mUData=res;
      this.ejDialogMU.show();
      this.ejDialogMU.position = { X: 670.312, Y: 334.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest4(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any)=>{
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
          this.aLData=res;
        this.ejDialogAL.show();
        this.ejDialogAL.position = { X: 186.479, Y: 465.25 };
      }else{
        this.aLData=res;
        this.ejDialogAL.show();
        this.ejDialogAL.position = { X: 186.479, Y: 465.25 };
      }
      
      // console.log('Zons:', res , 'states');
    });
  }

  opentest5(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any [])=>{

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
        this.sFCData=res;
        console.log('SFC', this.sFCData);
        this.ejDialogSFC.show();
        this.ejDialogSFC.position = { X: 90.3125, Y: 330.125 };
      } else {
      this.sFCData=res;
      this.ejDialogSFC.show();
      this.ejDialogSFC.position = { X: 90.3125, Y: 330.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest6(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any [])=>{
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
          this.oSRData=res;
        this.ejDialogOSR.show();
      this.ejDialogOSR.position = { X: 968, Y: 260.292 };
      } else {
        this.oSRData=res;
        this.mostarOSR === true;
        this.ejDialogOSR.show();
        this.ejDialogOSR.position = { X: 968, Y: 260.292 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest7(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any)=>{
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
          this.cLData=res;
        this.ejDialogCL.show();
      this.ejDialogCL.position = { X: 715.313, Y: 547 };
      } else {
        this.cLData=res;
        this.ejDialogCL.show();
        this.ejDialogCL.position = { X: 715.313, Y: 547 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest8(idDevices?: number){
    // this.changestest1(idDevices)
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any[])=>{
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
          this.mEData=res;
        this.ejDialogME.show();
      this.ejDialogME.position = { X: 455.292, Y: 535.125 };
      } else {
        this.mEData=res;
        this.ejDialogME.show();
        this.ejDialogME.position = { X: 455.292, Y: 535.125 };
      // console.log('Zons:', res , 'states');
      }
      
    });
  }

  opentest9(idDevices?: number){
    // this.changestest1(idDevices)
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/apiZoneFrontConsume?zone='+ idDevices)
    .pipe()
    .subscribe((res: any)=>{
 
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
          this.xOData=res;
        this.ejDialogXO.show();
        this.ejDialogXO.position = { X: 345.312, Y: 57.125 };
      } else {
        this.xOData=res;
      this.ejDialogXO.show();
      this.ejDialogXO.position = { X: 345.312, Y: 57.125 };
      // console.log('Zons:', res );
      }

      
    });
  }
 
  //Abrir ventana de cada zona

  ClicTX() {
    this.opentest(13);
    // this.close();
  }

  ClicSF() {
  // this.comp3.openWindowForms(1);
  this.opentest1(1);
  }

  ClicSS() {
  // this.comp3.openWindowForms(2);
  this.opentest2(2);
  }

  ClicMU() {
  this.opentest3(6);
  }

  ClicAL() {
  this.opentest4(5);
  }

  ClicSFC() {
  this.opentest5(12);
  }

  ClicOSR() {
  this.opentest6(3);
  }

  ClicCL() {
  this.opentest7(4);
  }

  ClicME(): void {
  this.opentest8(11);
  }

  ClicXO(): void {
    this.opentest9(10);
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

   closed(){
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

   openDialogs(){
    this.ClicTX();
    this.ClicSF();
    this.ClicSS();
    this.ClicMU();
    this.ClicAL();
    this.ClicSFC();
    this.ClicOSR();
    this.ClicCL();
    this.ClicME();
    this.ClicXO();
    this.closed();
   }

   ngOnDestroy() {
    this.alive = false;
  }

}
