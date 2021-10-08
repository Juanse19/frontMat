import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, ToolbarService, EditService, PageService, SortService, CommandColumnService, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

interface Ordersnotwip {
  orderId: number;
  batch: number;
  order: string;
  cutsLength: number;
  cutsWidth: number;
  anchoWip: string;
  target: string;
  wIP: string;
  sizeDifference: number;
}

@Component({
  selector: 'ngx-ordenes-no-wips',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  templateUrl: './ordenes-no-wips.component.html',
  styleUrls: ['./ordenes-no-wips.component.scss']
})
export class OrdenesNoWipsComponent implements OnInit {
 
  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public initialSort: Object;

  /** Table de ordenes que no encajan en los wips */
  settings2 = {
    actions: false,
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter:false,
      //   hide:true,

      // },
      orderId: {
        title: 'OrderId',
        type: 'number',
        filter:false,
        hide:true,
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
      cutsLength: {
        title: 'Longitud cortes',
        type: 'number',
        filter: false,
      },
      cutsWidth: {
        title: 'Ancho corte',
        type: 'number',
        filter: false,
      },
      anchoWip: {
        title: 'Ancho Wip',
        type: 'string',
        filter: false,
      },
      target: {
        title: 'Target',
        type: 'string',
        filter: false,
      },
      wip: {
        title: 'Wip',
        type: 'string',
        filter: false,
      },
      sizeDifference: {
        title: 'Diferencia tamaño',
        type: 'number',
        filter: false,
      },
    },
  };

  source2: LocalDataSource = new LocalDataSource();
  public ReportOrdersnotwip: Ordersnotwip[];


  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService
  ) {
    
   }

  ngOnInit(): void {

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
    type: 'Menu',
    }

    this.ChargeOrdersnotwip();

  }

  ChargeOrdersnotwip() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetnotwipList').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report notwipList:", res);
      this.ReportOrdersnotwip = res;
      this.source2.load(res);
    });
    const contador = interval(30000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetnotwipList').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportOrdersnotwip = res;
        this.source2.load(res);
      });
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
