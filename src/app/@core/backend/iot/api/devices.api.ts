/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../common/api/http.service';

@Injectable()
export class DevicesApi {

  private readonly apiController: string = 'devices';

  constructor(private api: HttpService) {}

  list(): Observable<any> {
    return this.api.get(this.apiController);
  }

  add(device: any): Observable<any> {
    return this.api.post(this.apiController, device);
  }

  edit(device: any): Observable<any> {
    return this.api.put(`${this.apiController}/${device.id}`, device);
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`);
  }
}
