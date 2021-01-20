/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TemperatureHumidityData } from '../../../interfaces/iot/temperature-humidity';
import { Device, DeviceParameter } from '../../../interfaces/iot/devices';
import { DevicesApi } from '../api/devices.api';
import { DeviceParametersApi } from '../api/device-parameters.api';

@Injectable()
export class TemperatureHumidityService extends TemperatureHumidityData {

  constructor(private deviceApi: DevicesApi, private parametersApi: DeviceParametersApi) {
    super();
  }

  private readonly conditionerId = 5;
  private readonly humidifierId = 6;
  private readonly temperatureParameterName = 'Temperature';
  private readonly humidityParameterName = 'Humidity';

  getTemperatureDevice(): Observable<Device> {
    return this.deviceApi.get(this.conditionerId)
      .pipe(map(data => this.prepareTemperatureDevice(data)));
  }

  getHumidityDevice(): Observable<Device> {
    return this.deviceApi.get(this.humidifierId)
      .pipe(map(data => this.prepareHumidityDevice(data)));
  }

  setTemperatureDevice(device: Device): Observable<Device> {
    return this.deviceApi.edit(device)
      .pipe(map(data => this.prepareTemperatureDevice(data)));
  }
  setHumidityDevice(device: Device): Observable<Device> {
    return this.deviceApi.edit(device)
      .pipe(map(data => this.prepareHumidityDevice(data)));
  }

  setTemperatureParameter(parameter: DeviceParameter): Observable<DeviceParameter> {
    return this.parametersApi.edit(this.conditionerId, parameter)
      .pipe(map(data => {
        return {
          ...data,
          min: 12,
          max: 30,
        };
      }));
  }

  setHumidityParameter(parameter: DeviceParameter): Observable<DeviceParameter> {
    return this.parametersApi.edit(this.humidifierId, parameter)
      .pipe(map(data => {
        return {
          ...data,
          min: 0,
          max: 100,
        };
      }));
  }

  private prepareTemperatureDevice(data: any) {
    const index = data.parameters.indexOf(data.parameters.find(p => p.name === this.temperatureParameterName));
    data.parameters[index] = {
      ...data.parameters[index],
      min: 12,
      max: 30,
    };
    return data;
  }

  private prepareHumidityDevice(data: any) {
    const index = data.parameters.indexOf(data.parameters.find(p => p.name === this.humidityParameterName));
    data.parameters[index] = {
      ...data.parameters[index],
      min: 0,
      max: 100,
    };
    return data;
  }
}
