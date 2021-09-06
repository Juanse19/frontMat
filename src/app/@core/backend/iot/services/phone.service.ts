/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhoneData, Contact, RecentUser } from '../../../interfaces/iot/phone';
import { PhoneApi } from '../api/phone.api';

@Injectable()
export class PhoneService extends PhoneData {

  constructor(private phoneApi: PhoneApi) {
    super();
  }

  getContacts(): Observable<Contact[]> {
    return this.phoneApi.getContacts()
      .pipe(map(data => data.map(item => {
        return {
          type: item.numberType,
          name: `${item.firstName} ${item.lastName}`,
          picture: item.picture,
        };
      })));
  }

  getRecentUsers(): Observable<RecentUser[]> {
    return this.phoneApi.getRecentCalls()
      .pipe(map(data => data.map(item => {
        return {
          type: item.contact.numberType,
          time: item.dateOfCall,
          name: `${item.contact.firstName} ${item.contact.lastName}`,
          picture: item.picture,
        };
      })));
  }
}
