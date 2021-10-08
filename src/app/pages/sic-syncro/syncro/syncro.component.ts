import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Syncro } from '../../../pages/dashboard/_interfaces/MatBox.model';
import { NbAccessChecker } from '@nebular/security';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel, ToolbarItems, 
  EditService, PageService, SortService, CommandColumnService, CommandModel, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'ngx-syncro',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  templateUrl: './syncro.component.html',
  styleUrls: ['./syncro.component.scss']
})
export class SyncroComponent implements OnInit {

  public select = false;
  private alive = true;
  mostrar: Boolean;

  public pageSettings: PageSettingsModel;
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public initialSort: Object;

  /** Table de información Syncro */
  settings6 = {
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
      officeID: {
        title: 'officeID',
        type: 'string',
        filter: false,
      },
      createDate: {
        title: 'CreateDate',
        type: 'string',
        filter: false,
      },
      updateDate: {
        title: 'UpdateDate',
        type: 'string',
        filter: false,
      },
      position: {
        title: 'Posición',
        type: 'string',
        filter: false,
      },
      setupID: {
        title: 'ConfiguraciónId',
        type: 'string',
        filter: false,
      },
      modID: {
        title: 'ModId',
        type: 'string',
        filter: false,
      },
      webWidth: {
        title: 'AnchoWeb',
        type: 'string',
        filter: false,
      },
      trimType: {
        title: 'Tipoajuste',
        type: 'string',
        filter: false,
      },
      valid: {
        title: 'Válido',
        type: 'string',
        filter: false,
      },
      scoreGap: {
        title: 'PuntajeBrecha',
        type: 'string',
        filter: false,
      },
      qualityID: {
        title: 'IDcalidad',
        type: 'string',
        filter: false,
      },
      trim: {
        title: 'Prueba',
        type: 'string',
        filter: false,
      },
      slitsTandem: {
        title: 'RanurasTándem',
        type: 'string',
        filter: false,
      },
      scoresTandem: {
        title: 'PuntajesTándem',
        type: 'string',
        filter: false,
      },
      shaftMask: {
        title: 'EjeMascara',
        type: 'string',
        filter: false,
      },
      constantSystem: {
        title: 'SistemaConstante',
        type: 'string',
        filter: false,
      },
      knifeOnly: {
        title: 'knifeOnly',
        type: 'string',
        filter: false,
      },
      noChange_STK_0: {
        title: 'SinCambiosSTK0',
        type: 'string',
        filter: false,
      },
      noChange_STK_1: {
        title: 'SinCambiosSTK1',
        type: 'string',
        filter: false,
      },
      noChange_STK_2: {
        title: 'SinCambiosSTK2',
        type: 'string',
        filter: false,
      },
      cutToMark0: {
        title: 'CortarMarca0',
        type: 'string',
        filter: false,
      },
      cutToMark1: {
        title: 'CortarMarca1',
        type: 'string',
        filter: false,
      },
      cutToMark2: {
        title: 'CortarMarca2',
        type: 'string',
        filter: false,
      },
      orderNumber0: {
        title: 'NumeroOrden0',
        type: 'string',
        filter: false,
      },
      delivery0: {
        title: 'entrega0',
        type: 'string',
        filter: false,
      },
      customerName0: {
        title: 'NombreCliente0',
        type: 'string',
        filter: false,
      },
      sheetWidth0: {
        title: 'AnchoHoja0',
        type: 'string',
        filter: false,
      },
      outs0: {
        title: 'Salidas0',
        type: 'string',
        filter: false,
      },
      scoreMeasures0: {
        title: 'Medidaspuntuación0',
        type: 'string',
        filter: false,
      },
      scoreType0: {
        title: 'TipoPuntaje0',
        type: 'string',
        filter: false,
      },
      positType0: {
        title: 'PostularTipo0',
        type: 'string',
        filter: false,
      },
      teleTwinOffset0: {
        title: 'TeleTwinDesplazamiento0',
        type: 'string',
        filter: false,
      },
      scoreGap0: {
        title: 'PuntuaciónGap0',
        type: 'string',
        filter: false,
      },
      levelName0: {
        title: 'NivelNombre0',
        type: 'string',
        filter: false,
      },
      sheetLength0: {
        title: 'Longitudhoja0',
        type: 'string',
        filter: false,
      },
      segmentSheetCount0: {
        title: 'RecuentoHojasSegmento0',
        type: 'string',
        filter: false,
      },
      sheetsPerStack0: {
        title: 'HojasporPila0',
        type: 'string',
        filter: false,
      },
      stacksPerPallet0: {
        title: 'PilasPorPalé0',
        type: 'string',
        filter: false,
      },
      sending0: {
        title: 'Enviando0',
        type: 'string',
        filter: false,
      },
      orderNumber1: {
        title: 'NumeroOrden1',
        type: 'string',
        filter: false,
      },
      delivery1: {
        title: 'entrega1',
        type: 'string',
        filter: false,
      },
      customerName1: {
        title: 'NombreCliente1',
        type: 'string',
        filter: false,
      },
      sheetWidth1: {
        title: 'AnchoHoja1',
        type: 'string',
        filter: false,
      },
      outs1: {
        title: 'Salidas1',
        type: 'string',
        filter: false,
      },
      scoreMeasures1: {
        title: 'Medidaspuntuación1',
        type: 'string',
        filter: false,
      },
      scoreType1: {
        title: 'TipoPuntaje1',
        type: 'string',
        filter: false,
      },
      positType1: {
        title: 'PostularTipo1',
        type: 'string',
        filter: false,
      },
      teleTwinOffset1: {
        title: 'TeleTwinDesplazamiento1',
        type: 'string',
        filter: false,
      },
      scoreGap1: {
        title: 'PuntuaciónGap1',
        type: 'string',
        filter: false,
      },
      levelName1: {
        title: 'NivelNombre1',
        type: 'string',
        filter: false,
      },
      sheetLength1: {
        title: 'Longitudhoja1',
        type: 'string',
        filter: false,
      },
      segmentSheetCount1: {
        title: 'RecuentoHojasSegmento1',
        type: 'string',
        filter: false,
      },
      sheetsPerStack1: {
        title: 'HojasporPila1',
        type: 'string',
        filter: false,
      },
      stacksPerPallet1: {
        title: 'PilasPorPalé1',
        type: 'string',
        filter: false,
      },
      sending1: {
        title: 'Enviando1',
        type: 'string',
        filter: false,
      },
      orderNumber2: {
        title: 'NumeroOrden2',
        type: 'string',
        filter: false,
      },
      delivery2: {
        title: 'entrega2',
        type: 'string',
        filter: false,
      },
      customerName2: {
        title: 'NombreCliente2',
        type: 'string',
        filter: false,
      },
      sheetWidth2: {
        title: 'AnchoHoja2',
        type: 'string',
        filter: false,
      },
      outs2: {
        title: 'Salidas2',
        type: 'string',
        filter: false,
      },
      scoreMeasures2: {
        title: 'Medidaspuntuación2',
        type: 'string',
        filter: false,
      },
      scoreType2: {
        title: 'TipoPuntaje2',
        type: 'string',
        filter: false,
      },
      positType2: {
        title: 'PostularTipo2',
        type: 'string',
        filter: false,
      },
      teleTwinOffset2: {
        title: 'TeleTwinDesplazamiento2',
        type: 'string',
        filter: false,
      },
      scoreGap2: {
        title: 'PuntuaciónGap2',
        type: 'string',
        filter: false,
      },
      levelName2: {
        title: 'NivelNombre2',
        type: 'string',
        filter: false,
      },
      sheetLength2: {
        title: 'Longitudhoja2',
        type: 'string',
        filter: false,
      },
      segmentSheetCount2: {
        title: 'RecuentoHojasSegmento2',
        type: 'string',
        filter: false,
      },
      sheetsPerStack2: {
        title: 'HojasporPila2',
        type: 'string',
        filter: false,
      },
      stacksPerPallet2: {
        title: 'PilasPorPalé2',
        type: 'string',
        filter: false,
      },
      sending2: {
        title: 'Enviando2',
        type: 'string',
        filter: false,
      },
      // plungedSlitMask: {
      //   title: 'MáscaraHendidura',
      //   type: 'string',
      //   filter: false,
      // },
      // sepSlitMask: {
      //   title: 'MáscaraSepHendidura',
      //   type: 'string',
      //   filter: false,
      // },
      // slitPosition: {
      //   title: 'PosiciónHendidura',
      //   type: 'string',
      //   filter: false,
      // },
      // startScorer: {
      //   title: 'AnotadorInicio',
      //   type: 'string',
      //   filter: false,
      // },
      // scoreCount: {
      //   title: 'CuentaPuntuación',
      //   type: 'string',
      //   filter: false,
      // },
      // supportScore: {
      //   title: 'PuntajeApoyo',
      //   type: 'string',
      //   filter: false,
      // },
      // scorePosition: {
      //   title: 'PosiciónPuntuación',
      //   type: 'string',
      //   filter: false,
      // },
      // _x0032_LevelWebDirMask: {
      //   title: 'MáscaraDirecciónWebx0032',
      //   type: 'string',
      //   filter: false,
      // },
      // _x0033_LevelWebDirMask: {
      //   title: 'MáscaraDirecciónWebx0033',
      //   type: 'string',
      //   filter: false,
      // },
      // rcsSectorMask: {
      //   title: 'rcsSectorMask',
      //   type: 'string',
      //   filter: false,
      // },
      // tearTapePosition: {
      //   title: 'tearTapePosition',
      //   type: 'string',
      //   filter: false,
      // },
      // tearTapeCount: {
      //   title: 'tearTapeCount',
      //   type: 'string',
      //   filter: false,
      // },
      // cutToPattern0: {
      //   title: 'cutToPattern0',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint0_1: {
      //   title: 'dataToPrint0_1',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint0_2: {
      //   title: 'dataToPrint0_2',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint0_3: {
      //   title: 'dataToPrint0_3',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint0_4: {
      //   title: 'dataToPrint0_4',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerContStack0: {
      //   title: 'stackerContStack0',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerPallet0: {
      //   title: 'stackerPallet0',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerNote0: {
      //   title: 'stackerNote0',
      //   type: 'string',
      //   filter: false,
      // },
      // custAddress0: {
      //   title: 'custAddress0',
      //   type: 'string',
      //   filter: false,
      // },
      // mthCode0: {
      //   title: 'mthCode0',
      //   type: 'string',
      //   filter: false,
      // },
      // mthNextMachine0: {
      //   title: 'mthNextMachine0',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPalletLayout0: {
      //   title: 'numberOfPalletLayout0',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPalletCopy0: {
      //   title: 'amountOfPalletCopy0',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPastOrderLayout0: {
      //   title: 'numberOfPastOrderLayout0',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPastOrderCopy0: {
      //   title: 'amountOfPastOrderCopy0',
      //   type: 'string',
      //   filter: false,
      // },
      // prePrint0: {
      //   title: 'prePrint0',
      //   type: 'string',
      //   filter: false,
      // },
      // dischargeSide0: {
      //   title: 'dischargeSide0',
      //   type: 'string',
      //   filter: false,
      // },
      // balance0: {
      //   title: 'balance0',
      //   type: 'string',
      //   filter: false,
      // },
      // stackOrBundle0: {
      //   title: 'stackOrBundle0',
      //   type: 'string',
      //   filter: false,
      // },
      // cutToPattern1: {
      //   title: 'cutToPattern1',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint1_1: {
      //   title: 'dataToPrint1_1',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint1_2: {
      //   title: 'dataToPrint1_2',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint1_3: {
      //   title: 'dataToPrint1_3',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint1_4: {
      //   title: 'dataToPrint1_4',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerContStack1: {
      //   title: 'stackerContStack1',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerPallet1: {
      //   title: 'stackerPallet1',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerNote1: {
      //   title: 'stackerNote1',
      //   type: 'string',
      //   filter: false,
      // },
      // custAddress1: {
      //   title: 'custAddress1',
      //   type: 'string',
      //   filter: false,
      // },
      // mthCode1: {
      //   title: 'mthCode1',
      //   type: 'string',
      //   filter: false,
      // },
      // mthNextMachine1: {
      //   title: 'mthNextMachine1',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPalletLayout1: {
      //   title: 'numberOfPalletLayout1',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPalletCopy1: {
      //   title: 'amountOfPalletCopy1',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPastOrderLayout1: {
      //   title: 'numberOfPastOrderLayout1',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPastOrderCopy1: {
      //   title: 'amountOfPastOrderCopy1',
      //   type: 'string',
      //   filter: false,
      // },
      // prePrint1: {
      //   title: 'prePrint1',
      //   type: 'string',
      //   filter: false,
      // },
      // dischargeSide1: {
      //   title: 'dischargeSide1',
      //   type: 'string',
      //   filter: false,
      // },
      // balance1: {
      //   title: 'balance1',
      //   type: 'string',
      //   filter: false,
      // },
      // stackOrBundle1: {
      //   title: 'stackOrBundle1',
      //   type: 'string',
      //   filter: false,
      // },
      // cutToPattern2: {
      //   title: 'cutToPattern2',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint2_1: {
      //   title: 'dataToPrint2_1',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint2_2: {
      //   title: 'dataToPrint2_2',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint2_3: {
      //   title: 'dataToPrint2_3',
      //   type: 'string',
      //   filter: false,
      // },
      // dataToPrint2_4: {
      //   title: 'dataToPrint2_4',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerContStack2: {
      //   title: 'stackerContStack2',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerPallet2: {
      //   title: 'stackerPallet2',
      //   type: 'string',
      //   filter: false,
      // },
      // stackerNote2: {
      //   title: 'stackerNote2',
      //   type: 'string',
      //   filter: false,
      // },
      // custAddress2: {
      //   title: 'custAddress2',
      //   type: 'string',
      //   filter: false,
      // },
      // mthCode2: {
      //   title: 'mthCode2',
      //   type: 'string',
      //   filter: false,
      // },
      // mthNextMachine2: {
      //   title: 'mthNextMachine2',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPalletLayout2: {
      //   title: 'numberOfPalletLayout2',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPalletCopy2: {
      //   title: 'amountOfPalletCopy2',
      //   type: 'string',
      //   filter: false,
      // },
      // numberOfPastOrderLayout2: {
      //   title: 'numberOfPastOrderLayout2',
      //   type: 'string',
      //   filter: false,
      // },
      // amountOfPastOrderCopy2: {
      //   title: 'amountOfPastOrderCopy2',
      //   type: 'string',
      //   filter: false,
      // },
      // prePrint2: {
      //   title: 'prePrint2',
      //   type: 'string',
      //   filter: false,
      // },
      // dischargeSide2: {
      //   title: 'dischargeSide2',
      //   type: 'string',
      //   filter: false,
      // },
      // balance2: {
      //   title: 'balance2',
      //   type: 'string',
      //   filter: false,
      // },
      // stackOrBundle2: {
      //   title: 'stackOrBundle2',
      //   type: 'string',
      //   filter: false,
      // },
      
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public ReportSyncro: Syncro[];

  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService
  ) {
      
      this.alive;
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

    this.ChargeReportSyncro();

    this.toolbar = [
      //  {text: 'Delete', prefixIcon: 'fas fa-check'},
     { text: 'Eliminar todo', tooltipText: 'Click', prefixIcon: 'e-icons e-delete', id: 'Click' }];

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
      this.eliminarTodos();
        // alert('Custom Toolbar Click...');
    }
  }

  ChargeReportSyncro() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetOrderSyncro')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportSyncro = res;
      if(res == null){
        return null;
     }
      this.source.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetOrderSyncro')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportSyncro = res;
        if(res == null){
          console.log("No hay data", res);
          return null;
       }
        this.source.load(res);
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
      text: `¡Eliminará un campo en Syncro!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Eliminar!'
    }).then(result => {
      if (result.value) {
    this.apiGetComp.PostJson(this.api.apiUrlMatbox + "/Orders/DeleteOrderSyncro?id="+ args.data[0].id, args.data[0].id)
    // .pipe()
          .pipe(takeWhile(() => this.alive))
          .subscribe((res:any) => {
            // if (res) {
            //   this.toastrService.success('', 'Item deleted!');
            //   this.source5.refresh(); 
            // } else {
            //   this.toastrService.danger('', 'Algo salio mal.');
            // }
            this.ChargeReportSyncro();
          });
          Swal.fire('¡Se Eliminó Exitosamente', 'success');
          // event.confirm.resolve();
          this.source.refresh();
      }
    });
            this.source.refresh();
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
    text: `¡Eliminará un campo en Syncro!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, Eliminar!'
  }).then(result => {
    if (result.value) {
  this.apiGetComp.PostJson(this.api.apiUrlMatbox + "/Orders/DeleteOrderSyncro?id="+event.data.id,event.data.id)
  // .pipe()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res:any) => {
          // if (res) {
          //   this.toastrService.success('', 'Item deleted!');
          //   this.source5.refresh(); 
          // } else {
          //   this.toastrService.danger('', 'Algo salio mal.');
          // }
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

eliminarTodos(){
  Swal.fire({
    title: 'Desea eliminar?',
    text: `¡Eliminará toda la tabla Syncro!`,
    icon: 'warning',
    showCancelButton: true,
    timer: 3000,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, Eliminar!'
  }).then(result => {
    if (result.value) {
      this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Orders/DeleteOrderSyncroAll',"")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.ChargeReportSyncro();
        if(res == null){
          return null;
       } 
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
