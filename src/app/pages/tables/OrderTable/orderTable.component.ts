import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, ViewChild , TemplateRef, PipeTransform} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { map, takeUntil, startWith, debounceTime, tap, switchMap, delay } from 'rxjs/operators';
import { Observable, Subject, of, BehaviorSubject,Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { i18nMetaToDocStmt } from '@angular/compiler/src/render3/view/i18n/meta';
import {ApiGetService} from '../OrderTable/apiGet.services'
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {WindowComponent} from '../WindowOrderPopup/windowsOrderPopup.component'
import {ApiWindowOrderPopup} from '../WindowOrderPopup/apiWindowiOrderPopup.services'
import {WindowCreateComponent} from '../WindowCreateOrderPopup/windowsCreateOrderPopup.component'
import {HttpService} from '../../../@core/backend/common/api/http.service'
import { MessageService } from '../../dashboard/services/MessageService';


  interface Ordenes {
    id?: number;
    order: string;
    name: string;
    description: string;
    reference: string;
    orderLength: number;
    cutsNumber: number;
    cutsWidth: number;
    cutsLength: number;
    origen:string;
    priority: number;
  }

  interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
  }


  interface SearchResult2 {
    ordenes: Ordenes[];
    total: number;
  }

  let ORDENES: Ordenes[]= [
  

  ];

  let ORDEN: Ordenes  
{

};



function matches2(ordenes: Ordenes, term: string, pipe: PipeTransform) {
  return ordenes.order.toLowerCase().includes(term)
    || ordenes.name.toLowerCase().includes(term.toLowerCase())
    || ordenes.description.toLowerCase().includes(term.toLowerCase())
    || ordenes.reference.toLowerCase().includes(term)
    || ordenes.origen.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(ordenes.orderLength).includes(term);
}



@Component({
    providers:[
    //   JacComponent
    // , WindowComponent
     ApiGetService
     ,DecimalPipe
     ,WindowComponent
     ,WindowCreateComponent
    // , WindowFormComponent
    ],
    selector: 'ngx-ordertable',
    templateUrl: './orderTable.component.html',
    styleUrls: ['./orderTable.component.scss'],
  })

  export class OrderTableComponent implements OnInit {

    subscription: Subscription;
    private _state: State = {
      page: 1,
      pageSize: 5,
      searchTerm: ''

    };

  

    total: number ;

    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    // private _countries$ = new BehaviorSubject<Country[]>([]);
    private _Ordenes$ = new BehaviorSubject<Ordenes[]>([]);

    private _total$ = new BehaviorSubject<number>(0);

    filter = new FormControl('');

    constructor(
        private location: Location,
        private locationStrategy: LocationStrategy,
        private themeService: NbThemeService,
        private http: HttpClient,
        // private comp: JacComponent,
        // private comp2: WindowComponent, 
        public apiGetComp: ApiGetService,
        public pipe : DecimalPipe,
        private orderPopup: WindowComponent, 
        private orderCrearPopup: WindowCreateComponent,
        private api: HttpService,
        private messageService: MessageService
        // private comp3: WindowFormComponent
      ) {

        this.subscription = this.messageService.onMessage().subscribe(message => {
          if (message.text=="orderTable") {
            //this.messages.push(message);
            this.CargarTabla();
          }
        });
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._Ordenes$.next(result.ordenes);
          this._total$.next(result.total);
        });
    
        this._search$.next();
        this.CargarTabla();

      }

      // get countries$() { return this._countries$.asObservable(); }
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
      
    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        // console.log("entrooo")
        this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrders').subscribe((res:any)=>{
        // console.log(res)
        ORDENES = res;     
        });
        this._search$.next();

        // this.refreshCountries();
    }  

    CargarTabla(){
      this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrders').subscribe((res:any)=>{
        // console.log(res)
        ORDENES = res;     
        });
        this._search$.next();

    }  

    _search(): Observable<SearchResult2> {
    
      const {pageSize, page, searchTerm} = this._state;


      let ordenes = ORDENES;
  
      // 2. filter
      ordenes = ordenes.filter(ordenes => matches2(ordenes, searchTerm, this.pipe));
      const total = ordenes.length;
  
      // 3. paginate
      ordenes = ordenes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      // return of({countries, total});
      return of({ordenes, total});
    }

    Edit(orden:string, nombre:string, descripcion:string, referencia:string, tamañoOrden:number, origenValor:string, corteNumero: number, corteAncho:number, corteLargo:number, parPrority:number){
      ORDEN = {
        order: orden,
        name: nombre,
        description: descripcion,
        reference: referencia,
        orderLength: tamañoOrden,
        cutsNumber: corteNumero,
        cutsWidth: corteAncho,
        cutsLength: corteLargo,
        origen: origenValor,
        priority: parPrority,
      }
      // console.log(ORDEN);
      this.orderPopup.openWindowForm("Propiedades de la Orden " + ORDEN.order , "", ORDEN);
    }

    Refresh(){
      this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrders').subscribe((res:any)=>{
        // console.log(res)
        ORDENES = res;     
        });
        this._search$.next();
    }
    
    CrearOrden(){
      this.orderCrearPopup.openWindowForm("CREAR ORDEN","");

    }
  

}