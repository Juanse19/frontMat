import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { Sic } from '../../../pages/dashboard/_interfaces/MatBox.model';



@Component({
  selector: 'ngx-sic',
  templateUrl: './sic.component.html',
  styleUrls: ['./sic.component.scss']
})
export class SicComponent implements OnInit {

  private alive = true;
  
  /** Table de infromación Sic */
  settings5 = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number', 
        filter: false,
        hide: true,

      },
      listaCorteSIC: {
        title: 'ListaCorte',
        type: 'string',
        filter: false,
      },
      listaCorrtrim: {
        title: 'ListaTrim',
        type: 'number',
        filter: false,
      },
      orden: {
        title: 'Orden',
        type: 'number',
        filter: false,
      },
      pedido: {
        title: 'Pedido',
        type: 'number',
        filter: false,
      },
      tarjeta: {
        title: 'Tarjeta',
        type: 'string',
        filter: false,
      },
      longitudOrden_Planeado: {
        title: 'LogitudOrden',
        type: 'number',
        filter: false,
      },
      numeroCortes: {
        title: 'NumeroCorte',
        type: 'number',
        filter: false,
      },
      largoLamina_Planeado: {
        title: 'LargoLamina',
        type: 'number',
        filter: false,
      },
      anchoLamina_Planeado: {
        title: 'AnchoLamina',
        type: 'number',
        filter: false,
      },
      espesorLamina_Planeado: {
        title: 'EspesorLamina',
        type: 'number',
        filter: false,
      },
      origen: {
        title: 'Origen',
        type: 'string',
        filter: false,
      },
      destino: {
        title: 'Destino',
        type: 'string',
        filter: false,
      },
      hojasParaHacer_Planeado: {
        title: 'HojasParaHacer',
        type: 'number',
        filter: false,
      },
      estado: {
        title: 'Estado',
        type: 'string',
        filter: false,
      },
    },
  };

  source5: LocalDataSource = new LocalDataSource();
  public ReportSic: Sic[];

  constructor( 
    public apiGetComp: ApiGetService,
    private api: HttpService
    ) { 
      this.ChargeReportSic();
    }

  ngOnInit(): void {
  } 

  ChargeReportSic() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.ReportSic = res;
      this.source5.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Orders/GetOrderSic')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any) => {
        //REPORTOCUPATION=res;
        this.ReportSic = res;
        this.source5.load(res);
      });
    });

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
