import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface dinamic {
  name: string,
  ruta: string,
  estado: boolean
}

interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
  State?: number,
  Category: string,
  Description: string,
  Type: string,
  Value01?: string,
}

let confiReport: confi;

@Component({
  selector: 'ngx-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class Report1Component implements OnInit {

  public rutaData!: confi;
  private alive = true;
  public state: boolean;
  trustedDashboardUrl: any;
  trustedDashboardUrl01: any;
  public reportCategoryData = confiReport;
  public reportState: boolean = false;
  public select = false;
  public serviceUrl: string;
  public reportPath: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public Remote: string;
  public locale: string;
  public pageSettings: any;
  public isPrintMode: boolean;

  constructor(private http: HttpClient,
    private api: HttpService,
    protected domSanitizer: DomSanitizer,
    private router: Router,) {
    // this.getRutaDinamic();
  }

  ngOnInit(): void {
    this.getRutaDinamic();
    this.reportCategoryData === undefined ? this.router.navigate(["/pages/reports/reports"]) : true;
  }

  public headerText: Object = [{ text: 'Reporte' }, { text: 'Gráfica' }];

  getDataReport(reports: confi) {
    confiReport = reports[0]
    this.reportCategoryData = confiReport;
    console.log('DataReport', this.reportCategoryData.Description);

  }

  getRutaDinamic() {
    if (confiReport === undefined) {
      this.router.navigate(["/pages/reports/reports"]);
    }

    if (this.reportCategoryData.Value01 === null) {
      this.select = true;
    }

    this.reportState = true
    if (this.reportCategoryData.Description === '26. Estado de Network') {
      console.log('reportState');

      this.reportState = false
    }
    // console.log('NameReport', `/XPL_V1/${this.reportCategoryData.Description}`);    
    this.serviceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgyNDQ5Mjc0IiwibmJmIjoxNjgyNDQ5Mjc0LCJleHAiOjE2ODMwNTQwNzQsImlhdCI6MTY4MjQ0OTI3NCwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.cbZoXTuNcIGN811Y8S914oR-qWQI8GzQ6Ct8ZradrJo';
    this.reportPath = `/XPL_V1/${this.reportCategoryData?.Description}`;

    console.log(this.reportPath);

    this.isPrintMode = true;

    if (this.reportCategoryData.Description === '0. Resumen de Maletas Procesadas por Día') {
      this.pageSettings = {
        height: 8.60,
        width: 12.06,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
            }
      };
    }

    if (this.reportCategoryData.Description === '14. ATR') {
      this.pageSettings = {
        height: 11.69,
        width: 16.27,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
            }
      };
    } else {
      this.pageSettings = {
        height: 8.69,
        width: 12.30,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
            }
      };
    }

    

    // this.Remote = 'Remote'
    this.locale = "es-ES";

    this.trustedDashboardUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value);
    this.trustedDashboardUrl01 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value01);

    // this.http.get(this.api.apiUrlNode1 + '/api/reportsId?Id=' + this.reportCategoryData.Id)
    // .pipe(takeWhile(() => this.alive))
    // .subscribe((res: any)=>{
    //     this.rutaData = res[0];
    //     console.log('Test: ', this.rutaData);

    //     console.log('URL:', this.rutaData.Value );
    //     this.trustedDashboardUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value);
    // });

  }

  onReportPrint(event) {
    event.isStyleLoad = false;
}

  goTo() {
    this.router.navigate(["/pages/reports/reports"]);
    return false;
  }

  backTo() {
    this.router.navigate(["/pages/reports/flightReport"]);
    return false;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
