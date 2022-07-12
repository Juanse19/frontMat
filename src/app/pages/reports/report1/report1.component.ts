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
  trustedDashboardUrl ;
  public reportCategoryData = confiReport;
  
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

  getDataReport(reports: confi){
    confiReport = reports[0]
    this.reportCategoryData = confiReport;
  }

  getRutaDinamic(){
    if (confiReport === undefined) {
      console.log('undefined');
      this.router.navigate(["/pages/reports/reports"]);
    }
    // console.log('IdData', this.reportCategoryData.Id);
    this.trustedDashboardUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value);
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
