import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../api/http.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

    constructor(private http: HttpClient, private api: HttpService) { }

  getMaintenance() {
    return this.http.get(this.api.apiUrlNode + "/api/getdevicemaintenances")
  }

  createMaintenance(maintenance: any) {
    return this.http.post(this.api.apiUrlNode + "/api/newdevicemaintenances", maintenance)
  }

  resetMaintenance(device: string) {
    return this.http.get(this.api.apiUrlNode + `/api/resetdevicemaintenances?device=${device}`)
  }


}
