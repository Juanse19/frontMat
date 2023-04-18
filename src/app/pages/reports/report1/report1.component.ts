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
  public reportState: boolean =  false;
  public select = false;
  public serviceUrl: string;
  public reportPath: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public Remote: string;
  public locale: string;
  
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

  getDataReport(reports: confi){
    confiReport = reports[0]
    this.reportCategoryData = confiReport;
    console.log('DataReport',this.reportCategoryData.Description);
    
  }

  getRutaDinamic(){
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
      this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgxNzM4MTM2IiwibmJmIjoxNjgxNzM4MTM2LCJleHAiOjE2ODIzNDI5MzYsImlhdCI6MTY4MTczODEzNiwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.2XX1CqHS6hm874JMp4KQdg5Q1T3TVA-zQh0n1zN88yU';
      this.reportPath = `/XPL_V1/${this.reportCategoryData?.Description}`;
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
