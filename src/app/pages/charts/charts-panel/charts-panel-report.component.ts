/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit, ViewChild,Injectable, Input } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { ChartPanelHeaderComponent } from './chart-panel-header/chart-panel-header.component';
import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { ChartData, ChartSummary } from '../../../@core/interfaces/common/chart';
import { OrdersProfitChartData } from '../../../@core/interfaces/ecommerce/orders-profit-chart';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { RepoChartComponent } from './charts/repo-chart.component';
import { ChartRepoHeaderComponent } from './chart-panel-header/chart-repo-header.component';

interface Ordenes {
  Orders: number;
  AssembliesProcessed: number;
  OrdersProcessed: number
} 

@Component({
  selector: 'ngx-charts-repo',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel-report.component.html',
})
export class ChartsPanelReportComponent implements OnInit, OnDestroy {

  private alive = true;

  chartPanelSummary: ChartSummary[] = [];
  period: string = 'DAY';
  machine:number = 22;
  ordersChartData: ChartData;
  ReportSystemAcumStopData: ChartData;
  ReportFullWipData: ChartData;
  reportChartData: ChartData;
  repoChartData: ChartData;
  profitChartData: ChartData;
  profitMotorChartData: ChartData;
  TotalOr: Ordenes[] = [];

  @ViewChild('ordersHeader', { static: true }) ordersHeader: ChartPanelHeaderComponent;
  // @ViewChild('machineHeader', { static: true }) machineHeader: ChartPanelHeaderComponent;
  // @ViewChild('profitHeader', { static: true }) profitHeader: ChartPanelHeaderComponent;
  @ViewChild('profitHeader', { static: true }) profitHeader: ChartRepoHeaderComponent;
  @ViewChild('ReportSystemHeader', { static: true }) ReportSystemHeader: ChartRepoHeaderComponent;
  @ViewChild('ReportFullWipHeader', { static: true }) ReportFullWipHeader: ChartRepoHeaderComponent;
  @ViewChild('reportHeader', { static: true }) reportHeader: ChartRepoHeaderComponent;
  @ViewChild('repoHeader', { static: true }) repoHeader: ChartRepoHeaderComponent;
  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('repoChart', { static: true }) repoChart: RepoChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  

  constructor(private ordersProfitChartService: OrdersProfitChartData,
    private api: HttpService,
    private http: HttpClient,) 
    { 

      this.http.get(this.api.apiUrlMatbox + "/Reports/GetTotalOrdersList")
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{
        // console.log(res);
        if(res == null){
           return null;
        }
        this.TotalOr=res;
        // console.log("ReportTotal: ", this.TotalOr=res);
      });

    }

  ngOnInit(): void {
    // this.ordersProfitChartService.getOrderProfitChartSummary()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((summary) => {
    //     this.chartPanelSummary = summary;
    //   });
    
    //   this.chartPanelSummary = [
    //  {title:"Ordenes", value:22},
    //  {title:"Ord. Procedas", value:5},
    //  {title:"Arrumes Procedos", value:18},
    //  {title:"Producto desechado", value:200},
    // ]; 
    // console.log(this.chartPanelSummary);
    
    // this.getOrdersChartData(this.period, this.machine);
    this.getReportReciruleDisposed(this.period);
    this.getReportRecircule(this.period)
    this.getProfitChartData(this.period);
    this.getReportSystemAcumStop(this.period);
    this.getReportFullWip(this.period);
  }

  // setPeriodAndGetChartData(value: string): void {
  //   if (this.period !== value) {
  //     this.period = value;
  //   }

  //   // this.getOrdersChartData(this.period ,this.machine);
  //   this.getProfitChartData(value);
    
  // }

  setReportAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getReportReciruleDisposed(value);
    this.getReportRecircule(value);
    this.getProfitChartData(value);
    this.getReportSystemAcumStop(value);
    this.getReportFullWip(value);
  }

  
  // receiveMessage($event) {
  //   this.machine = $event
  //   // console.log($event)
  //   // console.log(this.machine);
  // }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart && this.profitChart.resizeChart();
    } else {
      this.repoChart && this.repoChart.resizeChart();
      // this.ordersChart && this.ordersChart.resizeChart();
    }
  }

  // getOrdersChartData(period: String, machine: number) {
  //   // this.ordersProfitChartService.getOrdersChartData(period)
  //     // .pipe(takeWhile(() => this.alive))
  //     // .subscribe(ordersChartData => {
  //     //   this.ordersChartData = ordersChartData;
  //     //   this.ordersHeader.legend = ordersChartData.legend;
  //     //   this.ordersHeader.init();
  //     // });
  //     // this.machineHeader.machines = machine;
  //     // console.log("period: ", period)
  //     // console.log("Machine: ", machine)
  //     this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportMachine?idDevice="+ machine + "&unitedTime="+period)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe((res: any)=>{
  //       console.log('Respuesta de ordenes',res);
  //       if(res == null){
  //          return null;
  //       }
  //       this.ordersChartData=res;
  //       this.ordersHeader.legend = res.legend;
  //       this.ordersHeader.init();
  //     });
     
  // }

  // getProfitChartData(period: string) {
  //   this.ordersProfitChartService.getProfitChartData(period)
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe(profitChartData => {
  //       this.profitChartData = profitChartData;
  //       this.profitHeader.legend = profitChartData.legend;
  //       this.profitHeader.init();
  //     });
  // }

  //Repot 3
  getProfitChartData(period: String) {
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportMotorHour?unitedTime="+period)
    .pipe(takeWhile(() => this.alive))
    .subscribe((res: any)=>{  
      // console.log('Get Profit', res);
      if(res == null){
         return null;
      }
        this.profitChartData = res;
        this.profitHeader.legend = res.legend;
        this.profitHeader.init();
      });
  }

  //Repot 1
  getReportReciruleDisposed(period: String){
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportReciruleDisposed?unitedTime="+period)
    .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{  
        // console.log('Get Recircule', res);
        if(res == null){
           return null;
        }
        this.reportChartData=res;
        this.reportHeader.legend = res.legend;
        this.reportHeader.init();
      });
  }

  //Repot 2
  getReportRecircule(period: String){
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportReciruleDisposedPerc?unitedTime="+period)
      .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{  
        // console.log('Get Repo', res);
        if(res == null){
           return null;
        }
        this.repoChartData=res;
        this.repoHeader.legend = res.legend;
        this.repoHeader.init();
      });
  }

  //Repot 4
  getReportSystemAcumStop(period: String){
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportSystemAcumStopRecirculateStopLossNetwrok?unitedTime="+period)
    .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{  
        // console.log('Get Recircule', res);
        if(res == null){
           return null;
        }
        this.ReportSystemAcumStopData=res;
        this.ReportSystemHeader.legend = res.legend;
        this.ReportSystemHeader.init();
      });
  }

  //Repot 5
  getReportFullWip(period: String){
    this.http.get(this.api.apiUrlMatbox + "/Reports/GetReportFullWipTime?unitedTime="+period)
    .pipe(takeWhile(() => this.alive))
      .subscribe((res: any)=>{  
        // console.log('Get Recircule', res);
        if(res == null){
           return null;
        }
        this.ReportFullWipData=res;
        this.ReportFullWipHeader.legend = res.legend;
        this.ReportFullWipHeader.init();
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
