import { Component, OnInit, ViewChild } from '@angular/core';
// import { Dashboardv2Data } from '../../../@core/interfaces/iot/dashboardv2';
import {
  NgxFilterByNumberComponent,
} from '../../../@components/custom-smart-table-components/filter-by-number/filter-by-number.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { switchMap, takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GridComponent, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

// export interface Fun {
//   Conveyor: string;
//   Fecha_Hora_Activ: string;
//   TiempoEncendido: string;
//   tiempo_Paro: string;
// }

export interface Fun {
  DeviceName: string,
  CreatedDate: string,
  Off: number,
  On: number,
  On_Rev: number,
  Falla: number,
  Acumulacion: number,
  Atascado: number,
  Ahorro: number,
  Bloqueado: number,
  Seccionador_Off: number
}
 
@Component({
  selector: 'ngx-functioning',
  templateUrl: './functioning.component.html',
  styleUrls: ['./functioning.component.scss']
})
export class FunctioningComponent implements OnInit {

  @ViewChild('grid') 
  public grid: GridComponent;

  Fun = [];

  public funData: Fun[] = [];

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  private alive = true;

  public loading: boolean;

  intervalSubscriptionFun: Subscription;


  constructor(public apiGetComp: ApiGetService,
    private http: HttpClient,
    private api: HttpService) {
      this.loading = true;
    }

    ngOnInit() {
      // this.ChargeFunData();
  //     this.chargeData();
  //     this.pageSettings = { pageSize: 10 };
  //     this.filterOptions = {
  //     type: 'Menu',
  //  }
      }

      

      chargeData() {
        this.http.get(this.api.apiUrlNode1 + '/api/GetEfficiencyTimeExecConveyor')
        .pipe(takeWhile(() => this.alive))
        .subscribe((res: any) => {
          this.loading = false;
          this.funData = res;
          this.bandaFunCharge();
          // console.log('funData: ', res);
        });
        // const contador = interval(50000)
        // contador.subscribe((n) => {
        //   this.http.get(this.api.apiUrlNode1 + '/api/GetEfficiencyTimeExecConveyor')
        //   .pipe(takeWhile(() => this.alive))
        //   .subscribe((res: any) => {
        //     this.funData = res;
        //     this.loading = false;
        //     console.log('funData: ', this.funData);
        //   });
        // });
      }

      dataBound() {
        this.grid.autoFitColumns(
          ['Conveyor','Fecha Activación', 'Tiempo encendido', 'Tiempo parado',
           'Tiempo encendido reversa', 'Falla', 'Acumulacion', 'Atascado', 
           'Bloqueado', 'Seccionador_Off']);
    }

      public bandaFunCharge(){

        if (this.intervalSubscriptionFun) {
          this.intervalSubscriptionFun.unsubscribe();
        }
        
        this.intervalSubscriptionFun = interval(26000)
        .pipe(
          takeWhile(() => this.alive),
          switchMap(() => this.http.get(this.api.apiUrlNode1 + '/api/GetEfficiencyTimeExecConveyor')),
        )
        .subscribe((res: any) => {
          this.funData = res;
            // console.log('funcionamiento:', this.funData);
        });
      }

    ngOnDestroy() {
      this.alive = false;
    }

}
