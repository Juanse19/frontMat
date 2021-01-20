/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrafficChartData } from '../../../interfaces/iot/traffic-chart';
import { TrafficAggregatedApi } from '../api/traffic-aggregated.api';

@Injectable()
export class TrafficChartService extends TrafficChartData {

  constructor(private api: TrafficAggregatedApi) {
    super();
  }

  getTrafficChartData(period: string): Observable<number[]> {
    return this.api.getTraffic(period)
      .pipe(map(data => data.lines[0].values));
  }
}
