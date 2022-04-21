import { Component, OnInit } from '@angular/core';
// import { Dashboardv1Data } from '../../../@core/interfaces/iot/dashboardv1';
import {
  NgxFilterByNumberComponent,
} from '../../../@components/custom-smart-table-components/filter-by-number/filter-by-number.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiGetService } from '../../../@core/backend/common/api/apiGet.services';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { takeWhile } from 'rxjs/operators';
import { NbAccessChecker } from '@nebular/security';
import { interval } from 'rxjs';

export interface Airline {
  Id: number;
  airline_name: string;
  icao_designator: string;
}

interface Carr {
  idAirline: number;
  airline_Name: string;
  icao_designator: number;
  carrusel: number;
}

@Component({
  selector: 'ngx-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit {

  public select = false;
  private alive = true;
  mostrar: Boolean;

  selected: number;
  Air = [];
  Carr1 = [];
  Carr2 = [];

  settings = {
    // mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    
    columns: {
      Id: {
        title: 'ID',
        type: 'number', 
        filter: false,
        hide: true,
      },
      airline_name: {
        title: 'Nombre aerolínea',
        type: 'string',
        
      },
      icao_designator: {
        title: 'Código aerolínea',
        type: 'string',
        filter: false,
      },
    },
  };

  

  source: LocalDataSource = new LocalDataSource();
  public AirData: Airline[];

  settings1 = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },

    columns: {
      
      airline_Name: {
        title: 'Nombre aerolínea',
        type: 'string',
      },
      icao_designator: {
        title: 'Código aerolínea',
        type: 'string',
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  public Carr1Data: Carr[];

  settings2 = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },

    columns: {
      
      airline_Name: {
        title: 'Nombre aerolínea',
        type: 'string',
      },
      icao_designator: {
        title: 'Código aerolínea',
        type: 'string',
      },
    },
  };

  source2: LocalDataSource = new LocalDataSource();
  public Carr2Data: Carr[];

  constructor(
    public accessChecker: NbAccessChecker,
    public apiGetComp: ApiGetService,
    private api: HttpService
  ) {
    this.ChargeAirline();
    this.alive;
    // this.accessChecker.isGranted('edit', 'ordertable')
    // .pipe(takeWhile(() => this.alive))
    // .subscribe((res: any) => {
    //   if(res){ 
    //     this.select = false;
    //     this.mostrar = false;
    //   }else {
    //     this.select=true;
    //     this.mostrar=true;
    //   }
    // });
  }

  ngOnInit() {
  
  this.ChargeAirline();
  this.ChargeCarr1();
  this.ChargeCarr2();
  }


  public seletoggleSelection (){

  }

  ChargeAirline() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetAirlines')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any[]) => {
      //REPORTOCUPATION=res;
      // console.log("Report Ocupacion:", res);
      this.AirData = res;
    //   if(res == null){
    //     return null;
    //  }
      this.source.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetAirlines')
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any[]) => {
        //REPORTOCUPATION=res;
        this.AirData = res;
        this.source.load(res);
      });
    });

  } 

  ChargeCarr1() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetCarrusel?id='+1)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any[]) => {
      //REPORTOCUPATION=res;
      // console.log("Carr1", res);
      this.Carr1Data = res;
    //   if(res == null){
    //     return null;
    //  }
      this.source1.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetCarrusel?id='+1)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any[]) => {
        //REPORTOCUPATION=res;
        this.Carr1Data = res;
        this.source1.load(res);
      });
    });
  } 

  ChargeCarr2() {
    this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetCarrusel?id='+2)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any[]) => {
      //REPORTOCUPATION=res;
      // console.log("Carr2", res);
      this.Carr2Data = res;
    //   if(res == null){
    //     return null;
    //  }
      this.source2.load(res);
    });
    const contador = interval(60000)
    contador.subscribe((n) => {
      this.apiGetComp.GetJson(this.api.apiUrlMatbox + '/Dashboardv1/GetCarrusel?id='+2)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any[]) => {
        //REPORTOCUPATION=res;
        this.Carr2Data = res;
        this.source2.load(res);
      });
    });
  } 

  receiveMessage($event) {
    this.selected = $event
    // console.log($event)
    // console.log(this.machine);
  }

  onClick(event) {
    // console.log(event);
    // console.log(event.srcElement.attributes.Id);
    // var idAttr = event.srcElement.attributes.id;
    // var value = idAttr.nodeValue;
    // console.log(value);
  }

  carrusel1(){

  }

  // onDeleteConfirm(event): void {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     event.confirm.resolve();
  //   } else {
  //     event.confirm.reject();
  //   }
  // }

  ngOnDestroy() {
    this.alive = false;
  }

}
