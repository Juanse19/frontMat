import { Component, OnInit } from '@angular/core';
import { GridComponent, PageSettingsModel, FilterSettingsModel, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Dialog, Tooltip } from '@syncfusion/ej2-popups';

export interface bhsfault {
  Faulttype: string;
  Faultlocation: string;
  Faulttime: string;
  Faulttimecleared: string;
  Totalfaulttime: string;
}

@Component({
  selector: 'ngx-bhs-faults',
  templateUrl: './bhs-faults.component.html',
  styleUrls: ['./bhs-faults.component.scss']
})
export class BhsFaultsComponent implements OnInit {

  public bhsfaultData: bhsfault[];

  private alive = true;

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  constructor(private http: HttpClient,
    private api: HttpService) { }

  ngOnInit(): void {
    // this.ChargeData();

    this.dataReports1();

    this.pageSettings = { pageSize: 5 };
    this.filterOptions = {
      type: 'Menu',
   };
  }

  dataReports1(){
    
    this.reportServiceUrl = 'http://10.100.22.92:51801/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://10.100.22.92:51801/reporting/api/site/matreport';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYTIyYzM1MmItOGVkOC00NTlkLWFlZjQtZGZkMmQ3NmViNmQ3IiwiSVAiOiIxMC4xMDAuMjIuOTIiLCJpc3N1ZWRfZGF0ZSI6IjE2NDM3NDkyNTMiLCJuYmYiOjE2NDM3NDkyNTMsImV4cCI6MTY0NDM1NDA1MywiaWF0IjoxNjQzNzQ5MjUzLCJpc3MiOiJodHRwOi8vMTAuMTAwLjIyLjkyOjUxODAxL3JlcG9ydGluZy9zaXRlL21hdHJlcG9ydCIsImF1ZCI6Imh0dHA6Ly8xMC4xMDAuMjIuOTI6NTE4MDEvcmVwb3J0aW5nL3NpdGUvbWF0cmVwb3J0In0.mZ5wg2NpdwXDoRaplL7vDuP-TWbYfC3cc4yaDrKAR70';
    this.reportPath = '/Sample Reports/Fallos del BHS'
  }

  tooltip(args: QueryCellInfoEventArgs) {
    const tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString()
        
    }, args.cell as HTMLTableCellElement);
    // console.log('tool:', tooltip);
  }

  ChargeData() {
    this.http.get(this.api.apiUrlNode1 + '/bhs')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-console
      console.log('bagData: ', res);
      this.bhsfaultData = res;
    });
    const contador = interval(40000)
    contador.subscribe((n) => {
      this.http.get(this.api.apiUrlNode1 + '/bhs')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.bhsfaultData = res;
      });
    });
  }

}
