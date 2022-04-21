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
import { IdMaquinas, IdWip,MachineColor, WipColor, OrderProcess, State, Ordenes, WipName, showStatusMachinesAlarms, RouteCTS } from '../../_interfaces/MatBox.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { truncateSync } from 'node:fs';

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

  messages: any[] = [];
  subscription: Subscription;
  
  intervalSubscriptionRouteName: Subscription;
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

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  constructor(
    // public accessChecker: NbAccessChecker,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private themeService: NbThemeService,
    public sigalRService: SignalRService,
    private http: HttpClient,
    private comp2: WindowComponent,
    public apiGetComp: ApiGetService,
    public pipe: DecimalPipe,
    private api: HttpService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.onMessage().subscribe(message => {
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
    });

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


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.alive=false;
    this.sigalRService.alive=false;
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
    var res = this.comp2.openWindowForm(IdWip.ST3);
 }

 ClicST4() {
   this.comp2.openWindowForm(IdWip.ST4);
}

ClicST5() {
 this.comp2.openWindowForm(IdWip.ST5);
}
ClicST6() {
 this.comp2.openWindowForm(IdWip.ST6);
}
ClicST7() {
 this.comp2.openWindowForm(IdWip.ST7);
}

ClicST8() {
 this.comp2.openWindowForm(IdWip.ST8);
}


ClicST9() {
 this.comp2.openWindowForm(IdWip.ST9);
}

ClicST10() {
 this.comp2.openWindowForm(IdWip.ST10);
}

ClicST11() {
 this.comp2.openWindowForm(IdWip.ST11);
}


ClicST12() {
 this.comp2.openWindowForm(IdWip.ST12);
}


ClicST13() {
 this.comp2.openWindowForm(IdWip.ST13);
}


ClicST14() {
 this.comp2.openWindowForm(IdWip.ST14);
}

ClicST15() {
 this.comp2.openWindowForm(IdWip.ST15);
}

ClicID12(){
 this.comp2.openWindowForm(IdWip.ID12)
}

ClicID22(){
 this.comp2.openWindowForm(IdWip.ID22)
}

 ClicMARTIN1228() {    
       this.comp2.openWindowForm(IdMaquinas.Martin1228); 
 }

 ClicWard15000() {
     this.comp2.openWindowForm(IdMaquinas.WARD15000);
 }
 ClicLaminadora() {
   this.comp2.openWindowForm(IdMaquinas.Laminadora);
}

ClicImpresora36() {
 
 this.comp2.openWindowForm(IdMaquinas.Impresora36);
}

ClicJS() {
 this.comp2.openWindowForm(IdMaquinas.JS);
 
}

Clic924() {
 this.comp2.openWindowForm(IdMaquinas.M924);
}


ClicSYS() {
 this.comp2.openWindowForm(IdMaquinas.SYS);
}

 public ClicST2(): void {    
   this.comp2.openWindowForm(IdWip.ST2);
 }

 public ClicST1(): void {
   this.comp2.openWindowForm(IdWip.ST1);
 }

 public ClicIM1(): void {
  this.comp2.openWindowForm(IdWip.IM1);
}

public ClicIM2(): void {
  this.comp2.openWindowForm(IdWip.IM2);
}

public ClicIM3(): void {
  this.comp2.openWindowForm(IdWip.IM3);
}

public ClicIM4(): void {
  this.comp2.openWindowForm(IdWip.IM4);
}

public ClicIM5(): void {
  this.comp2.openWindowForm(IdWip.IM5);
}

public ClicIM6(): void {
  this.comp2.openWindowForm(IdWip.IM6);
}

public ClicIM7(): void {
  this.comp2.openWindowForm(IdWip.IM7);
}
 

}
