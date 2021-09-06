/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../common/api/http.service';

@Injectable()
export class PhoneApi {

  private readonly apiController: string = 'phone';

  constructor(private api: HttpService) {}

  getContacts(searchText?: string, pageNumber: number = 1, pageSize: number = 15): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(`${this.apiController}/contacts`, { params })
      .pipe(map(data => data.map(item => {
        return { ...item, picture: this.getPicture(item.id) };
      })));
  }

  getRecentCalls(pageNumber: number = 1, pageSize: number = 15): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.api.get(`${this.apiController}/recent-calls`, { params })
      .pipe(map(data => data.map(item => {
        return { ...item, picture: this.getPicture(item.contact.id) };
      })));
  }

  private getPicture(id: number): string {
    return `${this.api.apiUrl}/${this.apiController}/contacts/${id}/photo`;
  }
}
