import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/interfaces/common/smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';

interface UspReportOrders {
 Id: number;
 Batch: number;
 Order: string;
 CutsNumberTotal: number;
 CurrenCouts: number;
 Diference: number;
}

@Component({
    selector: 'ngx-report',
    styleUrls: ['./report.component.scss'],
    templateUrl: './report.component.html',
  })
  export class ReportComponent implements OnDestroy {

    settings = {
      actions: false,
      columns: {
        id: {
          title: 'ID',
          type: 'number',
          filter: false,
          hide: true,
  
        },
        batch: {
          title: 'Batch',
          type: 'number',
          filter: false,
        },
        order: {
          title: 'Orden',
          type: 'string',
          filter: false,
        },
        cutsNumberTotal: {
          title: 'N° cortes Total',
          type: 'number',
          filter: false,
        },
        currenCouts: {
          title: 'Recuentos actuales',
          type: 'number',
          filter: false,
        },
        diference: {
          title: 'Diferencia',
          type: 'number',
          filter: false,
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
    public ReportOrdens: UspReportOrders[];

    private alive = true;


    constructor(
      public apiGetComp: ApiGetService,
      private api: HttpService,
    ) {
      // this.ChargeReportOrdens();
      this.alive;
    }

    ngOnDestroy() {
      this.alive = false;
    }

    ChargeReportOrdens() {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetReportOrdersList').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        console.log("Report Total Ordenes:", res);
        this.ReportOrdens = res;
        this.source.load(res);
      });
      const contador = interval(60000)
      contador.subscribe((n) => {
        this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetReportOrdersList').subscribe((res: any) => {
          //REPORTOCUPATION=res;
          this.ReportOrdens = res;
          this.source.load(res);
        });
      });
  
    }

  }