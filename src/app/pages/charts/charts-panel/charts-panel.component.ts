/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit, ViewChild,Injectable } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { ChartPanelHeaderComponent } from './chart-panel-header/chart-panel-header.component';
import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { ChartData, ChartSummary } from '../../../@core/interfaces/common/chart';
import { OrdersProfitChartData } from '../../../@core/interfaces/ecommerce/orders-profit-chart';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnInit, OnDestroy {

  private alive = true;

  chartPanelSummary: ChartSummary[] = [];
  period: string = 'week';
  ordersChartData: ChartData;
  profitChartData: ChartData;

  @ViewChild('ordersHeader', { static: true }) ordersHeader: ChartPanelHeaderComponent;
  @ViewChild('profitHeader', { static: true }) profitHeader: ChartPanelHeaderComponent;
  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData) { }

  ngOnInit(): void {
    // this.ordersProfitChartService.getOrderProfitChartSummary()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((summary) => {
    //     this.chartPanelSummary = summary;
    //   });
      this.chartPanelSummary = [
     {title:"Ordenes", value:20},
     {title:"Ord. Procedas", value:10},
     {title:"Arrumes Procedos", value:200},
     {title:"Producto desechado", value:200},
    ];
    this.getOrdersChartData(this.period);
    //this.getProfitChartData(this.period);
  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart && this.profitChart.resizeChart();
    } else {
      this.ordersChart && this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    // this.ordersProfitChartService.getOrdersChartData(period)
      // .pipe(takeWhile(() => this.alive))
      // .subscribe(ordersChartData => {
      //   this.ordersChartData = ordersChartData;
      //   this.ordersHeader.legend = ordersChartData.legend;
      //   this.ordersHeader.init();
      // });


      this.ordersChartData = {
        chartLabel:"JS",
        axisXLabels : ["6","7","8","9","10","11","12","13"],
        legend:["Arrumes","Pedidos","Prom. Ancho"],
        linesData:[
          [6,10,30,12,25,34,32,54],
          [7,20,53,23,65,23,32,21],
          [8,30,8,23,8,45,5,76],
        ],
      };
        this.ordersHeader.legend = ["Arrumes","Pedidos","Prom. Ancho"];
        this.ordersHeader.init();
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
        this.profitHeader.legend = profitChartData.legend;
        this.profitHeader.init();
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
