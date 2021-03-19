/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { SolarData, SolarEnergyStatistics } from '../../@core/interfaces/iot/solar';
import { Device, DevicesData } from '../../@core/interfaces/iot/devices';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../@core/backend/common/api/http.service';

interface ReportOcupation {
  id: number;
  name: string;
  totalOcupated: number;
  CurrentOcupated: number;
  Available: number;
  PercOcupation: number;

}

interface Ordersnotwip {
  orderId: number;
  batch: number;
  order: string;
  cutsLength: number;
  cutsWidth: number;
  anchoWip: string;
  target: string;
  wIP: string;
  sizeDifference: number;
}

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


// let REPORTOCUPATION: ReportOcupation[] = [


// ];
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  /** Table de ocupacion del sistema */
  settings1 = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false,
        hide: true,

      },
      name: {
        title: 'Nombre',
        type: 'string',
        filter: false,
      },
      totalOcupated: {
        title: 'Capacidad Total (mt)',
        type: 'number',
        filter: false,
      },
      currentOcupated: {
        title: 'Ocupados (mt)',
        type: 'number',
        filter: false,
      },
      available: {
        title: 'Disponible (mt)',
        type: 'number',
        filter: false,
      },
      percOcupation: {
        title: '%Ocupacion',
        type: 'number',
        filter: false,
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  public ReportOcupation: ReportOcupation[];

  /** Table de ordenes que no encajan en los wips */
  settings2 = {
    actions: false,
    columns: {
      // id: {
      //   title: 'ID',
      //   type: 'number',
      //   filter:false,
      //   hide:true,

      // },
      orderId: {
        title: 'OrderId',
        type: 'number',
        filter:false,
        hide:true,
      },
      batch: {
        title: 'Batch',
        type: 'number',
        filter: false,
      },
      order: {
        title: 'Orden',
        type: 'string',
        filter: false,
      },
      cutsLength: {
        title: 'Longitud cortes',
        type: 'number',
        filter: false,
      },
      cutsWidth: {
        title: 'Ancho corte',
        type: 'number',
        filter: false,
      },
      anchoWip: {
        title: 'Ancho Wip',
        type: 'string',
        filter: false,
      },
      target: {
        title: 'Target',
        type: 'string',
        filter: false,
      },
      wip: {
        title: 'Wip',
        type: 'string',
        filter: false,
      },
      sizeDifference: {
        title: 'Diferencia tamaño',
        type: 'number',
        filter: false,
      },
    },
  };

  source2: LocalDataSource = new LocalDataSource();
  public ReportOrdersnotwip: Ordersnotwip[];


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


  private alive = true;

  solarValue: SolarEnergyStatistics;

  devices: Device[];

  constructor(private devicesService: DevicesData,
    private solarService: SolarData,
    public apiGetComp: ApiGetService,
    private api: HttpService,
  ) {
    this.ChargeReportOcupation();
    
    this.ChargeOrdersnotwip();

    this.ChargePredictive();

    this.alive;
    
    // this.devicesService.list()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(data => {
    //     this.devices = data.filter(x => x.settings);
    //   });


    // this.solarService.getSolarData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((data) => {
    //     this.solarValue = data;
    //   });
  }

  // changeDeviceStatus(device: Device, isOn: boolean) {
  //   device.isOn = isOn;
  //   this.devicesService.edit(device)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe();
  // }

  ngOnDestroy() {
    this.alive = false;
  }

  ChargeReportOcupation() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GeReportOcupation').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportOcupation = res;
      this.source1.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GeReportOcupation').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportOcupation = res;
        this.source1.load(res);
      });
    });

  }

  ChargeOrdersnotwip() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetnotwipList').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report notwipList:", res);
      this.ReportOrdersnotwip = res;
      this.source2.load(res);
    });
    const contador = interval(30000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetnotwipList').subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportOrdersnotwip = res;
        this.source2.load(res);
      });
    });

  }

  ChargePredictive() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Reports/GetPredictiveList').subscribe((res: any) => {
      //REPORTOCUPATION=res;
      console.log("Report Predictive:", res);
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

}
