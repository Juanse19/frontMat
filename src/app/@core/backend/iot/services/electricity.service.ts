/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElectricityData, Electricity, ElectricityChart } from '../../../interfaces/iot/electricity';
import { EnergyAggregatedApi } from '../api/energy-aggregated.api';

@Injectable()
export class ElectricityService extends ElectricityData {

  constructor(private api: EnergyAggregatedApi) {
    super();
  }

  getListData(yearsCount: number): Observable<Electricity[]> {
    return this.api.getList(yearsCount)
      .pipe(map(data => data.map((item, index) => {
        return {
          title: item.year,
          active: index === 0,
          currency: item.currency,
          unitOfMeasure: item.unitOfMeasure,
          months: item.data.map(x => {
            return {
              month: x.month,
              delta: x.trend,
              down: x.trend < 0,
              kWatts: x.consumedValue,
              cost: x.spentMoneyValue,
            };
          }),
        };
        })));
  }

  getChartData(period: string): Observable<ElectricityChart> {
    return this.api.getListAggregated(period)
      .pipe(map(data => {
        return {
          chart: {
            axisXLabels: data.axisXLabels,
            linesData: data.lines.map(item => item.values),
            chartLabel: data.chartLabel,
            legend: data.lines.map(item => item.type),
          },
          consumed: {
            title: data.summaryInfo.consumedValue.unitOfMeasure,
            value: data.summaryInfo.consumedValue.value,
          },
          spent: {
            title: data.summaryInfo.spentValue.unitOfMeasure,
            value: data.summaryInfo.spentValue.value,
          },
        };
      }));
  }
}
