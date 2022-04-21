import { Component, Injectable, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { ILoadedEventArgs, IPointerDragEventArgs, ITooltipRenderEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';
import { CircularGaugeComponent } from '@syncfusion/ej2-angular-circulargauge';
import { switchMap, takeWhile } from 'rxjs/operators';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import {ApiGetService} from '../../../../@core/backend/common/api/apiGet.services';
import { DecimalPipe } from '@angular/common';
import { interval, Subscription } from 'rxjs';
 
export interface cs1_3 {
  CS1_3M01_VelocidadActualMotor: number,
  CS1_3M01_CorrienteActualMotor: number,
  CS1_3M01_PotenciaActualMotor: number,
  CS1_3M01_TorqueActualMotor: number,
  CS1_3M01_KWh: number
}

export interface cs1_4 {
  CS1_4M01_VelocidadActualMotor: number,
  CS1_4M01_CorrienteActualMotor: number,
  CS1_4M01_PotenciaActualMotor: number,
  CS1_4M01_TorqueActualMotor: number,
  CS1_4M01_KWh: number
}

export interface cs1_5 {
  CS1_5M01_VelocidadActualMotor: number,
  CS1_5M01_CorrienteActualMotor: number,
  CS1_5M01_PotenciaActualMotor: number,
  CS1_5M01_TorqueActualMotor: number,
  CS1_5M01_KWh: number
}

export interface cs1_6 {
  CS1_6M01_VelocidadActualMotor: number,
  CS1_6M01_CorrienteActualMotor: number,
  CS1_6M01_PotenciaActualMotor: number,
  CS1_6M01_TorqueActualMotor: number,
  CS1_6M01_KWh: number
}

export interface cs1_7 {
  CS1_7M01_VelocidadActualMotor: number,
  CS1_7M01_CorrienteActualMotor: number,
  CS1_7M01_PotenciaActualMotor: number,
  CS1_7M01_TorqueActualMotor: number,
  CS1_7M01_KWh: number
}

let Teamcs1_3: cs1_3;
let Teamcs1_4: cs1_4;
let Teamcs1_5: cs1_5;
let Teamcs1_6: cs1_6;
let Teamcs1_7: cs1_7;

@Component({
  selector: 'ngx-cs1',
  templateUrl: './cs1.component.html',
  styleUrls: ['./cs1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class Cs1Component implements OnInit {

  private alive=true;
  // datacs1_3? = Teamcs1_3
  public Teamcs1_3: cs1_3 = {
    CS1_3M01_VelocidadActualMotor: 30,
    CS1_3M01_CorrienteActualMotor: 0,
    CS1_3M01_PotenciaActualMotor: 0,
    CS1_3M01_TorqueActualMotor: 0,
    CS1_3M01_KWh: 0
  }
  // datacs1_4? = Teamcs1_4
  public Teamcs1_4: cs1_4 = {
    CS1_4M01_VelocidadActualMotor: 30,
    CS1_4M01_CorrienteActualMotor: 0,
    CS1_4M01_PotenciaActualMotor: 0,
    CS1_4M01_TorqueActualMotor: 0,
    CS1_4M01_KWh: 0
  }
  // datacs1_5? = Teamcs1_5
  public Teamcs1_5: cs1_5 = {
    CS1_5M01_VelocidadActualMotor: 30,
    CS1_5M01_CorrienteActualMotor: 0,
    CS1_5M01_PotenciaActualMotor: 0,
    CS1_5M01_TorqueActualMotor: 0,
    CS1_5M01_KWh: 0
  }
  // datacs1_6? = Teamcs1_6
  public Teamcs1_6: cs1_6 = {
    CS1_6M01_VelocidadActualMotor: 30,
    CS1_6M01_CorrienteActualMotor: 0,
    CS1_6M01_PotenciaActualMotor: 0,
    CS1_6M01_TorqueActualMotor: 0,
    CS1_6M01_KWh: 0
  }
  // datacs1_7? = Teamcs1_7
  public Teamcs1_7: cs1_7 = {
    CS1_7M01_VelocidadActualMotor: 30,
    CS1_7M01_CorrienteActualMotor: 0,
    CS1_7M01_PotenciaActualMotor: 0,
    CS1_7M01_TorqueActualMotor: 0,
    CS1_7M01_KWh: 0
  }

  public velocidadCs1_3?: any = 0;
  public velocidadCs1_4?: any = 0;
  public velocidadCs1_5?: any = 0;
  public velocidadCs1_6?: any = 0;
  public velocidadCs1_7?: any = 0;

  intervalSubscriptionItemscs?: Subscription;
  public tooltipIntervalCs1: number;

    @ViewChild('Cs1_3')
    public cs1_3: CircularGaugeComponent;
    @ViewChild('Cs1_4')
    public cs1_4: CircularGaugeComponent;
    @ViewChild('Cs1_5')
    public cs1_5: CircularGaugeComponent;
    @ViewChild('Cs1_6')
    public cs1_6: CircularGaugeComponent;
    @ViewChild('Cs1_7')
    public cs1_7: CircularGaugeComponent;

    // custom code end
    public majorTicks: Object = { width: 0 };
    public lineStyle: Object = { width: 0 };
    public minorTicks: Object = { width: 0 };
    //Initializing LabelStyle
    public labelStyle: Object = { font: { size: '0' } };
    //Initializing Annotation
    public annotation1: string = "<div id='templateWrap'>" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation2: string = "<div id='templateWrap'>" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation3: string = "<div id='templateWrap'>" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation4: string = "<div id='templateWrap'>" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";
    public annotation5: string = "<div id='templateWrap'>" +
    "<div class='fontDes'>${pointers[0].value}%</div></div></div>";

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

public pointersCs1_3: Object = [{
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
public pointersCs1_4: Object = [{
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
public pointersCs1_5: Object = [{
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
public pointersCs1_6: Object = [{
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
public pointersCs1_7: Object = [{
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

  constructor(
    private http: HttpClient,
    private api: HttpService,
    private apiGetComp: ApiGetService,
    private decimalPipe: DecimalPipe,
  ) { }

  ngOnInit(): void {
    this.changeCs1_3();
    this.changeCs1_4();
    this.changeCs1_5();
    this.changeCs1_6();
    this.changeCs1_7();
  }

  ngAfterViewInit(): void {
  

    this.tooltipIntervalCs1 = window.setInterval(

        (): void => {
            if (document.getElementById('sample-data')) {
                let valueCS1_3: number = this.velocidadCs1_3;
                let valueCS1_4: number = this.velocidadCs1_4;
                let valueCS1_5: number = this.velocidadCs1_5;
                let valueCS1_6: number = this.velocidadCs1_6;
                let valueCS1_7: number = this.velocidadCs1_7;

                this.cs1_3.axes[0].pointers[0].animation.enable = true;
                this.cs1_4.axes[0].pointers[0].animation.enable = true;
                this.cs1_5.axes[0].pointers[0].animation.enable = true;
                this.cs1_6.axes[0].pointers[0].animation.enable = true;
                this.cs1_7.axes[0].pointers[0].animation.enable = true;

                this.cs1_3.setPointerValue(0, 0, valueCS1_3);
                this.cs1_4.setPointerValue(0, 0, valueCS1_4);
                this.cs1_5.setPointerValue(0, 0, valueCS1_5);
                this.cs1_6.setPointerValue(0, 0, valueCS1_6);
                this.cs1_7.setPointerValue(0, 0, valueCS1_7);

                this.cs1_3.setAnnotationValue(0, 0, this.cs1_3.axes[0].annotations[0].content);
                this.cs1_4.setAnnotationValue(0, 0, this.cs1_4.axes[0].annotations[0].content);
                this.cs1_5.setAnnotationValue(0, 0, this.cs1_5.axes[0].annotations[0].content);
                this.cs1_6.setAnnotationValue(0, 0, this.cs1_5.axes[0].annotations[0].content);
                this.cs1_7.setAnnotationValue(0, 0, this.cs1_5.axes[0].annotations[0].content);
            } else {
                clearInterval(this.tooltipIntervalCs1);
            }
        },
        2000);
}

  changeCs1_3(): void {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_3M01')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (JSON.stringify(res)=='{}') {
        console.log('no hay data CS1');
        res.CS1_3M01_PotenciaActualMotor = 0;
        res.CS1_3M01_KWh = 0;
        res.CS1_3M01_CorrienteActualMotor = 0;
      } else {
      this.Teamcs1_3 = res
      // this.datacs1_3 = Teamcs1_3
      this.velocidadCs1_3 =  this.decimalPipe.transform( this.Teamcs1_3?.CS1_3M01_VelocidadActualMotor) ?? 0;
      console.log('cs1_3:', this.velocidadCs1_3);
      
    }
    });
  }

  changeCs1_4(): void {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_4M01')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (JSON.stringify(res)=='{}') {
        res.CS1_4M01_PotenciaActualMotor = 0;
        res.CS1_4M01_KWh = 0;
        res.CS1_4M01_CorrienteActualMotor = 0;
      } else {
      this.Teamcs1_4 = res
      // this.datacs1_4 = Teamcs1_4
      this.velocidadCs1_4 =  this.decimalPipe.transform( this.Teamcs1_4.CS1_4M01_VelocidadActualMotor) ?? 0;
      console.log('cs1_4:', this.velocidadCs1_4);
      // console.log('Data CS', Teamcs1_4?.cs1_4_VelocidadActualMotor);
      }
    });
  }

  changeCs1_5(): void {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_5M01')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (JSON.stringify(res)=='{}') {
        console.log('no hay data CS1');
        res.CS1_5M01_PotenciaActualMotor = 0;
        res.CS1_5M01_KWh = 0;
        res.CS1_5M01_CorrienteActualMotor = 0;
      } else {
      this.Teamcs1_5 = res
      // this.datacs1_3 = Teamcs1_3
      this.velocidadCs1_5 =  this.decimalPipe.transform( this.Teamcs1_5?.CS1_5M01_VelocidadActualMotor) ?? 0;
      console.log('cs1_5:', this.velocidadCs1_5);
      
    }
    });
  }

  changeCs1_6(): void {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_6M01')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (JSON.stringify(res)=='{}') {
        console.log('no hay data CS1');
        res.CS1_6M01_PotenciaActualMotor = 0;
        res.CS1_6M01_KWh = 0;
        res.CS1_6M01_CorrienteActualMotor = 0;
      } else {
      this.Teamcs1_6 = res
      // this.datacs1_3 = Teamcs1_3
      this.velocidadCs1_6 =  this.decimalPipe.transform( this.Teamcs1_6?.CS1_6M01_VelocidadActualMotor) ?? 0;
      console.log('cs1_6:', this.velocidadCs1_6);
      
    }
    });
  }

  changeCs1_7(): void {
    this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_7M01')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      if (JSON.stringify(res)=='{}') {
        console.log('no hay data CS1');
        res.CS1_7M01_PotenciaActualMotor = 0;
        res.CS1_7M01_KWh = 0;
        res.CS1_7M01_CorrienteActualMotor = 0;
      } else {
      this.Teamcs1_7 = res
      // this.datacs1_3 = Teamcs1_3
      this.velocidadCs1_7 =  this.decimalPipe.transform( this.Teamcs1_7?.CS1_7M01_VelocidadActualMotor) ?? 0;
      console.log('cs1_7:', this.velocidadCs1_7);
      
    }
    });
  }

  data_Cs1(){
    if (this.intervalSubscriptionItemscs) {
      this.intervalSubscriptionItemscs.unsubscribe();
    }
  
    this.intervalSubscriptionItemscs = interval(5000)
    .pipe(
      takeWhile(() => this.alive),
      switchMap( () => this.apiGetComp.GetJson(this.api.apiUrlNode1 + '/CS1_3M01'))
    )
    .subscribe((res: any) => {
      if (res[0] == undefined) {
        console.log('no hay data CS1');
      } else {
        // Teamcs1_3 = res
        // this.datacs1_3 = Teamcs1_3
        // this.velocidadCs1_3 =  this.decimalPipe.transform( this.datacs1_3.cs1_3_VelocidadActualMotor) ?? 0;
        // console.log('cs1_3:', this.velocidadCs1_3);
      }
  
    },(error) => (console.log(error)),
    () => console.log('Error..!' ),
  );
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
