import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';
import { GridComponent, SortService, PageSettingsModel, FilterSettingsModel, CommandClickEventArgs, 
  EditService, CommandColumnService, CommandModel, ToolbarService, PageService,
   ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; 

interface Alarmas {
  id: number;
  message: string;
  level: string;
  exception: string;
  userId: string;
  STD: string;
  ETD: string;
  UserIdAcknow: string;
  NameDevice: string;
  DescriptionDevice: string;
}

let ALARMAS: Alarmas[] = [


];

@Component({
  selector: 'ngx-alarms',
  templateUrl: './alarms.component.html',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  styleUrls: ['./alarms.component.scss'] 
})
export class AlarmsComponent implements OnDestroy {

  public select = false;
  private alive = true;
  mostrar: Boolean;

  subscription: Subscription;

  intervalSubscriptionChargealarms: Subscription;

  intervalSubscriptionHistoryalarms: Subscription;

  public pageSettings: PageSettingsModel;
  

  public editSettings: Object;
    // public toolbar: string[];
    public toolbar: ToolbarItems[] | object;
 
  public historyAlarmData: Alarmas[];
  public editparams: Object;
  public commands: CommandModel[];
  public filterOptions: FilterSettingsModel;
  public initialSort: Object;

  alarmas = ALARMAS;

  settings = {
    // actions: false,
    actions: {
      add: false,
      edit: false,
      
    },
    delete: {
      deleteButtonContent: '<i class="nb-checkmark-circle"></i>',
      confirmDelete: true,
    },
    
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
        hide: true,

      },
      message: {
        title: 'Descripción',
        type: 'string',
        filter: true,
      },
      level: {
        title: 'Nivel',
        type: 'string',
        filter: false,
      },
      // exception: {
      //   title: 'excepción',
      //   type: 'string',
      //   filter: false,
      // },
      userId: {
        title: 'Usuario',
        type: 'string',
        filter: false,
      },
      STD: {
        title: 'Fecha',
        type: 'string',
        filter: false,
      },
      // ETD: {
      //   title: 'Fecha fin',
      //   type: 'string',
      //   filter: false,
      // },
      // UserIdAcknow: {
      //   title: 'Usuario ',
      //   type: 'string',
      //   filter: false,
      // },
      DescriptionDevice: {
        title: 'Dispositivo',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public Alarm: Alarmas[];

  // History AlARMS
  setting = {
    // actions: false,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
        hide: true,

      },
      message: {
        title: 'Descripción',
        type: 'string',
        filter: true,
      },
      level: {
        title: 'Nivel',
        type: 'string',
        filter: false,
      },
      // exception: {
      //   title: 'excepción',
      //   type: 'string',
      //   filter: false,
      // },
      userId: {
        title: 'Usuario',
        type: 'string',
        filter: false,
      },
      STD: {
        title: 'Fecha',
        type: 'string',
        filter: false,
      },
      ETD: {
        title: 'Fecha fin',
        type: 'string',
        filter: false,
      },
      UserIdAcknow: {
        title: 'Usuario reconoce',
        type: 'string',
        filter: false,
      },
      DescriptionDevice: {
        title: 'Dispositivo',
        type: 'string',
        filter: false,
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  public Alarms: Alarmas[];

  constructor(
    public accessChecker: NbAccessChecker,
    private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
    private http: HttpClient,
    private userStore: UserStore,
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
   };

    this.Chargealarms();
    this.ChargeHistoryalarms();

    this.toolbar = [
      //  {text: 'Delete', prefixIcon: 'fas fa-check'},
     { text: 'Reconocer alarmas', tooltipText: 'Click', prefixIcon: 'fas fa-check-double', id: 'Click' }];

     this.commands = [
      // { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'fas fa-check' } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }];
  }

  // onedit($event: any) {
  //     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/postalarm?IdAlarm' + $event.data.id).subscribe((res: any) => {
  //       //REPORTOCUPATION=res;
  //       console.log("alarmId", res);
  //       // this.Alarm = res;
  //       // this.source.load(res);
  //     });
    
  // }

  clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'Click') {
      // console.log('click: ', args);
      // debugger
      this.reconocer();
        // alert('Custom Toolbar Click...');
    }
  }

  actionBegin(args) {
    if (( args.requestType === 'delete')) {
      // const Id = 'Id';
      // console.log('Type Delete: ', args.data[0].Id);
      this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){ 
          const currentUserId = this.userStore.getUser().id;
          var respons = 
            {
            IdAlarm: args.data[0].Id,
            UserIdAcknow: currentUserId
            };
          // let alarm = {IdAlarm: event.data.Id};
          this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/acknow', respons)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res: any) => {
        //  console.log("alarmId", res);
         if (res) {
          this.toastrService.success('', '¡Alarma solucionada!'); 
          this.Chargealarms();
          this.AlarmsCharge();
          this.source.refresh();
        } else {
          this.toastrService.danger('', 'Algo salio mal.');
        }
      });
          // args.rowData.Id.resolve();
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

  onDeleteConfirm(event): void {

    this.accessChecker.isGranted('edit', 'ordertable')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        if(res){ 
          let alarm = {idAlarm: event.data.id};

  //         const currentUserId = this.userStore.getUser().firstName;
  //         // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  //         var respons = 
  //         {
  //           user: currentUserId,
  //           message:"Reconoció una alarma"
  //         };

  // this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser', respons)
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any) => {
  //       //  console.log("Envió: ", res);
  //     });

      const currentUserId = this.userStore.getUser().id;
      var respons = 
            {
            IdAlarm: event.data.Id,
            UserIdAcknow: currentUserId
            };    
            

      this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/acknow', respons)
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
        }else {
          this.select=true;
          this.mostrar=true;
        }
      });
    //  console.log("Evento: ", event);
      
    
  }

  reconocer() {

  
    this.accessChecker.isGranted('edit', 'ordertable')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      if(res){ 
      Swal.fire({
      title: 'Desea reconocer alarmas?',
      text: `¡Reconocerá todas las alarmas!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Reconocer!'
    }).then(result => {
      debugger 
      if (result.value) {
      const currentUserId = this.userStore.getUser().id;
          var respons = 
            {
              UserIdAcknow: currentUserId
            };

      this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/acknowall', respons)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
       this.source.refresh();
       this.Chargealarms();
       this.AlarmsCharge();
      });
   
         Swal.fire('¡Se Reconocieron Exitosamente', 'success');
         this.Chargealarms();
         this.AlarmsCharge();
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

  public AlarmsCharge(){

    if (this.intervalSubscriptionChargealarms) {
      this.intervalSubscriptionChargealarms.unsubscribe();
    }
    
    this.intervalSubscriptionChargealarms = interval(10000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/api/getAlarms')),
    )
    .subscribe((res: any) => {
      this.Alarm = res;

    });
  }

  Chargealarms() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/getAlarms')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Total Ordenes:", res);
      this.Alarm = res;
    });
    // const contador = interval(6000)
    // contador.subscribe((n) => {
    //   this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetAlarms')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //     //REPORTOCUPATION=res;
    //     this.Alarm = res;
    //   }); 
    // });
  }

  public historyAlarmsCharge(){

    if (this.intervalSubscriptionHistoryalarms) {
      this.intervalSubscriptionHistoryalarms.unsubscribe();
    }
    
    this.intervalSubscriptionHistoryalarms = interval(10000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap(() => this.http.get(this.api.apiUrlNode + '/api/alarms')),
    )
    .subscribe((res: any) => {
      this.Alarms = res;

    });
  }

  ChargeHistoryalarms() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/alarms')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // console.log("HAlarms: ", res);
      
      this.Alarms = res;
      this.source1.load(res);
    });
    // const contador = interval(6000)
    // contador.subscribe((n) => {
    //   this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/alarms')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((res: any) => {
    //     this.Alarms = res;
    //     this.source1.load(res);
    //   });
    // });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  

}
