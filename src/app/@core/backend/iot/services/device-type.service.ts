/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class DeviceTypeService {
  private readonly DEVICE_TYPE_MAP = {
      Light: {
        iconClass: 'nb-lightbulb',
        type: 'primary',
      },
      RollerShades: {
        iconClass: 'nb-roller-shades',
        type: 'success',
      },
      WirelessAudio: {
        iconClass: 'nb-audio',
        type: 'info',
      },
      CoffeeMaker: {
        iconClass: 'nb-coffee-maker',
        type: 'warning',
      },
    };

  getSettings(type: string): any {
    return this.DEVICE_TYPE_MAP[type];
  }
}
