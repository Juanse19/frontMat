/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { Electricity, ElectricityChart, ElectricityData } from '../../../@core/interfaces/iot/electricity';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ElectricityChartComponent } from './electricity-chart/electricity-chart.component';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartSummary } from '../../../@core/interfaces/common/chart';
import { AnyARecord } from 'dns';

export interface Chartconsumed {
  title?: string;
  value?: number;
}

@Component({
  selector: 'ngx-electricity',
  styleUrls: ['./electricity.component.scss'],
  templateUrl: './electricity.component.html',
})
export class ElectricityComponent implements OnDestroy {

  private alive = true;

  listData: Electricity[];
  chartData: ElectricityChart;

  type = 'week';
  types = ['week', 'month', 'year'];

  currentTheme: string;
  themeSubscription: any;

  energyChartData: ChartData;
  consumeChartData: ChartSummary[]=[];

  @ViewChild('chart', { static: true }) chart: ElectricityChartComponent;

  constructor(
    private electricityService: ElectricityData,
    private themeService: NbThemeService,
    private http: HttpClient,
    private api: HttpService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
    
  }

  ngOnInit(): void {
    this.chartEnergy(this.type);
    // this.energyChange(this.type);
    // this.consumeChange(this.type);
    // this.fetchData();
  }

  fetchData() {
    forkJoin(
      this.electricityService.getListData(3),
      this.electricityService.getChartData(this.type),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([listData, chartData]: [Electricity[], ElectricityChart]) => {
        this.listData = listData;
        this.chartData = chartData;
        // console.log('chart', this.chartData);
        this.chart && this.chart.resizeChart();
      });
  }

  receiveMessage($event) {
    this.types = $event
    // console.log('event',$event)
    // console.log('ty',this.types);
  }

  chartEnergy(type: string){
    this.energyChange(type);
    this.consumeChange(type);
  }

  public energyChange(type: string){
    
    this.http.get(this.api.apiUrlNode1 + '/GetKwhPeriod?period=' + type)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      
      // debugger 
      if(res == null){
        return null;
     }else {
      this.energyChartData = res;
      this.chart && this.chart.resizeChart();
     }
      // console.log('Energy', this.energyChartData);
    });
  }

  public consumeChange(type: string){
    // debugger
    this.http.get(this.api.apiUrlNode1 + '/GetConsumedKwPeriod?period=' + type)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{
      // debugger 
      if(res == null){
        return null;
     }else {
      this.consumeChartData = res;
      // this.chart && this.chart.resizeChart();
      // console.log('Cons:', this.consumeChartData);
     }
      
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
