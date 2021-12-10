import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, ViewChild , TemplateRef, PipeTransform, ElementRef} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { delay, map, takeUntil, takeWhile, timeout,switchMap } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject, interval,Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JacComponent } from '../../JacComponent/jac.component';
import { WindowComponent } from '../../WindowPopupComponent/windowPopup.component';
import {ApiGetService} from '../../WindowPopupComponent/apiGet.services';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {WindowComponent2 } from '../../OrderPopup/orderPopup.component';
import { HttpService } from '../../../../@core/backend/common/api/http.service';

import { SignalRService } from '../../services/signal-r.service';
import { MessageService } from '../../services/MessageService';
import { IdMaquinas, IdWip,MachineColor, WipColor, OrderProcess, State, Ordenes, WipName, showStatusMachinesAlarms, RouteCTS, PedidoStackers } from '../../_interfaces/MatBox.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { truncateSync } from 'node:fs';
import  { QueuedOrdersComponent } from '../../queued-orders/queued-orders.component';
import { ManualorderComponent } from '../../manualorder/manualorder.component';

interface Propiedades {
  id?: number; 
  name: string; 
  description: string; 
  isOn: boolean;
  type: string;
  valor: string;
  prioridad: number;
  width: number;
  lenght: number;
}

let PROPIEDADES: Propiedades;
  {
  
  }

@Component({
  providers: [
     WindowComponent
    , ApiGetService
    , DecimalPipe
    , WindowComponent2,
    // , WindowFormComponent
    ],
  selector: 'ngx-wcs',
  templateUrl: './wcs.component.html',
  styleUrls: ['./wcs.component.scss']
})
export class WcsComponent implements OnInit, OnDestroy {

  @ViewChild('autoInput') input;

  errors = [];

  messages: any[] = [];
  subscription: Subscription;
  
  intervalSubscriptionRouteName: Subscription;
  intervalSubscriptionPeriodoStacker: Subscription;
  intervalSubscriptionPeriodoStacker1: Subscription;
  intervalSubscriptionCT: Subscription;
  intervalSubscriptionCT1: Subscription;
  intervalSubscriptionCT2: Subscription;
  intervalSubscriptionTM: Subscription;
  intervalSubscriptionStatusAlarm:Subscription;

  inputOrder: string;

  public orderProcess: OrderProcess[];


  public dataMachineColor: MachineColor = {
    color924: "White",
    colorImpresora36: "White",
    colorJS: "White",
    colorLaminadora: "White",
    colorMartin1228: "White",
    colorSYS: "White",
    colorWARD15000: "White",

  };

  // public showAlarmJs = true;

  public dataWipName: WipName = {
  iD_12: "",
  iD_22: "",
  sT1: "",
  sT2: "",
  iM1: "",
  sT3: "",
  sT4: "",
  sT5: "",
  sT6: "",
  sT7: "",
  sT8: "",
  sT9: "",
  sT10: "",
  sT11: "",
  sT12: "",
  sT13: "",
  sT14: "",
  sT15: "",
  iM2: "",
  iM3: "",
  iM4: "",
  iM5: "",
  iM6: "",
  iM7: "",
  cT2: "",
  cT1: "",
  cT_1: "",
  cT_2: "",
  tm: "",
  tF1: "",
  tF2: "",
  }
 
  public showdataAlarms: showStatusMachinesAlarms = {

    StatusMartin: true,        
    StatusJs: true,        
    Status924: true,        
    StatusSyS: true,        
    StatusLaminadora: true,        
    StatusWard: true,
    Impresora: true,       
    StatusiD_12: true,        
    StatusiD_22: true,        
    StatussT1: true,        
    StatussT2: true,       
    StatusiM1: false,       
    StatussT3: true,       
    StatussT4: true,       
    StatussT5: true,       
    StatussT6: true,       
    StatussT7: true,       
    StatussT8: true,       
    StatussT9: true,       
    StatussT10: true,      
    StatussT11: true,       
    StatussT12: true,      
    StatussT13: true,      
    StatussT14: true,       
    StatussT15: true,      
    StatusiM2: false,      
    StatusiM3: false,       
    StatusiM4: false,       
    StatusiM5: false,       
    StatusiM6: false,       
    StatusiM7: false,       
    StatuscT2: false,       
    StatuscT1: false,       
    Statustm: false,       
    StatustF1: true,        
    StatustF2: true,
    StatusPrefeeder_Martin: true,
    StatusPrefeeder_Js: true,
    StatusPrefeeder_925: true,
    StatusPrefeeder_Sys: true,
    StatusPrefeeder_Ward15000: true,
    StatusPrefeeder_Eterna: true,
    StatusPrefeeder_Impresora36: true,
    StatusPrefeeder_Laminadora: true,
    StatusTornamesa: false, 
    StatusCt: true,        
    StatusCt1: true,        
    StatusCt2: true,
  }
  
