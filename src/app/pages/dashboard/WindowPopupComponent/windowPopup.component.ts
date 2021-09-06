

import { Component, ElementRef, PipeTransform, TemplateRef, ViewChild, Renderer2,Injectable  } from '@angular/core';
import { NbWindowConfig, NbWindowService, NbWindowRef,NbToastrService } from '@nebular/theme';
import {ApiGetService} from './apiGet.services';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject,Subscription } from 'rxjs';
import { debounceTime, delay, reduce, switchMap, takeWhile, tap } from 'rxjs/operators';
import {WindowComponent2 } from '../OrderPopup/orderPopup.component';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Router, NavigationEnd } from '@angular/router';
import { NbAccessChecker } from '@nebular/security'
import { MessageService } from '../services/MessageService';
import { User, UserData } from '../../../@core/interfaces/common/users';
import { UserStore } from '../../../@core/stores/user.store';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';

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

interface PropiedadesActualizar {
  id: number;
  descripcionMaquina: string;
  type: string;
  valor: string;
  isOn: boolean;
  prioridad?: number;
}

interface Ordenes {
  id: number;
  order: string;
  name?: string;
  description?: string;
  reference?: string;
  cutLength?: number;
  cutsCount?:number;
  cutsCountOriginal?: number;
  state: string;
  stateId: number;
  priority:number;
  idDevice:number;
  timeStamp?:string;
}

interface Data {
  id?: number;
  text: string;
  number: number;
  name: string;
  x: number;
}

interface DeviceType {
  id?: number;
  value: string;
  label: string;
}

interface ColorLista {
  id?: number;
  value: string;
  label: string;
}

interface Wip{
  id?: number;
  name: string;
  description: string;
  isOn: boolean;
  selected: boolean
}

