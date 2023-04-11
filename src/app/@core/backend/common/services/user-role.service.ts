import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../api/http.service';
import { UserRole, UserRoleData } from '../../../interfaces/common/userRole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends UserRoleData {
    

    constructor(private http: HttpClient, private api: HttpService) {
        super();
    }

    getUserRole(): Observable<UserRole[]> {
        // return this.http.get(this.api.apiUrlNode + "/api/users-role");
        return this.api.getUserRole("api/users-role")
    }

  getUserRol() {
    return this.http.get(this.api.apiUrlNode + "/api/users-role")
  }

  editUserRol(Id: number, role: string) {

  }

  deleteRol() {

  }

 

}
