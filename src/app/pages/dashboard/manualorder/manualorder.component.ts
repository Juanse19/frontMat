import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Injectable, TemplateRef, Input } from '@angular/core';
import { AnimationSettingsModel, ButtonPropsModel, DialogComponent, ResizeDirections } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { NbAccessChecker } from '@nebular/security'
import { BehaviorSubject, interval, Observable, of, Subject,Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { MessageService } from '../services/MessageService';
import { UserStore } from '../../../@core/stores/user.store';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, ToolbarItems, ToolbarService, 
  EditService, PageService, CommandColumnService, CommandModel  } from '@syncfusion/ej2-angular-grids';
import { ApiGetService } from '../WindowPopupComponent/apiGet.services';
import { SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {WindowComponent2 } from '../OrderPopup/orderPopup.component';
import { NbToastrService } from '@nebular/theme';
import { FormControl, FormGroup } from '@angular/forms';
import { OrmanualComponent } from '../ormanual/ormanual.component';
import Swal from 'sweetalert2';

  // Models
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
    express:boolean;
    idOrder: number;
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
  
  interface Pedidos {
    OfficeIDCTI: number,
    Pedido: number,
    Destino: string,
    IdTarget: number,
    EspesorLamina_Planeado: number,
    OrdenProgramacion: number,
    Estado: string,
    EstadoMaquina: null,
    LargoLamina_Planeado: number,
    AnchoLamina_Planeado: number,
    FechaRegistro: string,
    Tarjeta: string,
    CorrInvertida: boolean,
    IdOrderSic: number,
    ListaCorteSIC: number
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
  
  let PediProgramados: Pedidos;
  
  let PROPIEDADESACTUALIZAR: PropiedadesActualizar;
  {
  
  }

@Component({
  selector: 'ngx-manualorder',
  templateUrl: './manualorder.component.html',
  providers: [ ToolbarService, 
    EditService, 
    PageService,
    SortService, 
    CommandColumnService],
  styleUrls: ['./manualorder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class ManualorderComponent implements OnInit {


  public orderData: Ordenes [] = [] ;

  private alive = true;
  
  public showCloseIcon: Boolean = this.alive ;

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public toolbarOptions: ToolbarItems[];

  public toolbar: ToolbarItems[] | object;

  public toolbalopr: ToolbarItems[] | object;

  public commands: CommandModel[];

  public editSettings: Object;  

  public header: string;

  subscription: Subscription;

  intervalSubscriptionOrder: Subscription;

  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public target: string = '.control-section';

  public select = false;

  mostrar: Boolean;

  public orderForm: FormGroup;

  mySubscription: any;

  idMaquina=IDMAQUINA;

  aliasData = ALIAS;

  pedidosData = PediProgramados

  dataOrdes = ORDEN


  propiedades = PROPIEDADES;

  nombreEstado: string;
  toggleNgModel = true;
  public selec = false;
  public ocultar = false;
  public ocultarPedido = false;
  

  devicesType = DEVICESTYPE;
  deviceType = DEVICETYPE;

  colorLista = COLORLISTA;
  color = COLOR;

  wipLista = WIPLIST; 
  wipFree= WIPFREE;

  ordenesFiltro;
  data = DATA;
  dataOrden = ORDEN;

  public submitClicked: boolean = false;

  get Alias() { return this.orderForm.get('Alias')}

  constructor(
    public accessChecker: NbAccessChecker,
    private apiGetComp: ApiGetService,
    private orderPopup: WindowComponent2,
    private toasterService: NbToastrService,
    private messageService: MessageService,
    private userStore: UserStore,
    private http: HttpClient,
    private api: HttpService,
  ) 
  { 
    // if (IDMAQUINA === 48 ||  IDMAQUINA === 49 || IDMAQUINA === 51 ||  IDMAQUINA === 52) {
        
    //   this.ocultar = false;
    // } else {
    //   this.ocultar = true;
    // }

    // if (IDMAQUINA === 22 ||  IDMAQUINA === 39 || IDMAQUINA === 40 ||  IDMAQUINA === 41 || 
    //   IDMAQUINA === 43 ||  IDMAQUINA === 44 ||  IDMAQUINA === 45) {
    //   // debugger
    //   this.ocultarPedido = true;
    // } else {
    //   this.ocultarPedido = false;
    // }

    // if (IDMAQUINA === 36 ||  IDMAQUINA === 40) {
    //   this.selec = false;
    //   // this.DataLoad(idMaquina); 
    //   // console.log("Cambio de estado", this.selec);
    // }else {
    //   this.selec=true;
    // }
    
    this.subscription = this.messageService.onMessage()
    .pipe(takeWhile(() => this.alive))
    .subscribe(message => {
      if (message.text=="PackageUpdate") {
        // debugger
        //this.messages.push(message);
        this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ this.idMaquina)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          
          // ORDEN = res
          // this.dataOrdes = ORDEN
          this.orderData = res;
          // this.openData(this.idMaquina);
          // this.openOrder(this.idMaquina);
          console.log('Se ejecutó..!');
          

        });
      } 
    });
  }

  @ViewChild('device1') device1: DialogComponent;
  @ViewChild('ejDialogTX') ejDialogTX: DialogComponent;

  @ViewChild(WindowComponent2, { static: true }) public dial: WindowComponent2;

  @ViewChild(OrmanualComponent, { static: true }) public dia: OrmanualComponent;

  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate2', { static: true }) contentTemplate2: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChild('prioridadValor') prioridadValor: ElementRef;

  @ViewChild('nameMachine') nameMachineValor: ElementRef;

  @ViewChild('wips') eWips: ElementRef;

  @ViewChild('grid')
    public grid: GridComponent;

  // The Dialog shows within the target element.
  public targetElement: HTMLElement;
  
  public visible: Boolean = true;
  public hidden: Boolean = false;


  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };

// this.toolbar = ['Search'];
this.pageSettings = { pageSizes: true, pageSize: 5 };
this.filterOptions = {
type: 'Menu',
}
// this.toolbarOptions = ['Search'];
//  console.log('Info data ordenes');

this.toolbar = [
'Search',
//  {text: 'Delete', prefixIcon: 'fas fa-check'},
{ text: '', tooltipText: 'Eliminar todo', prefixIcon: 'e-icons e-delete', id: 'Click' }
//  { text: 'Crear Orden', tooltipText: 'Click', prefixIcon: 'fas fa-check-double', id: 'Click' }
];

this.toolbalopr = [
'Search'
];

this.commands = [
{ type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
// { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
// { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
// { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
];
 
      this.ObtenerListaDeviceType();
      this.ObtenerListaColor();

      

      this.orderForm = new FormGroup({
        Alias: new FormControl()
     });


  }

  created($event): void {
    document.getElementById(this.grid.element.id + "_searchbar").addEventListener('keyup', () => {
            this.grid.search((event.target as HTMLInputElement).value)
    });
}

createds($event): void {
  document.getElementById(this.grid.element.id + "_searchbars").addEventListener('keyup', () => {
          this.grid.search((event.target as HTMLInputElement).value)
  });
}


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
     
      ];
      
      public dlgBtnClick_2 = (): void => {
        this.device1.hide();  
      }

      public dlgButtons: ButtonPropsModel[] = [
        {click: this.EditPropiedades.bind(this), buttonModel: { content: 'Guardar', isPrimary: true } },
        // {click: this.dlgBtnClick_1.bind(this), buttonModel: { content: 'Guardar', isPrimary: true } }, 
        { click: this.dlgBtnClick_2.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
        
      ];

      public tabSelected(e: SelectEventArgs): void {
        
      }

      actionBegin(args) {
        if (args.requestType == 'beginEdit') {
          // debugger
          args.cancel = true;
          this.accessChecker.isGranted('edit', 'dialog')
            .pipe(takeWhile(() => this.alive))
            .subscribe((res: any) => { 
              if(res){ 
                args.cancel = true;
                this.orderPopup.openWindowForm("Package: "+ args.rowData.order,args.rowData, this.idMaquina)
          // this.dia.openWindowForm("Package: "+ args.rowData.order,args.rowData, this.idMaquina)
          
          
          this.select = false;
        }else {
          this.select=true;
        }
      });
            // alert('Custom Toolbar Click...');
        }
        
      }
      
      clickHandler(args: ClickEventArgs): void {
        // debugger
        if (args.item.id === 'Click') {
          // console.log('click: ', args);
          this.accessChecker.isGranted('edit', 'propi')
            .pipe(takeWhile(() => this.alive))
            .subscribe((res: any) => { 
              if(res){ 
          // this.orderPopup.openWindowForm("Package: "+ args,null, this.idMaquina)
          this.reconocer(this.idMaquina);
      
          args.cancel = true;
          this.select = false;
        }else {
          this.select=true;
        }
      });
            // alert('Custom Toolbar Click...');
        }
      }

      loadUser(id?) {
        debugger
          this.orderForm.setValue({
            Alias: ALIAS.Alias ? ALIAS.Alias : '',
          });
        }

      actionBeginss(args) {
        if (args.requestType === 'beginEdit') {
          this.submitClicked = true;
          args.cancel = true;
          this.accessChecker.isGranted('edit', 'ordertable')
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            if(res){
              // console.log('test', args.rowData.Id);
              args.cancel = true;
              this.ejDialogTX.show();
              this.orderForm.setValue({
                Alias: args.rowData.Alias ? args.rowData.Alias : '',
              });
              
              // this.loadUser(args.rowData.Id)
            // console.log('Data',args.rowData.Id);
            // console.log('test', this.createFormGroup(args.rowData).value)
            // console.log('Prueba', this.orderForm.setValue = this.createFormGroup(args.rowData).value);
            // this.dataConf = args.rowData;
            // console.log('info', this.dataConf);
              
              this.select = false;
              this.mostrar = false;
            }else {
              this.select=true;
              this.mostrar=true;
              args.cancel = true;
            }
          });
        }
    
      }

      Secu(){
        if (IDMAQUINA === 48 ||  IDMAQUINA === 49 || IDMAQUINA === 51 ||  IDMAQUINA === 52) {
        
          this.ocultar = false;
        } else {
          this.ocultar = true;
        }
    
        if (IDMAQUINA === 22 ||  IDMAQUINA === 39 || IDMAQUINA === 40 ||  IDMAQUINA === 41 || 
          IDMAQUINA === 43 ||  IDMAQUINA === 44 ||  IDMAQUINA === 45) {
          // debugger
          this.ocultarPedido = true;
        } else {
          this.ocultarPedido = false;
        }

        if (IDMAQUINA === 36 ||  IDMAQUINA === 40) {
          this.selec = false;
        }else {
          this.selec=true;
        }
      }

      // public OrdCharge(idMaquina: number){

      //   if (this.intervalSubscriptionOrder) {
      //     this.intervalSubscriptionOrder.unsubscribe();
      //   }
        
      //   this.intervalSubscriptionOrder = interval(1500)
      //   .pipe(
      //     takeWhile(() => this.alive),
      //     switchMap(() => this.http.get(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ idMaquina)),
      //   )
      //   .subscribe((res: any) => {

      //     if (this.orderData == undefined) {
      //       // console.log('stop 1'); 
      //       this.alive = false; 
      //     } else if (this.orderData == null) {
      //       // console.log('stop 2'); 
      //       this.alive = false; 
      //     } else {
      //       this.orderData = res;
      //       this.alive = true;
      //     // console.log('Data', this.orderData);
      //     }

          
      //   });
      // }

      reconocer(idMaquina: number) {

        this.accessChecker.isGranted('edit', 'propi')
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          if(res){ 
          Swal.fire({
          title: 'Desea Eliminar todos los Arrumes?',
          text: `¡Eliminará todos los Arrumes del Wip!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Sí, Eliminar!'
        }).then(result => {
          // debugger 
          if (result.value) {
            // debugger
      const currentUserId = this.userStore.getUser().id;
      const currentUser = this.userStore.getUser().firstName;
      // console.log("este es el usuario: ",this.userStore.getUser().firstName);
      var respons = 
      {
      user: currentUser,
      message:"Eliminó todos los arrumes del wip " + this.propiedades.description,
      users: currentUserId,  
      };
      this.apiGetComp.PostJson(this.api.apiUrlNode + '/postSaveAlarmUser', respons)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
          //  console.log("Envió: ", res);
        });
        this.idMaquina=idMaquina;
        IDMAQUINA=idMaquina;
          
              var respon = 
                {
                  UserIdAcknow: currentUserId
                };
      
          this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/deleteaWip?IdMaquina='+ idMaquina)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            this.messageService.sendMessage('PackageUpdate');
          });
       
             Swal.fire('¡Se Eliminaron Exitosamente', 'success');
             
         }
       });
               
             this.select = false;
             this.mostrar = false;
           }else {
             this.select=true;
             this.mostrar=true;
           }
         });
         
      }

  openData(idMaquina: number){
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina; 

    // this.alive = true;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ idMaquina)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            
            if (res == undefined) {
              // console.log('no hay data');
              this.device1.show(); 
              this.orderData = res[0];
              
              // console.log('undefined', this.orderData);
            } else {
              // console.log('Si hay');
              // this.alive = true;
              // console.log('Ordenes en cola 1');
              this.orderData = res;
              // this.OrdCharge(idMaquina)
              if (this.showCloseIcon == false) {
                // this.alive = false; 
                console.log('stop 4');
              }
              
            }
            
      });
  }

  openOrder(idMaquina: number){
    this.accessChecker.isGranted('edit', 'dialog')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => { 
      if(res){
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina; 

    // this.alive = true;
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ idMaquina)
          // .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            
            if (res == undefined) {
              // console.log('no hay data');
              this.device1.show(); 
              this.orderData = res;
              
              // console.log('undefined', this.orderData);
            } else {
              // console.log('Si hay');
              // this.alive = true;
              // console.log('Ordenes en cola 1');
              this.orderData = res;
              // this.OrdCharge(idMaquina)
              // if (this.showCloseIcon == false) {
              //   this.alive = false; 
              //   console.log('stop 4');
              // }
              
            }
            
      });

      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetAliasById?Id='+ idMaquina)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        ALIAS = res;
        this.aliasData=ALIAS;

      });

      //Propiedad
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/PedidosProgramados?IdMaquina='+ idMaquina)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (res[0] == undefined) {
          // console.log('no hay data');
        } else {
        PediProgramados = res;
        this.pedidosData=PediProgramados;
        // console.log('pedidosData', this.pedidosData);
        }
      });

      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      WIPFREE = res;
      this.wipFree=WIPFREE;
      // console.log('wipFree', this.wipFree);
    });

    // this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina

    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerPropiedades?IdMaquina='+ idMaquina)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        PROPIEDADES = res[0];
        this.propiedades = PROPIEDADES;
        // console.log('Propiedades', this.propiedades);
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
        // this.data = DATA
        // console.log('test', this.data = DATA);
        // console.log('data', this.data.text);
        // console.log('data', this.data.name);
        this.header = this.propiedades.description;
        
      });

      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          WIPLIST=res;
          this.wipLista=WIPLIST;
          // console.log('wipLista', this.wipLista);
          
           
           
        });
        this.device1.show(); 
        this.Secu();
        
        this.select = false;
        this.mostrar = false;
      }else {
        this.select=true;
        this.mostrar=true;
      }
    });

  }

  DataLoadBasic(idMaquina: number){ 
    this.idMaquina=idMaquina;
    IDMAQUINA=idMaquina;
    // this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipFree?idTarget='+ idMaquina).subscribe((res: any) => {
    //   WIPFREE = res;
    //   this.wipFree=WIPFREE;
    // });

    // this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerPropiedadesMaquina?idMaquina='+ idMaquina).subscribe((res: any) => {
    //   PROPIEDADES = res;
    // });

    // this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetWipForTarget?idTarget='+ idMaquina).subscribe((res: any) => {
    //   WIPLIST=res;
    //   this.wipLista=WIPLIST;
    // });

    // this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ idMaquina).subscribe((res: any) => {
    //   ORDENES = res;
      
    //   this.propiedades = PROPIEDADES;
    //   if (this.propiedades.isOn == true) {
    //     this.nombreEstado = 'Habilitado';
    //   } else {
    //     this.nombreEstado = 'Deshabilitado';
    //   }
      
    //   DATA =  {
    //     text: this.propiedades.description,
    //     number: 233423,
    //     name: this.nombreEstado,
    //     x: 5,
    //   };
      
    // });
    // this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/ObtenerOrderMaquina?IdMaquina='+ idMaquina)
    //       .pipe(takeWhile(() => this.alive))
    //       .subscribe((res: any) => {
            
    //         if (res[0] == undefined) {
    //           // console.log('no hay data arriba');
    //         } else {
    //           // console.log('Si hay');
              
    //           // console.log('Ordenes en cola 1');
    //           this.orderData = res;
    //         ORDENES = res;
    //         ORDEN = res;
    //         this.dataOrdes = ORDEN
    //         console.log('Data', this.dataOrdes);
    //           // console.log('above', this.orderOut1  );
    //         }
            
     

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
        .pipe(takeWhile(() => this.alive)).subscribe((res: any) => {
          WIPLIST=res;
          this.wipLista=WIPLIST;
          
            
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
            this.data = DATA
            // console.log('test1', this.data = DATA);
            // console.log('data1', this.data.text);
            // console.log('data1', this.data.name);
            
          });
           
        });
      });
    // });

  }

  ObtenerListaDeviceType() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerDeviceTypeLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      DEVICESTYPE = res;
      this.devicesType = DEVICESTYPE
      DEVICETYPE = res
      this.deviceType = DEVICETYPE
      // console.log('devicesType', this.deviceType);
      
      }); 

  }


  ObtenerListaColor() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/ObtenerColorLista')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      COLORLISTA = res;
      this.colorLista = COLORLISTA
      });
      
  }

  handleSuccessResponse() {

    this.toasterService.success(' Información actualizada con exito' );
    this.device1.hide();
  }
  
  EditPropiedades() {
    // console.log(this.propiedades.isOn);
    // console.log(this.propiedades.valor);
    // console.log("Estes es el type: ",this.propiedades.type);
    
    // console.log(this.propiedades.description);
    // console.log(Number(this.prioridadValor.nativeElement.value));
    // debugger

    this.accessChecker.isGranted('edit', 'propi')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => { 
      if(res){ 

    if (this.nameMachineValor == undefined ) {
      // console.log('No Hay Data..!');
      this.device1.hide();
    } else if(this.propiedades == undefined){
      console.log('O');
    } 
    else {
      // debugger
    
    
    PROPIEDADESACTUALIZAR =
    {
      id:IDMAQUINA,
      descripcionMaquina:this.nameMachineValor?.nativeElement.value,
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
    // .pipe(takeWhile(() => this.alive)) 
    .subscribe((res: any) => {
        //  console.log("Envió: ", res);
         
      });

    // this.colorMaquina.fillValor = 'red';
    // console.log(PROPIEDADESACTUALIZAR);

    this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/ActualizarPropiedadesMaquina', PROPIEDADESACTUALIZAR)
    // .pipe(takeWhile(() => this.alive))
    .subscribe((res:any) => {
      this.messageService.sendMessage('MachineColor');
      this.handleSuccessResponse();
    }      
      );
      // this.back();
    }

              this.select = false;
              this.mostrar = false;
            }else {
              this.select=true;
              this.mostrar=true;
            }
          });

  }


   public moveSelected(direction) {
    this.accessChecker.isGranted('edit', 'editOrd')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => { 
      if(res){
     if (direction === 'right') {
       this.wipFree.forEach(item => {
        if (item.selected) {
          WIPTARGET =
          {
            idTarget:this.idMaquina,
            idWip:item.id,
          }; 
          this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/PutWipTarget', WIPTARGET)
          // .pipe(takeWhile(() => this.alive))
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
              
              this.select = false;
              this.mostrar = false;
            }else {
              this.select=true;
              this.mostrar=true;
              this.ocultar = true;
            }
          });
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

  EditPackage(id:number,idOrder: number,order:string,state:string, stateId:number, priority:number, cutLength:number, cutsCount:number, express:boolean, idDevice:number){
    this.accessChecker.isGranted('edit', 'dialog')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => { 
      if(res){ 
    ORDEN=
    {
      id:id, 
      order:order,
      state:state,
      stateId:stateId,
      priority:priority,
      cutLength:cutLength,
      cutsCount:cutsCount,
      express:express,
      idDevice:idDevice,
      idOrder:idOrder,
    };
    
    this.orderPopup.openWindowForm("Package: "+ order,ORDEN, this.idMaquina)
    
    this.select = false;
              this.mostrar = false;
            }else {
              this.select=true;
              this.mostrar=true;
            }
          });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
