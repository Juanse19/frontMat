/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'ngx-charts',
  template: `
    <router-outlet></router-outlet>
  `,
})
@Injectable()
export class ChartsComponent {
}
