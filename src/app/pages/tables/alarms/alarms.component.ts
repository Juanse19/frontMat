import { Component, OnDestroy, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { HttpClient } from '@angular/common/http';
import {
  GridComponent, PageSettingsModel, FilterSettingsModel, CommandClickEventArgs,
  EditService, CommandColumnService, CommandModel, ToolbarService, PageService,
  ToolbarItems,
  RowSelectEventArgs
} from '@syncfusion/ej2-angular-grids';
import { UserStore } from '../../../@core/stores/user.store';
import { Dialog, Tooltip } from '@syncfusion/ej2-popups';
import { Browser } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import Swal from 'sweetalert2';
import { MessageService } from '../../dashboard/services/MessageService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Alarmas {
  Id: number;
  Message: string;
  Level: string;
  Exception: string;
  UserId: string;
  TimeStamp: string;
  ETD: string;
  UserIdAcknow: string;
  IdDevice: string;
}

let ALARMAS: Alarmas[] = [


];

interface alarmLevel {
  Id: number;
  Level: string;
  nombre: string;
}

let GANTTD: alarmLevel;

@Component({
  selector: 'ngx-alarms',
  templateUrl: './alarms.component.html',
  providers: [ToolbarService, EditService, PageService, CommandColumnService],
  styleUrls: ['./alarms.component.scss',]
})
export class AlarmsComponent implements OnDestroy {

  public select = false;
  private alive = true;
  mostrar: Boolean;
  public pageSettings: PageSettingsModel;
  public index: number = 0;
  lavelForm: FormGroup;

  get Level() {
    return this.lavelForm.get("Level");
  }

  get nombre() {
    return this.lavelForm.get("nombre");
  }

  public editSettings: Object;
  // public toolbar: string[];
  public toolbar: ToolbarItems[] | object;

  public historyAlarmData: Alarmas[];
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;

  alarmas = ALARMAS;


  source: LocalDataSource = new LocalDataSource();
  public Alarm: Alarmas[] = [];
  public dataCategory: alarmLevel[];
  public value: string = '';

