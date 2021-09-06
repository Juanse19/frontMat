/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonBackendModule } from '../common/common-backend.module';

import { DevicesApi } from './api/devices.api';
import { DeviceParametersApi } from './api/device-parameters.api';
import { EnergyAggregatedApi } from './api/energy-aggregated.api';
import { PhoneApi } from './api/phone.api';
import { TrafficAggregatedApi } from './api/traffic-aggregated.api';

import { DeviceTypeService } from './services/device-type.service';

import { DevicesData } from '../../interfaces/iot/devices';
import { PhoneData } from '../../interfaces/iot/phone';
import { ElectricityData } from '../../interfaces/iot/electricity';
import { SolarData } from '../../interfaces/iot/solar';
import { TemperatureHumidityData } from '../../interfaces/iot/temperature-humidity';
import { TrafficChartData } from '../../interfaces/iot/traffic-chart';


import { DevicesService } from './services/devices.service';
import { ElectricityService } from './services/electricity.service';
import { PhoneService } from './services/phone.service';
import { SolarService } from './services/solar.service';
import { TemperatureHumidityService } from './services/temperature-humidity.service';
import { TrafficChartService } from './services/traffic-chart.service';

const API = [
  DevicesApi,
  DeviceParametersApi,
  EnergyAggregatedApi,
  PhoneApi,
  TrafficAggregatedApi,
];

const SERVICES = [
  { provide: DevicesData, useClass: DevicesService },
  { provide: ElectricityData, useClass: ElectricityService },
  { provide: PhoneData, useClass: PhoneService },
  { provide: SolarData, useClass: SolarService },
  { provide: TemperatureHumidityData, useClass: TemperatureHumidityService },
  { provide: TrafficChartData, useClass: TrafficChartService },
];

const INTERNAL_SERVICES = [DeviceTypeService];

@NgModule({
  imports: [CommonModule, CommonBackendModule],
  exports: [CommonBackendModule],
})
export class IotBackendModule {
  static forRoot(): ModuleWithProviders<IotBackendModule> {
    return {
      ngModule: IotBackendModule,
      providers: [
        ...API,
        ...INTERNAL_SERVICES,
        ...SERVICES,
      ],
    };
  }
}