  public dataRoutesCts: RouteCTS = {
    RutaCtA: "CtA",
    RutaCtB: "CtB",
    RutaCt1: "Ct1",
    RutaCt2: "Ct2",
  }

  public dataPeriodoStackerAbove: PedidoStackers = {
    OrderNumber: "0",
    Origen: "ARRIBA"
  }
  public dataPeriodoStackerDown: PedidoStackers = {
    OrderNumber: "0",
    Origen: "ABAJO"
  }

  public dataWipColor: WipColor = {
    colorST1: "Black",
    colorST2: "Black",
    colorST3: "Black",
    colorST4: "Black",
    colorST5: "Black",
    colorST6: "Black",
    colorST7: "Black",
    colorST8: "Black",
    colorST9: "Black",
    colorST10: "Black",
    colorST11: "Black",
    colorST12: "Black",
    colorST13: "Black",
    colorST14: "Black",
    colorST15: "Black",
  };


  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',

  };
  valorXPquetes = 0;
  valorXCT = 126.321;
  valorYCT1 = -96.3;
  valorYCT2 = -94.3;
  valorZTM = 0;

  paqueteNombe = "paqueteST6"
  contPaqueteST6 = 0;
  contPaqueteST3 = 0;
  contPaqueteST7 = 0;
  contPaqueteST8 = 0;
  contPaqueteST9 = 0;
  contPaqueteST10 = 0;
  contPaqueteST11 = 0;
  contPaqueteST12 = 0;
  contPaqueteST13 = 0;
  contPaqueteST14 = 0;
  contPaqueteST15 = 0;
  contPaqueteST4 = 0;
  contPaqueteST5 = 0;
  contPaqueteST1 = 0;
  contPaqueteST2 = 0;

  public fillValor;
  public colorMartin1228;
  public colorWARD15000;
  public colorLaminadora;
  public colorImpresora36;
  public colorJS;
  public color924;
  public colorSYS;

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
    // private _countries$ = new BehaviorSubject<Country[]>([]);
  private _Ordenes$ = new BehaviorSubject<Ordenes[]>([]);

  private _total$ = new BehaviorSubject<number>(0);

  private alive=true;

  propiedades = PROPIEDADES;
  propSt11 = PROPIEDADES;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  @ViewChild(QueuedOrdersComponent, { static: true }) public dialog: QueuedOrdersComponent;

  @ViewChild(ManualorderComponent, { static: true }) public dial: ManualorderComponent;
 

  constructor(
    // public accessChecker: NbAccessChecker,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private themeService: NbThemeService,
    public sigalRService: SignalRService,
    private http: HttpClient,
    private comp2: WindowComponent,
    private dialo: QueuedOrdersComponent,
    private dialos: ManualorderComponent,
    public apiGetComp: ApiGetService,
    public pipe: DecimalPipe,
    private api: HttpService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.onMessage()
    .pipe(takeWhile(() => this.alive))
    .subscribe(message => {
      if (message.text=="MachineColor") {
        //this.messages.push(message);
        this.ColorCharge();
        this.WipNameCharge();
      } 
    });
  }


  get ordenesMaquina$() { return this._Ordenes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // get searchTerm() { return this._state.searchTerm; }
  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  public ColorCharge(){
    
  this.http.get(this.api.apiUrlMatbox + "/Orders/GetMachineColor")
  .pipe(takeWhile(() => this.alive))
  .subscribe((res: any)=>{
    this.dataMachineColor=res;
  });

  this.http.get(this.api.apiUrlMatbox + "/Orders/GetWipColor")
  .pipe(takeWhile(() => this.alive))
  .subscribe((res: any)=>{
    this.dataWipColor=res;
  });

  }

  public WipNameCharge(){

    this.http.get(this.api.apiUrlMatbox + "/Orders/WipNameList")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.dataWipName=res[0];
    });

  }



  public StatusAlarmCharge(){

    if (this.intervalSubscriptionStatusAlarm) {
      this.intervalSubscriptionStatusAlarm.unsubscribe();
    }
    
       
    this.intervalSubscriptionStatusAlarm = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/es')),
    )
    .subscribe((res: any) => {
        this.showdataAlarms  = res[0];
        // console.log('StateAlarms', this.showdataAlarms); 
        
    },(error) => (console.log(error)),
    () => console.log('Post moratorium location for moratorium is complete' ),
  );

    // this.apiGetComp.GetJson(this.api.apiUrlNode + '/es')
    //   .pipe(takeWhile(() =>this.flagMoverCarro))
    // .subscribe((res: any) => {
    //   this.showdataAlarms  = res[0];
    //   });

  }

  public RouteCtsCharge(){

    if (this.intervalSubscriptionRouteName) {
      this.intervalSubscriptionRouteName.unsubscribe();
    }
    
    this.intervalSubscriptionRouteName = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/CT2V')),
    )
    .subscribe((res: any) => {
      this.dataRoutesCts  = res[0];
    },(error) => (console.log(error)),
    () => console.log('Post moratorium location for moratorium is complete' ),
  );

 
  }

  public PedidoStackersAboveCharge(){

    if (this.intervalSubscriptionPeriodoStacker) {
      this.intervalSubscriptionPeriodoStacker.unsubscribe();
    }
    
    this.intervalSubscriptionPeriodoStacker = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/api/PedidoStackers?origen=arriba')),
    )
    .subscribe((res: any) => {
      
      if (res[0] == undefined) {
        // console.log('no hay data arriba');
        
      } else {
        // console.log('Si hay');
        this.dataPeriodoStackerAbove  = res[0];
      }

      // console.log('periodosStakerArriba',this.dataPeriodoStackerAbove);
    });
  }

  public PedidoStackersDownCharge(){

    if (this.intervalSubscriptionPeriodoStacker1) {
      this.intervalSubscriptionPeriodoStacker1.unsubscribe();
    }
    
    this.intervalSubscriptionPeriodoStacker1 = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/api/PedidoStackers?origen=abajo')),
    )
    .subscribe((res: any) => {
      if (res[0] == undefined) {
        // console.log('no hay data abajo');
      } else {
        this.dataPeriodoStackerDown  = res[0];
      }

      // console.log('periodosStakerAbajo',this.dataPeriodoStackerDown);
    },
    err => {
      this.errors = err.error.message;
      console.log(this.errors);
    });
  }
  
  public PedidoStackers1Charge(){
    
    this.http.get(this.api.apiUrlNode + "/api/PedidoStackers?origen=arriba")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res[0] == undefined) {
        // console.log('no hay data arriba');
        
      } else {
        // console.log('Si hay');
        this.dataPeriodoStackerAbove  = res[0];
      }
      
    });
  
    
  
    }

    PedidoStackers2Charge(){
      this.http.get(this.api.apiUrlNode + "/api/PedidoStackers?origen=abajo")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (res[0] == undefined) {
        // console.log('no hay data abajo');
      } else {
        this.dataPeriodoStackerDown  = res[0];
      }
      
      
    });
    }

    

  ngOnInit(): void {
    this.GetOrderProcess();
    this.InitSignalR();
    this.MoverCarro();
    this.ColorCharge();
    this.WipNameCharge();
    // this.showStatusAlarms();
    this.RouteCtsCharge();
    this.PedidoStackersAboveCharge();
    this.PedidoStackersDownCharge();
    // this.PedidoStackers1Charge();
    // this.PedidoStackers2Charge();
    // this.showStatusName();
    // this.showSatatusRouteCts();
    // this.StatusAlarmCharge();
  }

  InitSignalR() {
    this.sigalRService.GetDataManual();
    for (var clave in IdWip) {
      var idMachine = IdWip[clave];

      // this.sigalRService.startConnectionPackageWip(idMachine);
      // this.startHttpRequestPackage(idMachine);
    }

  }

  private startHttpRequestPackage(id) {
    this.http.get(this.api.apiUrlMatbox + "/showpackage?idMaquina=" + id)
    .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        // console.log(res);
      });
  }

  private GetOrderProcess(){    
    this.http.get(this.api.apiUrlMatbox + "/Orders/GetOrderProcess")
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any)=>{
      this.orderProcess=res;
    });
  }


 

  MoverCarro(){
    
    this.StatusAlarmCharge();
    this.RouteCtsCharge();
      this.MoverCT();
      this.MoverCT1();
      this.MoverCT2();
      this.MoverTM();
  }

  MoverCT(){

    if (this.intervalSubscriptionCT) {
      this.intervalSubscriptionCT.unsubscribe();
    }

    this.intervalSubscriptionCT = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/CT')),
    )
    .subscribe((res: any) => {
      this.valorXCT  = res.position;
    });

  //   // this.valorX = this.valorX + 10;
  //  this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT')
  //   .pipe(
  //     takeWhile(() =>this.flagMoverCarro)
  //     )
  //   .subscribe((res: any) => {
  //     this.valorXCT  = res.position;
  //     });
  }
  MoverCT1(){

    if (this.intervalSubscriptionCT1) {
      this.intervalSubscriptionCT1.unsubscribe();
    }


    this.intervalSubscriptionCT1 = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/CT1')),
    )
    .subscribe((res: any) => {
      this.valorYCT1  = res.position;
    });


    //  this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT1')
    //   .pipe(
    //  takeWhile(() =>this.flagMoverCarro)
    //   )
    // .subscribe((res: any) => {
    //   this.valorYCT1  = res.position;
    //   });
  }
  MoverCT2(){

    if (this.intervalSubscriptionCT2) {
      this.intervalSubscriptionCT2.unsubscribe();
    }


    this.intervalSubscriptionCT2 = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/CT2')),
    )
    .subscribe((res: any) => {
      this.valorYCT2  = res.position;
    });

    //  this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT2')    
    //   .pipe(takeWhile(() =>this.flagMoverCarro)
    //   )
    // .subscribe((res: any) => {
    //   this.valorYCT2  = res.position;
    //   });
  }

  MoverTM(){

    if (this.intervalSubscriptionTM) {
      this.intervalSubscriptionTM.unsubscribe();
    }



    this.intervalSubscriptionTM = interval(1000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/TM')),
    )
    .subscribe((res: any) => {
      this.valorZTM  = res.position;
    });

    // this.apiGetComp.GetJson(this.api.apiUrlNode + '/TM')
    //   .pipe(
    //  takeWhile(() =>this.flagMoverCarro)
    //   )
    // .subscribe((res: any) => {
    //   this.valorZTM  = res.position;
    //   });
  }

  ClicST3() {
    // var res = this.comp2.openWindowForm(IdWip.ST3);
    this.dial.openOrder(IdWip.ST3);
 }

 ClicST4() {
  //  this.comp2.openWindowForm(IdWip.ST4);
  this.dial.openOrder(IdWip.ST4);
}

