import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../api/http.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

    constructor(private http: HttpClient, private api: HttpService) { }

  getPermissions() {
    return this.http.get(this.api.apiUrlNode + "/api/getpermission")
  }

  getMenu() {
    return this.http.get(this.api.apiUrlNode + "/api/menu")
  }

  createPermission(role: string) {

  }

  editPermission(Id: number, role: string) {

  }

  deletePermission() {

  }

}
