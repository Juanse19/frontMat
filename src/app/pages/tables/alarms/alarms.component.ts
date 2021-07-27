import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { UserStore } from '../../../@core/stores/user.store';

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
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnDestroy {

  public select = false;
  private alive = true;
  mostrar: Boolean;

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
    this.Chargealarms();
    this.ChargeHistoryalarms();
  }

  // onedit($event: any) {
  //     this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/postalarm?IdAlarm' + $event.data.id).subscribe((res: any) => {
  //       //REPORTOCUPATION=res;
  //       console.log("alarmId", res);
  //       // this.Alarm = res;
  //       // this.source.load(res);
  //     });
    
  // }

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

  //   const currentUserId = this.userStore.getUser().firstName;
  //         // console.log("este es el usuario: ",this.userStore.getUser().firstName);
  //         var respons = 
  //         {
  //           user: currentUserId,
  //           message:"Reconoció todas las alarmas"
  //         };

  // this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postSaveAlarmUser', respons)
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any) => {
  //       //  console.log("Envió: ", res);
  //     });

      //  this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postallalarm', "")
      //  .pipe(takeWhile(() => this.alive))
      //  .subscribe((res: any) => {
      //     if (res) {
      //      this.toastrService.success('', '¡Alarmas solucionadas!');
      //      this.select=true;
      //      this.source.refresh();
      //      this.Chargealarms();
      //    } else {
      //      this.toastrService.danger('', 'Algo salio mal.');
      //    }
      //  });
      const currentUserId = this.userStore.getUser().id;
      var respons = 
              {
                UserIdAcknow: currentUserId
              };

      this.apiGetComp.PostJson(this.api.apiUrlNode + '/api/acknowall', respons)
       .pipe(takeWhile(() => this.alive))
       .subscribe((res: any) => {
          if (res) {
           this.toastrService.success('', '¡Alarmas solucionadas!');
           this.select=true;
           this.source.refresh();
           this.Chargealarms();
         } else {
           this.toastrService.danger('', 'Algo salio mal.');
         }
       });
     
  }

  Chargealarms() {
    this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/getAlarms')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Total Ordenes:", res);
      this.Alarm = res;
      this.source.load(res);
    });
    const contador = interval(6000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/GetAlarms')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.Alarm = res;
        this.source.load(res);
      });
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
    const contador = interval(6000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlNode + '/api/alarms')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.Alarms = res;
        this.source1.load(res);
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  

}
