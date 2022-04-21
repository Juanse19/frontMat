import { Component, OnDestroy, OnInit } from '@angular/core';
// import { UspStoppagesData } from '../../../@core/interfaces/iot/usp-stoppages-by-baggage';
import {
  NgxFilterByNumberComponent,
} from '../../../@components/custom-smart-table-components/filter-by-number/filter-by-number.component';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';

export interface acumulation {
  Conveyors: string;
  Duración: string;
  Estado: string;
}

@Component({
  selector: 'ngx-accumulation',
  templateUrl: './accumulation.component.html',
  styleUrls: ['./accumulation.component.scss']
})
export class AccumulationComponent  {

  UspStoppagesByBaggage =  [];

  public acumuData: acumulation[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    
    columns: {
      conveyor: {
        title: 'Conveyors',
        type: 'string',
      },
      duracionParo: {
        title: 'Duración para',
        filter: {
          type: 'custom',
          component: NgxFilterByNumberComponent,
        },
      },
      estado: {
        title: 'Estado del conveyor',
        type: 'string',
      },
    },
  };

  constructor(
    public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService
    ) {
      this.loading = true;
    }

 ngOnInit() {
   this.chargeData();
  this.pageSettings = { pageSizes: true, pageSize: 5 };
      this.filterOptions = {
      type: 'Menu',
   }
 }

 chargeData() {
  this.http.get(this.api.apiUrlNode1 + '/aco')
  .pipe(takeWhile(() => this.alive))
  .subscribe((res: any) => {
    // tslint:disable-next-line: no-console
    // console.log('acoData: ', res);
    this.loading = false;
    this.acumuData = res;
  });
  // const contador = interval(60000)
  // contador.subscribe((n) => {
  //   this.http.get(this.api.apiUrlNode1 + '/aco')
  //   .pipe(takeWhile(() => this.alive))
  //   .subscribe((res: any) => {
  //     this.acumuData = res;
  //     this.loading = false;
  //   });
  // });
}

 ngOnDestroy() {
  this.alive = false;
}

}
