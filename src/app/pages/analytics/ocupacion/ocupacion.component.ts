import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';


interface ReportOcupation {
  id: number;
  name: string;
  totalOcupated: number;
  CurrentOcupated: number;
  Available: number;
  PercOcupation: number;

}

@Component({
  selector: 'ngx-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {

  /** Table de ocupacion del sistema */
  settings1 = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
        hide: true,

      },
      name: {
        title: 'Nombre',
        type: 'string',
        filter: false,
      },
      totalOcupated: {
        title: 'Capacidad Total (mt)',
        type: 'number',
        filter: false,
      },
      currentOcupated: {
        title: 'Ocupados (mt)',
        type: 'number',
        filter: false,
      },
      available: {
        title: 'Disponible (mt)',
        type: 'number',
        filter: false,
      },
      percOcupation: {
        title: '%Ocupacion',
        type: 'number',
        filter: false,
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  public ReportOcupation: ReportOcupation[];

  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService
  ) {
    this.ChargeReportOcupation();
   }

  ngOnInit(): void {
  }

  ChargeReportOcupation() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GeReportOcupation').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportOcupation = res;
      this.source1.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GeReportOcupation').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportOcupation = res;
        this.source1.load(res);
      });
    });

  }
 
}
