import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
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
  selector: 'ngx-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  /** Table de Ordenes */
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


  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService
  ) { 
    this.ChargeReportOrdens();
  }

  ngOnInit(): void {
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