ClicST5() {
//  this.comp2.openWindowForm(IdWip.ST5);
this.dial.openOrder(IdWip.ST5);
}
ClicST6() {
//  this.comp2.openWindowForm(IdWip.ST6);
this.dial.openOrder(IdWip.ST6);
}
ClicST7() {
//  this.comp2.openWindowForm(IdWip.ST7);
this.dial.openOrder(IdWip.ST7);
}
 
ClicST8() {
//  this.comp2.openWindowForm(IdWip.ST8);
this.dial.openOrder(IdWip.ST8);
}


ClicST9() {
//  this.comp2.openWindowForm(IdWip.ST9);
this.dial.openOrder(IdWip.ST9);
}

ClicST10() {
//  this.comp2.openWindowForm(IdWip.ST10);
this.dial.openOrder(IdWip.ST10);
}

ClicST11() {
//  this.comp2.openWindowForm(IdWip.ST11);
this.dial.openOrder(IdWip.ST11);
}


ClicST12() {
//  this.comp2.openWindowForm(IdWip.ST12);
this.dial.openOrder(IdWip.ST12);
}


ClicST13() {
//  this.comp2.openWindowForm(IdWip.ST13);
this.dial.openOrder(IdWip.ST13);
}


ClicST14() {
//  this.comp2.openWindowForm(IdWip.ST14);
this.dial.openOrder(IdWip.ST14);
}

