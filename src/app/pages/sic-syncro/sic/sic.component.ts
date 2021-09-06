import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Sic } from '../../../pages/dashboard/_interfaces/MatBox.model';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { GridComponent, PageSettingsModel, FilterSettingsModel, ToolbarItems, ToolbarService, EditService, PageService, CommandColumnService, CommandModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'ngx-sic',
  templateUrl: './sic.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./sic.component.scss']
})
export class SicComponent implements OnInit {

  public select = false;
  private alive = true;
  mostrar: Boolean;

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  
  /** Table de infromación Sic */
  settings5 = {
    actions: {
      add: false,
      edit: false,
    },
    
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number', 
        filter: false,
        hide: true,

      },
      listaCorteSIC: {
        title: 'ListaCorte',
        type: 'string',
        filter: false,
      },
      listaCorrtrim: {
        title: 'ListaTrim',
        type: 'number',
        filter: false,
      },
      orden: {
        title: 'Orden',
        type: 'number',
        filter: false,
      },
      pedido: {
        title: 'Pedido',
        type: 'number',
        filter: false,
      },
      tarjeta: {
        title: 'Tarjeta',
        type: 'string',
        filter: false,
      },
      longitudOrden_Planeado: {
        title: 'LogitudOrden',
        type: 'number',
        filter: false,
      },
      numeroCortes: {
        title: 'NumeroCorte',
        type: 'number',
        filter: false,
      },
      largoLamina_Planeado: {
        title: 'LargoLamina',
        type: 'number',
        filter: false,
      },
      anchoLamina_Planeado: {
        title: 'AnchoLamina',
        type: 'number',
        filter: false,
      },
      espesorLamina_Planeado: {
        title: 'EspesorLamina',
        type: 'number',
        filter: false,
      },
      origen: {
        title: 'Origen',
        type: 'string',
        filter: false,
      },
      destino: {
        title: 'Destino',
        type: 'string',
        filter: false,
      },
      hojasParaHacer_Planeado: {
        title: 'HojasParaHacer',
        type: 'number',
        filter: false,
      },
      estado: {
        title: 'Estado',
        type: 'string',
        filter: false,
      },
    },
  };

  source5: LocalDataSource = new LocalDataSource();
  public ReportSic: Sic[];

  constructor( 
    public accessChecker: NbAccessChecker,
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private api: HttpService
    
    ) { 
      
      this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
        this.select = false;
        this.mostrar = false;
      }else {
        this.select=true;
        this.mostrar=true;
      }
    });
    }

  ngOnInit(): void {

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Normal',
      allowEditOnDblClick: false
    };

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
    type: 'Menu',
    }

    this.ChargeReportSic();

    this.toolbar = [
      //  {text: 'Delete', prefixIcon: 'fas fa-check'},
     { text: 'Eliminar todo', tooltipText: 'Click', prefixIcon: 'fas fa-check-double', id: 'Click' }];

     this.commands = [
      // { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];

  } 

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      // console.log('click: ', args);
      // debugger
      this.eliminaTodos();
        // alert('Custom Toolbar Click...');
    }
  }

  ChargeReportSic() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportSic = res;
      this.source5.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportSic = res;
        this.source5.load(res);
      });
    });

  }

  actionBegin(args) {
    if (( args.requestType === 'delete')) {
      // const Id = 'Id';
      this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
      Swal.fire({
      title: 'Desea eliminar?',
      text: `¡Eliminará un campo en Sic!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      // debugger
      if (result.value) {
        var respons = 
            {
            id: args.data[0].id
            };
    this.apiGetComp.PostJson(this.api.apiUrlMatbox + "/Orders/DeleteOrderSic?id="+ args.data[0].id, args.data[0].id)
    // .pipe()
          .pipe(takeWhile(() => this.alive))
          .subscribe((res:any) => {
            this.ChargeReportSic();
          });
          Swal.fire('¡Se Eliminó Exitosamente', 'success');
          // event.confirm.resolve();
          this.source5.refresh();
      }
    });
          // this.source5.refresh();   
          this.select = false;
          this.mostrar = false;
          args.cancel = true;
        }else {
          this.select=true;
          this.mostrar=true;
          args.cancel = true;
        }
      });
    }
  
  }

  onDeleteConfirm(event) {
    this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
      Swal.fire({
      title: 'Desea eliminar?',
      text: `¡Eliminará un campo en Sic!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      if (result.value) {
    this.apiGetComp.PostJson(this.api.apiUrlMatbox + "/Orders/DeleteOrderSic?id="+event.data.id,event.data.id)
    // .pipe()
          .pipe(takeWhile(() => this.alive))
          .subscribe((res:any) => {
            
          });
          Swal.fire('¡Se Eliminó Exitosamente', 'success');
          event.confirm.resolve();
          this.source5.refresh();
      }
    });
          this.source5.refresh();   
          this.select = false;
          this.mostrar = false;
        }else {
          this.select=true;
          this.mostrar=true;
        }
      });
  
  }

  eliminaTodos(){
    Swal.fire({
      title: 'Desea eliminar?',
      text: `¡Eliminará toda la tabla Sic!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      if (result.value) {
        this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/DeleteOrderSicAll',"")
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          
        });
        Swal.fire('¡Se Eliminó Exitosamente', 'success');
        this.select=true;
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
