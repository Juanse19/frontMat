import { Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { ILoadedEventArgs, IPointerDragEventArgs, ITooltipRenderEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { switchMap, takeWhile, timeout } from 'rxjs/operators';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import {ApiGetService} from '../../../../@core/backend/common/api/apiGet.services';
import { interval, Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { DeviceXpl } from '../../_interfaces/device.model';
 
export interface MU1_1M02 {
  VelocidadActualMotor: number,
  CorrienteActualMotor: number,
  PotenciaActualMotor: number,
  TorqueActualMotor: number,
  KWh: number,
  VoltajeActualMotor: number,
  Estado: number,
}

@Component({
  selector: 'ngx-mu1_1',
  templateUrl: './mu1.1.component.html',
  styleUrls: ['./mu1.1.component.scss']
})
export class Mu1_1Component implements OnInit {

  private alive=true;

  public Team: DeviceXpl;

  
  public velocidadMU1_1M02: any = 0;
  intervalSubscriptionItems?: Subscription;

  @ViewChild('gaugeMU1_1M02')
    public osr1_1: CircularGaugeComponent;

   // custom code end
public majorTicks: Object = { width: 0 };
public lineStyle: Object = { width: 0 };
public minorTicks: Object = { width: 0 };
//Initializing LabelStyle
public labelStyle: Object = { font: { size: '0' } };
//Initializing Annotation
public annotation: string = "<div id='templateWrap'>" +
"<div class='fontDes' style='width: 16px;height: 16px;margin-top: 4px;'>${pointers[0].value} rpm</div></div></div>";
public annotation2: string = "<div class='fontDes1'>Germany</div>"
public annotation3: string = "<div class='fontDes1'>USA</div>"
public annotation4: string = "<div class='fontDes1'>UK</div>"
public annotation5: string = "<div id='templateWrap'>" +
"<div class='fontDes'>${pointers[0].value}%</div></div></div>";
// public annotation6: string = `<div id='templateWrap'><div class='fontDes3'>cantidad ${this.dataSF1_1?.SF1_1_VelocidadActualMotor}</div></div></div>`;


public germanyAnnotation: Object[] = [{
    content:  "<div id='templateWrap'>"
    +"<img style='width: 16px;height: 16px;margin-top: 4px;' src='./assets/circular-gauge/images/positive.png' />" 
    + "<div style='float: right;color: #424242;font-size: 10px;'>${pointers[0].value}%</div></div></div>",
    angle: 180,
    radius: '130%'
}, {
    content: '<div style="color:#9E9E9E;font-size:16px;font-family:Roboto">Germany</div>',
    angle: 180,
    radius: '65%'
}];


 //Color gauge
 public ranges: Object = [{
  start: 0, end: 40,
  startWidth: 15, endWidth: 15,
  color: '#30B32D'
}, 
{
  start: 40, end: 70,
  startWidth: 15, endWidth: 15,
  color: '#FFDD00'
}, 
{
  start: 70, end: 100,
  startWidth: 15, endWidth: 15,
  color: '#F03E3E'
}
];

public pointers2: Object = [{
  value: 0, radius: '60%',
  animation: { enable: false },
  pointerWidth: 5,
  cap: {
      radius: 6,
      border: { width: 0 }
  },
  needleTail: {
      length: '25%'
  }
}];

public tooltipInterval1: number;

  constructor( 
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private decimalPipe: DecimalPipe,
    ) { }

  ngOnInit(): void {
    this.changeMU1_1M02();
    // this.dataSF1()
  }

  gauge(){
    if (document.getElementById('sample-data')) {
      let value1: number = this.velocidadMU1_1M02;

      this.osr1_1.axes[0].pointers[0].animation.enable = true;
     
      this.osr1_1.setPointerValue(0, 0, value1);
      this.osr1_1.setAnnotationValue(0, 0, this.osr1_1.axes[0].annotations[0].content);
  } else {
      clearInterval(this.tooltipInterval1);
  }
  }

  test(){
    this.tooltipInterval1 = window.setInterval(

      (): void => {
          if (document.getElementById('sample-data')) {
              let value1: number = this.velocidadMU1_1M02;

              this.osr1_1.axes[0].pointers[0].animation.enable = true;
             
              this.osr1_1.setPointerValue(0, 0, value1);
              this.osr1_1.setAnnotationValue(0, 0, this.osr1_1.axes[0].annotations[0].content);
          } else {
              clearInterval(this.tooltipInterval1);
          }
      },
      1000);
  }

  ngAfterViewInit(): void {
  

    this.tooltipInterval1 = window.setInterval(

        (): void => {
            if (document.getElementById('sample-dataMU1_1M02')) {
                let value1: number = this.velocidadMU1_1M02;
                // let value2: number = this.velocidadSf1_2;
                // let value3: number = this.velocidadSf3_1;
                // let gridData1: number = 4 * value1;
                // let gridData2: number = 6 * value2;
                // let gridData3: number = 7 * value3;
                // let orderData: Object[] = [
                //     {
                //         'Country': 'Germany',
                //         'Sales': 500,
                //         'Target': 400,
                //         'vsTarget': gridData1
                //     }, {
                //         'Country': 'USA',
                //         'Sales': 1000,
                //         'Target': 600,
                //         'vsTarget': gridData2
                //     }, {
                //         'Country': 'UK',
                //         'Sales': 600,
                //         'Target': 700,
                //         'vsTarget': -gridData3
                //     }
                // ];

                // this.grid.dataSource = orderData;
                // this.grid.refresh();

                this.osr1_1.axes[0].pointers[0].animation.enable = true;
                // this.usa.axes[0].pointers[0].animation.enable = true;
                // this.uk.axes[0].pointers[0].animation.enable = true;
                this.osr1_1.setPointerValue(0, 0, value1);
                // this.usa.setPointerValue(0, 0, value2);
                // this.uk.setPointerValue(0, 0, value3);
                this.osr1_1.setAnnotationValue(0, 0, this.osr1_1.axes[0].annotations[0].content);
                // this.usa.setAnnotationValue(0, 0, this.usa.axes[0].annotations[0].content);
                // this.uk.setAnnotationValue(0, 0, this.uk.axes[0].annotations[0].content);
            } else {
                clearInterval(this.tooltipInterval1);
            }
        },
        2000);
}


  changeMU1_1M02() {
    this.apiGetComp.GetJson(this.api.urlapixplmatbagapp02 + '/api/v1/device?device=' + 'MU1_1')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if(res == timeout(100)){
        console.log('Tiempo fuera');
        
      } else if (JSON.stringify(res)=='{}') {
        console.log('No hay data MU1_1M02');
        res.VelocidadActualMotor = 0;
        res.CorrienteActualMotor = 0;
        res.PotenciaActualMotor = 0;
        res.KWh = 0;
      } else {
      this.Team = res[0]
      this.velocidadMU1_1M02 = this.Team?.VelocidadActualMotor ?? 0;
    
    }
    this.dataMU1_1M02();
    });
  }

  dataMU1_1M02(){
    if (this.intervalSubscriptionItems) {
      this.intervalSubscriptionItems.unsubscribe();
    }

    this.intervalSubscriptionItems = interval(23000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap( () => this.apiGetComp.GetJson(this.api.urlapixplmatbagapp02 + '/api/v1/device?device=' + 'MU1_1'))
    )
    .subscribe((res: any) => {
      if (JSON.stringify(res)=='{}') {
            console.log('no hay data MU1_1M02');
            res.VelocidadActualMotor = 0;
            res.CorrienteActualMotor = 0;
            res.PotenciaActualMotor = 0;
            res.KWh = 0;
          } else {
            this.Team = res[0]
            // this.dataSF1_1 = TeamSF1_1
            this.velocidadMU1_1M02 = this.Team?.VelocidadActualMotor ?? 0;
          }

    },(error) => (console.log(error)),
    () => console.log('Error..!' ),
  );
  }

  ngOnDestroy(): void {
    if (this.intervalSubscriptionItems) {
      this.intervalSubscriptionItems.unsubscribe();
    }
    this.alive=false;
  }

}
