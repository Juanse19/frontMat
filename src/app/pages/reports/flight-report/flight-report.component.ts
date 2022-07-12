import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Report1Component } from '../report1/report1.component';

interface confi {
  Id?: number,
  Parameter: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
  State?: number,
  Category: string,
  Description: string,
  Type: string,
 }

 let confiReport: confi;

@Component({
  selector: 'ngx-flight-report',
  templateUrl: './flight-report.component.html',
  styleUrls: ['./flight-report.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable({
  providedIn: 'root'
})
export class FlightReportComponent implements OnInit {

  alive: boolean = true;
  public rutaMenu: confi[];
  public dataReport: confi;
  public state: boolean;
  public reportsData: confi[];
  public reportCategoryData = confiReport;
  public filtro_valor = '';

  constructor(private router: Router,
              private http: HttpClient,
              private api: HttpService,
              private apiGetComp: ApiGetService,
              private report1: Report1Component) { 
                
                
               }

  ngOnInit(): void {
    this.reportCategoryData === undefined ? this.router.navigate(["/pages/reports/reports"]) : this.reportCategoryData;
  }

  getDataReport(reports: confi){
    confiReport = reports
    this.reportCategoryData = confiReport;
    
  }

  handleSearch(value: string) {
    
    this.filtro_valor = value
  }

  getReport($event: any) {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/reportsId?Id=' + $event)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      this.dataReport = res;
        this.report1.getDataReport(this.dataReport)
        this.router.navigate(["/pages/reports/report"]);
        // console.log('data', this.dataReport);
        
    });

  }

  goTo() {
    this.router.navigate(["/pages/reports/reports"]);
    return false;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
