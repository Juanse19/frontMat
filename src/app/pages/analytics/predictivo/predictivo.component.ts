import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { GridComponent, ToolbarService, EditService, PageService, SortService, CommandColumnService, PageSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

interface Predictive {
  maquina: string;
  metrosPor10MinCorrugador: number;
  metrosPor10MinMaquina: number;
  capacidadWip: number;
  ocupacionActual: number;
  anchoTotalAruumeOrden: number; 
  ocupacionPredictiva: number;
  tiempoDetencionCorrugador: number;
  duracionDetencion: number;
}

@Component({
  selector: 'ngx-predictivo',
  providers: [ToolbarService, EditService, PageService, SortService, CommandColumnService],
  templateUrl: './predictivo.component.html',
  styleUrls: ['./predictivo.component.scss']
})
export class PredictivoComponent implements OnInit {

  public pageSettings: PageSettingsModel;

  public filterOptions: FilterSettingsModel;

  public initialSort: Object;

  private alive = true;

  settings3 = {
    actions: false,
    columns: {
      // Maquina: {
      //   title: 'Maquina',
      //   type: 'string',
      //   filter: false,
      //   hide: true,

      // },
      maquina: {
        title: 'Maquina',
        type: 'string',
        filter: false,
      },
      metrosPor10MinCorrugador: {
        title: 'MetrosPor10MinCorrugador',
        type: 'number',
        filter: false,
      },
      metrosPor10MinMaquina: {
        title: 'MetrosPor10MinMaquina',
        type: 'number',
        filter: false,
      },
      capacidadWip: {
        title: 'CapacidadWip',
        type: 'number',
        filter: false,
      },
      ocupacionActual: {
        title: 'OcupacionActual',
        type: 'number',
        filter: false,
      },
      anchoTotalAruumeOrden: {
        title: 'AnchoTotalAruumeOrden',
        type: 'number',
        filter: false,
      },
      ocupacionPredictiva: {
        title: 'OcupacionPredictiva',
        type: 'number',
        filter: false,
      },
      tiempoDetencionCorrugador: {
        title: 'TiempoDetencionCorrugador',
        type: 'number',
        filter: false,
      },
      duracionDetencion: {
        title: 'DuracionDetencion',
        type: 'number',
        filter: false,
      },
    },
  };

  source3: LocalDataSource = new LocalDataSource();
  public GetPredictive: Predictive[];

  constructor(
    public apiGetComp: ApiGetService,
    private api: HttpService
  ) {
    
   }

  ngOnInit(): void {

    this.pageSettings = { pageSizes: true, pageSize: 10 };
    this.filterOptions = {
    type: 'Menu',
    }

    this.ChargePredictive();

  }
 
  ChargePredictive() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetPredictiveList').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Predictive:", res);
      this.GetPredictive = res;
      this.source3.load(res);
    });
    const contador = interval(30000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetPredictiveList').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.GetPredictive = res;
        this.source3.load(res);
      });
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