ClicST15() {
//  this.comp2.openWindowForm(IdWip.ST15);
 this.dial.openOrder(IdWip.ST15);
}

ClicID12(){
//  this.comp2.openWindowForm(IdWip.ID12)
 this.dial.openOrder(IdWip.ID12);
}

ClicID22(){
//  this.comp2.openWindowForm(IdWip.ID22)
this.dial.openOrder(IdWip.ID22);
}

 ClicMARTIN1228() {    
      //  this.comp2.openWindowForm(IdMaquinas.Martin1228); 
      this.dial.openOrder(IdMaquinas.Martin1228); 
 }

 ClicWard15000() {
    //  this.comp2.openWindowForm(IdMaquinas.WARD15000);
    this.dial.openOrder(IdMaquinas.WARD15000);
 }
 ClicLaminadora() {
  //  this.comp2.openWindowForm(IdMaquinas.Laminadora);
  this.dial.openOrder(IdMaquinas.Laminadora);
}

ClicImpresora36() {
 
//  this.comp2.openWindowForm(IdMaquinas.Impresora36);
 this.dial.openOrder(IdMaquinas.Impresora36);
}

ClicJS() {
//  this.comp2.openWindowForm(IdMaquinas.JS);
 this.dial.openOrder(IdMaquinas.JS);
}