  @ViewChild('grid')
  public grid: GridComponent;

  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private http: HttpClient,
    private userStore: UserStore,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    this.index = 0;
    this.alive;
    this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.messageService.sendMessage("PackageUpdate");
        if (res) {
          this.select = false;
          this.mostrar = false;
        } else {
          this.select = true;
          this.mostrar = true;
        }
      });
    this.value = '';
  }

  public fields: Object = { text: "Level", value: "nombre" };

  ngOnInit(): void {

    this.dataCategory = [
      {
        Id: 1,
        nombre: '',
        Level: 'Todos'
      },
      {
        Id: 2,
        nombre: 'Process',
        Level: 'Process',
      },
      {
        Id: 3,
        nombre: 'Info',
        Level: 'Info',
      },
      {
        Id: 4,
        nombre: 'Error',
        Level: 'Error',
      },
      {
        Id: 5,
        nombre: 'Alarm',
        Level: 'Alarm',
      },
    ]

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
    };

    this.ChargeHistoryData();

    this.initForm();
    //this.loadDataForm();

    this.GetAlarmLevel('');

    //this.ChangeAlarmLevel();

    //this.Chargealarms();


    this.toolbar = [
      //  {text: 'Delete', prefixIcon: 'fas fa-check'},
      { text: 'Reconocer alarmas', tooltipText: 'Click', prefixIcon: 'fa fa-check-double', id: 'Click' }];

    this.commands = [
      // { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
      // { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      // { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
    ];

  }

  rowSelected(args: RowSelectEventArgs) {
    // const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
    // this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
  }

  public headerText: Object = [{ text: 'Eventos' }, { text: 'Historico de eventos' }];

  initForm() {
    this.lavelForm = this.fb.group({
      Id: this.fb.control(-1),
      Level: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ]),
      nombre: this.fb.control("", [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ])
    });
  }

  loadDataForm() {
    this.lavelForm.setValue({
      Id: GANTTD.Id,
      Level: GANTTD.Level,
      nombre: GANTTD.nombre
    });
  }

  //   commandClick(args: CommandClickEventArgs): void {
  //     debugger
  //     alert(JSON.stringify(args.rowData));

  // }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      // console.log('click: ', args);
      // debugger
      this.reconocer();
      // alert('Custom Toolbar Click...');
    }
  }

  // tooltip(args: QueryCellInfoEventArgs) {
  //   const tooltip: Tooltip = new Tooltip({
  //       content: args.data[args.column.field].toString()

  //   }, args.cell as HTMLTableCellElement);
  //   // console.log('tool:', tooltip);
  // }

  actionBegin(args) {
    if ((args.requestType === 'delete')) {

            const currentUserId = this.userStore.getUser().id;

            var respons =
            {
              IdAlarm: args.data[0].Id,
              UserIdAcknow: currentUserId
            };
            this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/ResetAlarmId', respons)

              .pipe(takeWhile(() => this.alive))
              .subscribe((res: any) => {

                if (res) {
                  this.toastrService.success('', 'Alarma solucionada');
                 
                  this.source.refresh();
                } else {
                  this.toastrService.danger('', 'Algo salio mal.');
                }
              });
            // args.rowData.Id.resolve();
            this.select = false;
            this.mostrar = false;
            args.cancel = true;
        
    }

  }

  actionComplete(args) {
    if ((args.requestType === 'delete')) {
      // const dialog = args.dialog;
      debugger
      const Id = 'Id';
      // change the header of the dialog
      // console.log('Type: ', args.data[0].Id);
      // console.log('id: ', args.rowData.Id);
      // debugger

      this.accessChecker.isGranted('edit', 'ordertable')
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          if (res) {
            const currentUserId = this.userStore.getUser().id;
            var respons =
            {
              IdAlarm: args.data[0].Id,
              UserIdAcknow: currentUserId
            };
            // let alarm = {IdAlarm: event.data.Id};
            this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/ResetAlarmId', respons)

              .pipe(takeWhile(() => this.alive))
              .subscribe((res: any) => {
                //  console.log("alarmId", res);
                if (res) {
                  this.toastrService.success('', '¡Alarma solucionada!');
                  this.source.refresh();
                } else {
                  this.toastrService.danger('', 'Algo salio mal.');
                }
              });
            // args.rowData.Id.resolve();
            //     this.select = false;
            //     this.mostrar = false;
            args.cancel = true;
          } else {
            this.select = true;
            this.mostrar = true;
            args.cancel = true;
          }
        });
      // dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[CustomerID] : 'New Customer';
    }
  }

  Delete(event): void {
    debugger

    this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if (res) {
          const currentUserId = this.userStore.getUser().id;
          var respons =
          {
            IdAlarm: event.data.Id,
            UserIdAcknow: currentUserId
          };
          let alarm = { IdAlarm: event.data.Id };
          this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/ResetAlarmId', respons)

            .pipe(takeWhile(() => this.alive))
            .subscribe((res: any) => {
              //  console.log("alarmId", res);
              if (res) {
                this.toastrService.success('', '¡Alarma solucionada!');
                this.source.refresh();
              } else {
                this.toastrService.danger('', 'Algo salio mal.');
              }
            });
          event.confirm.resolve();
          this.select = false;
          this.mostrar = false;
        } else {
          this.select = true;
          this.mostrar = true;
        }
      });
    //  console.log("Evento: ", event);


  }

  reconocer() {

    Swal.fire({
      title: 'Desea reconocer alarmas?',
      text: `¡Reconocerá todas las alarmas!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Reconocer!',
      cancelButtonText: "No, Reconocer",
    }).then(result => {
      // debugger 
      if (result.value) {
        const currentUserId = this.userStore.getUser().id;
        var respons =
        {
          UserIdAcknow: currentUserId
        };

        this.apiGetComp.PostJson(this.api.apiUrlNode1 + '/ResetAlarmAll', respons)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
            this.source.refresh();
            // this.Chargealarms();
          });

        Swal.fire('¡Se Reconocieron Exitosamente', 'success');
        this.source.refresh();
      }
    });

  }

  ChangeAlarmLevel() {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/GetAlarms?Level=' + '')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.Alarm = res;
        // console.log('Alarmas', this.Alarm);

      });
  }

  // Chargealarms() {
  //   this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/GetAlarms')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any) => {
  //     this.Alarm = res;
  //   });
  //   const contador = interval(30000)
  //   contador.subscribe((n) => {
  //     this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/GetAlarms')
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe((res: any) => {
  //       this.Alarm = res;
  //     });
  //   });

  // }

  ChargeHistoryData() {
    this.http.get(this.api.apiUrlNode1 + '/historyalarm')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.historyAlarmData = res;
        // console.log('History', this.historyAlarmData);

      });
    // const contador = interval(40000)
    // contador.subscribe((n) => {
    //   this.http.get(this.api.apiUrlNode1 + '/historyalarm')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //     this.historyAlarmData = res;
    //   });
    // });
  }

  GetAlarmLevel(name: string) {

    // console.log('Envio Level', name);

    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/GetAlarms?Level=' + name)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.Alarm = res;
        // console.log('Alarmas', this.Alarm);

      });
  }

  ngOnDestroy() {
    this.alive = false;
  }



}
