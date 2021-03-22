import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, ViewChild , TemplateRef, PipeTransform, ElementRef} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { delay, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject, interval,Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JacComponent } from '../../JacComponent/jac.component';
import { WindowComponent } from '../../WindowPopupComponent/windowPopup.component';
import {ApiGetService} from '../../WindowPopupComponent/apiGet.services';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {WindowComponent2 } from '../../OrderPopup/orderPopup.component';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import { NbAccessChecker } from '@nebular/security';
import { SignalRService } from '../../services/signal-r.service';
import { MessageService } from '../../services/MessageService';
import { IdMaquinas, IdWip,MachineColor, WipColor, OrderProcess, State, Ordenes } from '../../_interfaces/MatBox.model';

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
  valorXCT = 0;
  valorYCT1 = 591.798;
  valorYCT2 = 591.798;
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


  constructor(
    public sigalRService: SignalRService,
    private http: HttpClient,
    public comp2: WindowComponent,
    private api: HttpService,
    public apiGetComp: ApiGetService,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.onMessage().subscribe(message => {
      if (message.text=="MachineColor") {
        //this.messages.push(message);
        this.ColorCharge();
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
  .subscribe((res: any)=>{
    this.dataMachineColor=res;
  });

  this.http.get(this.api.apiUrlMatbox + "/Orders/GetWipColor")
  .subscribe((res: any)=>{
    this.dataWipColor=res;
  });
  }


  ngOnInit(): void {
    this.GetOrderProcess();
  }

  InitSignalR() {
    for (var clave in IdWip) {
      var idMachine = IdWip[clave];

      this.sigalRService.startConnectionPackageWip(idMachine);
      this.startHttpRequestPackage(idMachine);
    }
  }

  private startHttpRequestPackage(id) {
    this.http.get(this.api.apiUrlMatbox + "/showpackage?idMaquina=" + id)
      .subscribe(res => {
        // console.log(res);
      });
  }

  private GetOrderProcess(){    
    this.http.get(this.api.apiUrlMatbox + "/Orders/GetOrderProcess")
    .subscribe((res:any)=>{
      this.orderProcess=res;
    });
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


  }

  MoverCarro(){
    // this.valorX = this.valorX + 10;
  const contador = interval(1000)
    contador.subscribe((n) =>{
      this.MoverSTM();
      this.MoverCT();
      this.MoverCT1();
      this.MoverCT2();
      this.MoverTM();
    });
    // const contador2 = interval(1000)
    // contador2.subscribe((n) =>{
    //   this.MoverCT();
    // });
    // const contador3 = interval(1000)
    // contador3.subscribe((n) =>{
    //   this.MoverCT();
    // });
  }

  MoverSTM(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/ST').subscribe((res: any) => {
      // console.log(res);
      this.valorXCT  = res.position;
      });
  }

  MoverCT(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT').subscribe((res: any) => {
      // console.log(res);
      this.valorXCT  = res.position;
      });
  }
  MoverCT1(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT1').subscribe((res: any) => {
      // console.log(res);
      this.valorYCT1  = res.position;
      });
  }
  MoverCT2(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/CT2').subscribe((res: any) => {
      // console.log(res);
      this.valorYCT2  = res.position;
      });
  }

  MoverTM(){
    // this.valorX = this.valorX + 10;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/TM').subscribe((res: any) => {
      // console.log(res);
      this.valorZTM  = res.position;
      });
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


}
