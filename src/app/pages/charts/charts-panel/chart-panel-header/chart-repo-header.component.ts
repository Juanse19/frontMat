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
  selector: 'ngx-chart-repo-header',
  styleUrls: ['./chart-panel-header.component.scss'],
  templateUrl: './chart-repo-header.component.html',
})
export class ChartRepoHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() type: string = 'week';
  @Input() device: string = 'all';
  @Input() legend: string[] = ['', '', ''];

  // types: string[] = ['DAY', 'HOUR', 'year'];
  types: string[] = ['DAY', 'HOUR'];
  
  
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

  

  ngOnDestroy() {
    this.alive = false;
  }
}
