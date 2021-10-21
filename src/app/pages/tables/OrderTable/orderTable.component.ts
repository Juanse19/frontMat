import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output, ViewChild , TemplateRef, PipeTransform} from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { map, takeUntil, startWith, debounceTime, tap, switchMap, delay, takeWhile } from 'rxjs/operators';
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
import { Identifiers } from '@angular/compiler';
import { NbAccessChecker } from '@nebular/security';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, ToolbarService, EditService, PageService, CommandColumnService, CommandModel  } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

  interface Ordenes {
    id: number;
    order: string;
    batch?: number;
    name: string;
    description: string;
    reference: string;
    orderLength: number;
    cutsNumber: number;
    cutsWidth: number;
    cutsLength: number;
    origen:string;
    priority: number;
    corrInverted: boolean;
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



// function matches2(ordenes: Ordenes, term: string, pipe: PipeTransform) {
//   return ordenes.order.toLowerCase().includes(term)
//     || ordenes.name.toLowerCase().includes(term.toLowerCase())
//     || ordenes.description.toLowerCase().includes(term.toLowerCase())
//     || ordenes.reference.toLowerCase().includes(term)
//     || ordenes.origen.toLowerCase().includes(term.toLowerCase())
//     || pipe.transform(ordenes.orderLength).includes(term);
// }



@Component({
    providers:[
    //   JacComponent
    // , WindowComponent
     ApiGetService
     ,DecimalPipe
     ,WindowComponent
     ,WindowCreateComponent,
     ToolbarService, 
     EditService, 
     PageService,
     SortService, 
     CommandColumnService
    // , WindowFormComponent
    ],
    selector: 'ngx-ordertable',
    templateUrl: './orderTable.component.html',
    styleUrls: ['./orderTable.component.scss'],
  })

  export class OrderTableComponent implements OnInit {

  public orderdata: Ordenes ;

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;

  public initialSort: Object;

  // public toolbar: string[];


  @ViewChild('grid')
    public grid: GridComponent;

    subscription: Subscription;
    private _state: State = {
      page: 1,
      pageSize: 5,
      searchTerm: ''

    };

    public select = false;
    private alive = true;
    mostrar: Boolean;

    total: number ;

    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    // private _countries$ = new BehaviorSubject<Country[]>([]);
    private _Ordenes$ = new BehaviorSubject<Ordenes[]>([]);

    private _total$ = new BehaviorSubject<number>(0);

    filter = new FormControl('');

    constructor(
        public accessChecker: NbAccessChecker,
        public apiGetComp: ApiGetService,
        public pipe : DecimalPipe,
        private orderPopup: WindowComponent, 
        private orderCrearPopup: WindowCreateComponent,
        private api: HttpService,
        private messageService: MessageService
      ) {
        
        this.subscription = this.messageService.onMessage()
        .pipe(takeWhile(() => this.alive))
        .subscribe(message => {
          if (message.text=="orderTable") {
            //this.messages.push(message);
            this.CargarTabla();
          }
        });
        this._search$.pipe(
          takeWhile(() => this.alive),
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        )
        .pipe(takeWhile(() => this.alive))
        .subscribe(result => {
          this._Ordenes$.next(result.ordenes);
          this._total$.next(result.total);
        });
    
        this._search$.next();
        this.CargarTabla();
        this.alive;
        this.accessChecker.isGranted('edit', 'ordertable').subscribe((res: any) => {
          if(res){ 
            this.select = false;
            this.mostrar = false;
          }else {
            this.select=true;
            this.mostrar=true;
          }
        });

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

        this.editSettings = {
          allowEditing: true,
          allowAdding: true,
          allowDeleting: true,
          mode: 'Normal',
          allowEditOnDblClick: false
        };

    // this.toolbar = ['Search'];
    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
    type: 'Menu',
    }
    // this.toolbarOptions = ['Search'];

        // this.apiGetComp.GetJson(this.api.apiUrlMatbox +'/Orders/ObtenerOrders')
        // .pipe(takeWhile(() => this.alive))
        // .subscribe((res:any)=>{
        // // console.log(res)
        // ORDENES = res;  
        // this.orderdata = res; 
        // console.log('Data Ordens', this.orderdata)  
        // });

        this.CargarTabla();

        this._search$.next();

        // this.refreshCountries();

        this.toolbar = [
          'Search',
          //  {text: 'Delete', prefixIcon: 'fas fa-check'},
         { text: 'Crear Orden', tooltipText: 'Click', prefixIcon: 'e-add e-icons', id: 'Click' }];

        this.commands = [
          { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
          // { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
          { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
          { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];

    }
    
    created($event): void {
      document.getElementById(this.grid.element.id + "_searchbar").addEventListener('keyup', () => {
              this.grid.search((event.target as HTMLInputElement).value)
      });
  }

  actionBegin(args) {
    if (args.requestType == 'beginEdit') {
      // debugger
      // console.log('Editar');
      // console.log('Type edit: ', args);
      // this.router.navigate([`/pages/users/edit/${args.rowData.id}`]);

      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){ 
          this.orderPopup.openWindowForm("Propiedades de la Orden " + args.rowData.order , "", args.rowData);
          this.select = false;
          this.mostrar = false;
        }else {
          this.select=true;
          this.mostrar=true;
        }
      });

      args.cancel = true;
      
    }
    
  }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      // console.log('click: ', args);
      // debugger
      // debugger
      this.CrearOrden();

        // alert('Custom Toolbar Click...');
    }
  }

    CargarTabla(){
      this.apiGetComp.GetJson(this.api.apiUrlNode +'/api/ObtenerOrdenes')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any)=>{
        ORDENES = res;  
        this.orderdata = res;      
        });
        this._search$.next();
    }  
 
    _search(): Observable<SearchResult2> {
    
      const {pageSize, page, searchTerm} = this._state;


      let ordenes = ORDENES;
  
      // 2. filter
      // ordenes = ordenes.filter(ordenes => matches2(ordenes, searchTerm, this.pipe));
      const total = ordenes.length;
  
      // 3. paginate
      ordenes = ordenes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      // return of({countries, total});
      return of({ordenes, total});
    }

  public  Edit(orden:string, corrInverted: boolean, nombre:string, descripcion:string, referencia:string, tamañoOrden:number, origenValor:string, corteNumero: number, corteAncho:number, corteLargo:number, parPrority:number, idForm: number){
      
      
      ORDEN = {
        order: orden,
        id: idForm,
        name: nombre,
        description: descripcion,
        reference: referencia,
        orderLength: tamañoOrden,
        cutsNumber: corteNumero,
        cutsWidth: corteAncho,
        cutsLength: corteLargo,
        origen: origenValor,
        priority: parPrority,
        corrInverted: corrInverted,
      }
      // console.log(ORDEN);
      
      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){ 
          this.orderPopup.openWindowForm("Propiedades de la Orden " + ORDEN.order , "", ORDEN);
          this.select = false;
          this.mostrar = false;
        }else {
          this.select=true;
          this.mostrar=true;
        }
      });
      
    }

    Refresh(){
      this.apiGetComp.GetJson(this.api.apiUrlNode +'/api/ObtenerOrdenes')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res:any)=>{
        // console.log(res)
        ORDENES = res;     
        });
        this._search$.next();
    }
    

    

    CrearOrden(){
      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => { 
        if(res){ 
          this.orderCrearPopup.openWindowForm("CREAR ORDEN","");
          this.select = false;
        }else {
          this.select=true;
        }
      });
    }
  
    ngOnDestroy() {
      this.alive = false;
    }

}