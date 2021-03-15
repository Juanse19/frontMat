import { Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';

interface Alarmas {
  id?: number;
  message: string;
  level: string;
  exception: string;
  userId: number;
  timeStamp: string;
}

@Component({
  selector: 'ngx-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnDestroy {

  settings = {
    actions: false,
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter: false,
      //   hide: true,

      // },
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


  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService,
  ) {
    this.ChargeReportOrdens();
    this.alive;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ChargeReportOrdens() {
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
