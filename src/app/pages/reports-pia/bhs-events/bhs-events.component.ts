import { Component, OnInit } from '@angular/core';
import { GridComponent, PageSettingsModel, FilterSettingsModel, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { Dialog, Tooltip } from '@syncfusion/ej2-popups';

export interface bhsevent {
  Eventtype: string;
  Eventtime: string;
  Totaleventtime: string;
}

@Component({
  selector: 'ngx-bhs-events',
  templateUrl: './bhs-events.component.html',
  styleUrls: ['./bhs-events.component.scss'],
})
export class BhsEventsComponent implements OnInit {

  public bhseventData: bhsevent[];

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

    this.dataReports();

    this.pageSettings = { pageSize: 5 };
    this.filterOptions = {
      type: 'Menu',
   };
  }

  dataReports(){
    
    this.reportServiceUrl = 'http://10.100.22.92:51801/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://10.100.22.92:51801/reporting/api/site/matreport';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYTIyYzM1MmItOGVkOC00NTlkLWFlZjQtZGZkMmQ3NmViNmQ3IiwiSVAiOiIxMC4xMDAuMjIuOTIiLCJpc3N1ZWRfZGF0ZSI6IjE2NDM3NDkyNTMiLCJuYmYiOjE2NDM3NDkyNTMsImV4cCI6MTY0NDM1NDA1MywiaWF0IjoxNjQzNzQ5MjUzLCJpc3MiOiJodHRwOi8vMTAuMTAwLjIyLjkyOjUxODAxL3JlcG9ydGluZy9zaXRlL21hdHJlcG9ydCIsImF1ZCI6Imh0dHA6Ly8xMC4xMDAuMjIuOTI6NTE4MDEvcmVwb3J0aW5nL3NpdGUvbWF0cmVwb3J0In0.mZ5wg2NpdwXDoRaplL7vDuP-TWbYfC3cc4yaDrKAR70';
    this.reportPath = '/Sample Reports/Eventos BHS'
  }

  tooltip(args: QueryCellInfoEventArgs) {
    const tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString()
        
    }, args.cell as HTMLTableCellElement);
    // console.log('tool:', tooltip);
  }

  ChargeData() {
    this.http.get(this.api.apiUrlNode1 + '/ev')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-console
      console.log('bhseventData: ', res);
      this.bhseventData = res;
    });
    const contador = interval(40000)
    contador.subscribe((n) => {
      this.http.get(this.api.apiUrlNode1 + '/ev')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.bhseventData = res;
      });
    });
  }

}
