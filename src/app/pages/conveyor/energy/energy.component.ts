import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, Series, ChartTheme, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { getElement } from '@syncfusion/ej2-charts';
import { SolarData, SolarEnergyStatistics } from '../../../@core/interfaces/iot/solar';
import { Device, DevicesData } from '../../../@core/interfaces/iot/devices';
import { takeWhile } from 'rxjs/operators';
import { consume } from '../_interfaces/MatBag.model';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnergyComponent implements OnInit {

  public primaryXAxis: Object;
  public chartData: Object[];

    public series1: Object[] = [];
    public value: number = 10;
    public intervalId: any;
    public setTimeoutValue: number;
    public i: number = 0;
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        minimum:0,
        maximum: 50
    };
    @ViewChild('chart')
    public chart: ChartComponent;

    // private value = 0;

    // @Input('chartValue')
    // set chartValue(value: number) {
    //   this.value = value;
  
    //   if (this.option.series) {
    //     this.option.series[0].data[0].value = value;
    //     this.option.series[0].data[1].value = 100 - value;
    //     this.option.series[1].data[0].value = value;
    //   }
    // }
  
    option: any = {};
    themeSubscription: any;

    private alive = true;

  solarValue: SolarEnergyStatistics;

  public consumeData: consume[]=[];

  consuData: consume;

  devices: Device[];

  constructor
  (
    private http: HttpClient,
    private api: HttpService,
    private solarService: SolarData
  ) 
  {  
    // this.solarService.getSolarData()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((data) => {
    //     this.solarValue = data;
    //     console.log('data: ', this.solarValue.percent, 'service: ', data);
        
    //   });
 }

  ngOnInit(): void {
   this.consumeCharge();
  }

  public consumeCharge(){
    this.http.get(this.api.apiUrlNode1 + '/GetKwhZone')
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      // debugger
      this.consuData = res;
      // console.log('consumo Energia: ', this.consuData);
      // debugger
    });
  }


}

