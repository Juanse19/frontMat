import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';

interface carrusel {
  text: string,
  id: string,
  color: string
}

interface reports {
  title: string;
  link: string;
  hidden: boolean;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-scheduler-sita', 
  templateUrl: './scheduler-sita.component.html', 
  // styleUrls: ['./scheduler-sita.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class SchedulerSitaComponent implements OnInit {
 
    public car: reports [] = [];

    private alive = true;

    public loading: boolean;

    constructor(public apiGetComp: ApiGetService,
      private http: HttpClient,
      private api: HttpService) {
       
        this.loading = true;
      }

       ngOnInit(): void {

        this.carruselCharge();
          
       }
    
     public carruselCharge(){
        this.http.get(this.api.apiUrlNode1 + '/api/menuReports')
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: reports[]=[])=>{
          this.car=res;
          // console.log('Carr:', res  );
        });
      }

  

    ngOnDestroy() {
      this.alive = false;
    }

}
