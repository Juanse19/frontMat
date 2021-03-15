import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { NbToastrService } from '@nebular/theme';

interface Alarmas {
  id: number;
  message: string;
  level: string;
  exception: string;
  userId: number;
  timeStamp: string;
}

let ALARMAS: Alarmas[] = [


];

@Component({
  selector: 'ngx-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnDestroy {

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
        title: 'Mensaje',
        type: 'string',
        filter: false,
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
        title: 'usuario',
        type: 'number',
        filter: false,
      },
      timeStamp: {
        title: 'Tiempo',
        type: 'string',
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public Alarm: Alarmas[];

  private alive = true;


  constructor(private toastrService: NbToastrService,
    public apiGetComp: ApiGetService,
    private api: HttpService,
  ) {
    this.Chargealarms();
    this.alive;
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
   
     console.log("Evento: ", event);
      let alarm = {idAlarm: event.data.id};
      this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postalarm?IdAlarm='+ event.data.id, alarm).subscribe((res: any) => {
         console.log("alarmId", res);
         if (res) {
          this.toastrService.success('', '¡Alarma solucionada!');
          this.source.refresh();
        } else {
          this.toastrService.danger('', 'Something wrong.');
        }
      });
      event.confirm.resolve();
    
  }

  reconocer() {
    
       this.apiGetComp.PostJson(this.api.apiUrlMatbox + '/Alarms/postallalarm', "").subscribe((res: any) => {
          if (res) {
           this.toastrService.success('', '¡Alarmas solucionada!');
           this.source.refresh();
         } else {
           this.toastrService.danger('', 'Something wrong.');
         }
       });
     
  }

  ngOnDestroy() {
    this.alive = false;
  }

  Chargealarms() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/GetAlarms').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      console.log("Report Total Ordenes:", res);
      this.Alarm = res;
      this.source.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Alarms/GetAlarms').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.Alarm = res;
        this.source.load(res);
      });
    });

  }

}
