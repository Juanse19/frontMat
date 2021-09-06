/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolarData, SolarEnergyStatistics } from '../../../interfaces/iot/solar';
import { EnergyAggregatedApi } from '../api/energy-aggregated.api';

@Injectable()
export class SolarService extends SolarData {

  constructor(private api: EnergyAggregatedApi) {
    super();
  }

  getSolarData(): Observable<SolarEnergyStatistics> {
    return this.api.getSolar();
  }
}
