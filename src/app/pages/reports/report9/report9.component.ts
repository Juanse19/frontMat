import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { FlightReportComponent } from '../flight-report/flight-report.component';

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

  interface conC {
    Id?: number,
    Parameter?: string,
    Value?: string,
  }

@Component({
  selector: 'ngx-report9',
  templateUrl: './report9.component.html',
  styleUrls: ['./report9.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class Report9Component implements OnInit {

  alive: boolean = true;
  public dataReport: confi;
  
  public dataCategory = [];

  constructor(private router: Router,
    private http: HttpClient,
    private api: HttpService,
    private flightReport: FlightReportComponent,
    private apiGetComp: ApiGetService,) {
      this.category();
     }

  ngOnInit(): void {
    // this.dataCategory = [
    //   {
    //     id: 1,
    //     nombre: 'Vuelos',
    //     descripcion: 'categoria vuelos'
    //   },
    //   {
    //     id: 2,
    //     nombre: 'Operacion',
    //     descripcion: 'categoria operacion'
    //   },
    //   {
    //     id:3,
    //     nombre: 'Mantenimiento',
    //     descripcion: 'categoria mantenimiento'
    //   }
    // ]
    // console.log('dataCategory', this.dataCategory);
    
  }

  category() {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/getcategories')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
        this.dataCategory = res;
    });
  }

  goTo($event: any) {
    
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/api/reportsCategory?category=' + $event)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
        this.dataReport = res;
        this.flightReport.getDataReport(this.dataReport)
        this.router.navigate(["/pages/reports/flightReport"]);
        // console.log('data', this.dataReport);
        
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