Clic924() {
//  this.comp2.openWindowForm(IdMaquinas.M924);
 this.dial.openOrder(IdMaquinas.M924);
}


ClicSYS() {
//  this.comp2.openWindowForm(IdMaquinas.SYS);
 this.dial.openOrder(IdMaquinas.SYS);
}

 public ClicST2(): void {    
  //  this.comp2.openWindowForm(IdWip.ST2);
  this.dial.openOrder(IdWip.ST2);
 }

 public ClicST1(): void {
  //  this.comp2.openWindowForm(IdWip.ST1);
  this.dial.openOrder(IdWip.ST1);
 }

 public ClicIM1(): void {
  // this.comp2.openWindowForm(IdWip.IM1);
  this.dial.openOrder(IdWip.IM1);
}

public ClicIM2(): void {
  // this.comp2.openWindowForm(IdWip.IM2);
  this.dial.openOrder(IdWip.IM2);
}

public ClicIM3(): void {
  // this.comp2.openWindowForm(IdWip.IM3);
  this.dial.openOrder(IdWip.IM3);
}

public ClicIM4(): void {
  // this.comp2.openWindowForm(IdWip.IM4);
  this.dial.openOrder(IdWip.IM4);
}

public ClicIM5(): void {
  // this.comp2.openWindowForm(IdWip.IM5);
  this.dial.openOrder(IdWip.IM5);
}

public ClicIM6(): void {
  // this.comp2.openWindowForm(IdWip.IM6);
  this.dial.openOrder(IdWip.IM6);
}

public ClicIM7(): void {
  // this.comp2.openWindowForm(IdWip.IM7);
  this.dial.openOrder(IdWip.IM7);
}

public ClicCT_1(): void {
  // this.comp2.openWindowForm(IdWip.CT_1);
  this.dial.openOrder(IdWip.CT_1);
}

public ClicCT_2(): void {
  // this.comp2.openWindowForm(IdWip.CT_2);
  this.dial.openOrder(IdWip.CT_2);
}

public ClicCT1(): void {
  // this.comp2.openWindowForm(IdWip.CT1);
  this.dial.openOrder(IdWip.CT1);
}

public ClicCT2(): void {
  // this.comp2.openWindowForm(IdWip.CT2);
  this.dial.openOrder(IdWip.CT2);
}

public ClicTM(): void {
  // this.comp2.openWindowForm(IdWip.TM);
  this.dial.openOrder(IdWip.TM);
}

public ClicTF1(): void {
  // this.comp2.openWindowForm(IdWip.TF1);
  this.dial.openOrder(IdWip.TF1);
}

public ClicTF2(): void {
  // this.comp2.openWindowForm(IdWip.TF2);
  this.dial.openOrder(IdWip.TF2);
}

public ClicAbove(): void {
  this.dialog.opendevice1();
}

public ClicDown(): void {
  this.dialog.opendevice2();
}

public ClicTest(): void {
  this.dial.openOrder(IdWip.IM7);
}

public ClicTest1(): void {
  this.dial.openOrder(IdWip.IM6);
}

public ClicTest2(): void {
  this.dial.openOrder(IdWip.CT1);
}

public ClicTest3(): void {
  this.dial.openOrder(IdWip.ST12);
}
 
ngOnDestroy() {
  this.alive=false;
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
  
  this.sigalRService.alive=false;
}

}
