/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { HttpService } from '../../../../@core/backend/common/api/http.service';

interface Machine{
  id:number,
  name:string
}
@Component({
  selector: 'ngx-chart-panel-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-panel-header.component.html',
})
export class ChartPanelHeaderComponent implements OnDestroy {

  private alive = true;

  // mostrar:Boolean = true;

  @Output() periodChange = new EventEmitter<string>();
  @Output() periodMachineChange = new EventEmitter<number>();

  @Input() type: string = 'week';
  @Input() device: string = 'all';
  @Input() machines: number;
  @Input() legend: string[] = ['', '', ''];

  // types: string[] = ['DAY', 'HOUR', 'year'];
  types: string[] = ['DAY', 'HOUR'];
  
  devices: Machine[]=[];
  chartLegend: {iconColor: string; title: string}[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  currentTheme: string;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
                 private api: HttpService,
                 private http: HttpClient,
  ) {
    this.init();
  }
  
  init() {
    //  debugger;
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetMachineReportList")
    .subscribe((res: any)=>{
      this.devices=res;
      
      // console.log("Report: ", this.devices=res);
      // this.AsignarDatosWip(res);
    });


    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        const orderProfitLegend = theme.variables.orderProfitLegend;

        this.currentTheme = theme.name;
        this.setLegendItems(orderProfitLegend);
      });

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }
  // AsignarDatosWip(res: any) {
  //   console.log("Respuesta: ",res)
  // }

  setLegendItems(orderProfitLegend) {
    this.chartLegend = [
      {
        iconColor: orderProfitLegend.firstItem,
        title: this.legend[0],
      },
      {
        iconColor: orderProfitLegend.secondItem,
        title: this.legend[1],
      },
      {
        iconColor: orderProfitLegend.thirdItem,
        title: this.legend[2],
      },
    ];
  }

  changePeriod(period: string): void {
    this.type = period;
    this.periodChange.emit(period);
    // console.log(period);
  }

  changeDevice(machine: number): void {
    //debugger;
    this.machines = machine;
    this.periodMachineChange.emit(machine);
    // console.log(machine);
  }
  

  ngOnDestroy() {
    this.alive = false;
  }
}