interface WipTarget{
  idTarget: number;
  idWip: number
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

interface Alias {
  Id: number;
  IdAlias: number;
  Name: string;
  Alias: string;
}

let ORDENES: Ordenes[] = [


];

let ORDEN: Ordenes;
{

}

let DATA: Data;
  {
    // text: 'JAC',
    // number: 233423,
    // name: 'Julian Arango',
    // x: 5
  }


let DEVICETYPE: DeviceType;
{

}

let DEVICESTYPE: DeviceType[] = [


];


let IDMAQUINA: number;

let WIPLIST: Wip[]=[


];

let WIPFREE: Wip[]=[


];

let WIPTARGET: WipTarget;
{

};

let COLORLISTA: ColorLista[] = [


];

let COLOR: ColorLista;
{

}

let PROPIEDADES: Propiedades;
{

}

let ALIAS: Alias;
{

}

let PROPIEDADESACTUALIZAR: PropiedadesActualizar;
{

}

let win:NbWindowRef;


function matches2(ordenes: Ordenes, term: string, pipe: PipeTransform) {
  return ordenes.order.toLowerCase().includes(term)
    || ordenes.name.toLowerCase().includes(term.toLowerCase())
    || ordenes.description.toLowerCase().includes(term.toLowerCase())
    || ordenes.reference.toLowerCase().includes(term)
    || pipe.transform(ordenes.cutLength).includes(term)
    || pipe.transform(ordenes.cutsCount).includes(term)
}

@Component({
  providers: [ApiGetService,
    DecimalPipe,
    WindowComponent2,
  ],
  selector: 'ngx-window',
  templateUrl: './windowPopup.component.html',
  styleUrls: [ './windowPopup.component.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class WindowComponent {
  subscription: Subscription;
  windowRef:NbWindowRef;
  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',

  };

  public select = false;
  private alive = true;
  mostrar: Boolean;

  mySubscription: any;

  idMaquina=IDMAQUINA;

  aliasData = ALIAS;

  // public select=true;

  propiedades = PROPIEDADES;

  nombreEstado: string;
  toggleNgModel = true;
  public selec = false;
  

  devicesType = DEVICESTYPE;
  deviceType = DEVICETYPE;

  colorLista = COLORLISTA;
  color = COLOR;

  wipLista = WIPLIST; 
  wipFree= WIPFREE;

  ordenesFiltro;
  data = DATA;
  dataOrden = ORDEN;
  filter = new FormControl('');

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
    // private _countries$ = new BehaviorSubject<Country[]>([]);
  private _Ordenes$ = new BehaviorSubject<Ordenes[]>([]);

  private _total$ = new BehaviorSubject<number>(0);

  x: number;
  c: NbWindowConfig;
  // ventana = WindowComponent;
  // @Input() childMessage: string;
  nombreHTML: string;
  public nombre = 'JAC';
  // public nombre:any;


  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('prioridadValor') prioridadValor: ElementRef;
  @ViewChild('nameMachine') nameMachineValor: ElementRef;
  @ViewChild('wips') eWips: ElementRef;
  
  constructor(private windowService: NbWindowService,
    
    public accessChecker: NbAccessChecker,
    private apiGetComp: ApiGetService,
    public pipe: DecimalPipe,
    private orderPopup: WindowComponent2,
    private api: HttpService,
    private router: Router,
    private messageService: MessageService,
    private toasterService: NbToastrService,
    private userStore: UserStore,
    
    ) {



      if (IDMAQUINA === 36 ||  IDMAQUINA === 40) {
        this.selec = false;
        // this.DataLoad(idMaquina); 
        console.log("Cambio de estado", this.selec);
      }else {
        this.selec=true;
      }
      
      this.subscription = this.messageService.onMessage().subscribe(message => {
        if (message.text=="PackageUpdate") {
          //this.messages.push(message);
          this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrdersMaqina?idMaquina='+ this.idMaquina)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            ORDENES = res;
            this._search$.next();
            // this._search$.pipe(
            //   tap(() => this._loading$.next(true)),
            //   debounceTime(200),
            //   switchMap(() => this._search()),
            //   delay(200),
            //   tap(() => this._loading$.next(false)),
            // ).subscribe(result => {
            //   this._Ordenes$.next(result.ordenes);
            //   this._total$.next(result.total);
            // });
            
            

          });
        } 
      });
      // .pipe(map(hasAccess => {
      //   if (hasAccess) {
      //     // return [...dashboardMenu, userMenu, ...menu];
      //     let hola1=hasAccess;
      //   } else {
      //     // return [...dashboardMenu, ...menu];
      //     let hola2=hasAccess;;
      //   }
      // }));

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false)),
      ).subscribe(result => {
        this._Ordenes$.next(result.ordenes);
        this._total$.next(result.total);
      });

      this._search$.next();
      this.ObtenerListaDeviceType();
      this.ObtenerListaColor();
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

  _search(): Observable<SearchResult2> {

    const {pageSize, page, searchTerm} = this._state;

    
    
    let ordenes = ORDENES;

    // if (IDMAQUINA == 36 || IDMAQUINA == 40 ) {
    //   this.select = false; 
    //   console.log("Select", this.select);
    // } else {
    //   this.select=true;
    // } 

    // 2. filter
    ordenes = ordenes.filter(ordenes => matches2(ordenes, searchTerm, this.pipe));
    const total = ordenes.length;

    // 3. paginate
    ordenes = ordenes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // return of({countries, total});
    this.ordenesFiltro = ordenes;
    return of({ordenes, total});
  }

  settings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Id: {
        title: 'ID',
        type: 'number', 
        filter: false,
        hide: true,
        editable: false,
        addable: false
      },
      IdAlias: {
        title: 'IdAlias',
        type: 'number',
        filter: false,
        editable: false,
        addable: false
      },
      Name: {
        title: 'Nombre',
        type: 'string',
        filter: false,
        editable: false,
        addable: false
      },
      Alias: {
        title: 'Alias',
        type: 'string',
        filter: false,
      },
     
    },
  };

  source: LocalDataSource = new LocalDataSource();

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'Id',
        search: query
      },
      {
        field: 'IdAlias',
        search: query
      },
      {
        field: 'Nombre',
        search: query
      },
      {
        field: 'Alias',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  DataLoad(idMaquina: number){
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetAliasById?Id='+ idMaquina)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      ALIAS = res;
      this.aliasData=ALIAS;
      this.source.load(res);
      // console.log('alias: ', this.aliasData);

    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      WIPFREE = res;
      this.wipFree=WIPFREE;
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        PROPIEDADES = res;
        
        
        this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          WIPLIST=res;
          this.wipLista=WIPLIST;
          this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrdersMaqina?idMaquina='+ idMaquina)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            ORDENES = res;
            this.propiedades = PROPIEDADES;
            if (this.propiedades.isOn == true) {
              this.nombreEstado = 'Habilitado';
            } else {
              this.nombreEstado = 'Deshabilitado';
            }
            
            DATA =  {
              text: this.propiedades.description,
              number: 233423,
              name: this.nombreEstado,
              x: 5,
            };
            
            win=this.windowRef=this.windowService.open(WindowComponent, { title: this.propiedades.description});
          });
        });    
        });
      });
    });
  }
  // public selection = true;
  DataLoadBasic(idMaquina: number){
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina).subscribe((res: any) => {
      WIPFREE = res;
      this.wipFree=WIPFREE;
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina).subscribe((res: any) => {
        PROPIEDADES = res;
        this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina).subscribe((res: any) => {
          WIPLIST=res;
          this.wipLista=WIPLIST;
          this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerOrdersMaqina?idMaquina='+ idMaquina).subscribe((res: any) => {
            ORDENES = res;
            this.propiedades = PROPIEDADES;
            if (this.propiedades.isOn == true) {
              this.nombreEstado = 'Habilitado';
            } else {
              this.nombreEstado = 'Deshabilitado';
            }
            
            DATA =  {
              text: this.propiedades.description,
              number: 233423,
              name: this.nombreEstado,
              x: 5,
            };
            
            
            //this.windowService.open(WindowComponent, { title: this.propiedades.description});
          });
        });    
        });

    });
  }

  // onEdit($event: any) {
  //   console.log('edit: ', $event);
  // }

  onDeleteConfirm(event) {
    this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
      Swal.fire({
      title: 'Desea eliminar?',
      text: `¡Eliminará un campo en Alias!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      debugger
      if (result.value) {
    this.apiGetComp.PostJson(this.api.apiUrlNode + "/api/DeleteAliasById?Id=",event.data.IdAlias)
    // .pipe()
          .pipe(takeWhile(() => this.alive))
          .subscribe((res:any) => {
            
          });
          Swal.fire('¡Se Eliminó Exitosamente', 'success');
          event.confirm.resolve();
          this.source.refresh();
      }
    });
          this.source.refresh();   
          this.select = false;
          this.mostrar = false;
        }else {
          this.select=true;
          this.mostrar=true;
        }
      });
  }

  onCreateConfirm(event, idMaquina: number) {
    // console.log("Create Event In Console")
    
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;
    console.log('device', idMaquina);
    
    var respons = 
            {
              Alias: event.newData.Alias,
              IdDevice: this.aliasData.Id
            };  

    console.log('Respons', respons);

    this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/InsertAliasById', respons)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      this.aliasData=res;
      this.source.load(res);
      event.confirm.resolve();
      console.log('Create: ', this.aliasData);
    });
    event.confirm.resolve();
    // console.log('Se agregó',event.newData);

  }

  onSaveConfirm(event) {
    // console.log("Edit Event In Console")

    var respons = 
            {
              Alias: event.newData.Alias,
              IdAlias: event.newData.IdAlias
            };  
    
    this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/UpdateAliasById',  respons)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      this.aliasData=res;
      this.source.load(res);
      this.source.refresh();
      console.log('Edit: ', this.aliasData);
    });
    // event.confirm.resolve();
    // console.log('Se editó',event.newData);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

   
  openWindowForm(idMaquina?: number) {
    this.accessChecker.isGranted('edit', 'machine')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
        // this.DataLoad(idMaquina);
      
        this.DataLoad(idMaquina);
      }
      
    });
    
  }


  

  ObtenerListaDeviceType() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerDeviceTypeLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      DEVICESTYPE = res; 
     
      }); 

  }


  ObtenerListaColor() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerColorLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      COLORLISTA = res;
      
      });
      
  }

//   ngOnInit(): void {
//     this.apiget();
//   }
  
// apiget(){
//   console.log('Test Alias');
// }
  
  handleSuccessResponse() {

    this.toasterService.success(' Información actualizada con exito' );
    this.back();
  }
  back() {
    win.close();
    //this.router.navigate(['/pages/tables/OrderTable']);
  }
  EditPropiedades() {
    // console.log(this.propiedades.isOn);
    // console.log(this.propiedades.valor);
    // console.log("Estes es el type: ",this.propiedades.type);
    
    // console.log(this.propiedades.description);
    // console.log(Number(this.prioridadValor.nativeElement.value));
    
    

    PROPIEDADESACTUALIZAR =
    {
      id:IDMAQUINA,
      descripcionMaquina:this.nameMachineValor.nativeElement.value,
      type:this.propiedades.type, 
      valor:this.propiedades.valor,
      isOn:this.propiedades.isOn
      // prioridad:Number(this.prioridadValor.nativeElement.value)
    };

     
    const currentUserId = this.userStore.getUser().firstName;
  // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  var respons = 
  {
    user: currentUserId,
    message:"Modificó propiedades de la maquina "+ PROPIEDADESACTUALIZAR.descripcionMaquina 
};
  this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser', respons)
    .pipe(takeWhile(() => this.alive)) 
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
      });

    // this.colorMaquina.fillValor = 'red';
    // console.log(PROPIEDADESACTUALIZAR);

    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/ActualizarPropiedadesMaquina', PROPIEDADESACTUALIZAR)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any) => {
      this.messageService.sendMessage('MachineColor');
      this.handleSuccessResponse();
    }      
      );
  }

   public moveSelected(direction) {
    
     if (direction === 'right') {
       this.wipFree.forEach(item => {
        if (item.selected) {
          WIPTARGET =
          {
            idTarget:this.idMaquina,
            idWip:item.id,
          };
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/PutWipTarget', WIPTARGET)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            this.DataLoadBasic(this.idMaquina);  
          });
        
        }
      });
     } else {;
      this.wipLista.forEach(item => {
        if (item.selected) {
          WIPTARGET =
          {
            idTarget:this.idMaquina,
            idWip:item.id,
          };
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/DelWipTarget', WIPTARGET)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            this.DataLoadBasic(this.idMaquina);  
          });
        
        }
      });
  //     this.list1 = this.list1.filter(i => !i.selected);
     }
   }


  public toggleSelection(item:Wip) {
    
    this.wipFree.forEach(element => {
      element.selected=false;
    });
    this.wipLista.forEach(element => {
      element.selected=false;
    });
    item.selected = !item.selected;
  }
openWindow(contentTemplate, titleValue: string, textValue: string, numberValue: number, nameValue: string, value: number) {

    this.windowService.open(
      contentTemplate,
      {
        title: titleValue,
        context: {
          text: textValue,
          number: numberValue,
          name: nameValue,
          x: value,
        },
      },
    );
  }

  openWindow2(contentTemplate2, titleValue: string, orderValue: string, nameValue: string, descripcionValue: string, referenciaValue: string, orderLengthValue: number) {

    this.windowService.open(
      contentTemplate2,
      {
        title: titleValue,
        context: {
          orden: orderValue,
          nombre: nameValue,
          descripcion: descripcionValue,
          referencia: referenciaValue,
          orderLength: orderLengthValue,

        },
      },
    );
  }
  
  EditPackage(id:number,order:string,state:string, stateId:number, priority:number, cutLength:number, cutsCount:number, idDevice:number){
    ORDEN=
    {
      id:id, 
      order:order,
      state:state,
      stateId:stateId,
      priority:priority,
      cutLength:cutLength,
      cutsCount:cutsCount,
      idDevice:idDevice,
    };
    
    this.orderPopup.openWindowForm("Package: "+ order,ORDEN, this.idMaquina)
    
    
    
    
  }

  CrearArrume(){
    
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
  }
  this.alive = false;
  }
}
