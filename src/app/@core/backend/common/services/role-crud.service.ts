import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../api/http.service';
import { Observable } from 'rxjs';
import { RoleAccess } from '../../../interfaces/common/roles';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleCrudService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyZWluYUBtYXRlYy5jb20uY28iLCJwYXNzd29yZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjc0MTU1OTUyfQ.RcsrZZzfwpc2jRxGF91lC7cubi7dn4Z3s2L6we1yuBw'
    }),

  };

  constructor(private http: HttpClient, private api: HttpService) { }


  getRoles() {

    const headers = { 'Content-Type': 'application/json', "Authorization": "OLA QUE HACE" };

    return this.http.get(this.api.apiUrlNode + "/api/role", this.httpOptions)
  }

  getRolesId(id?: string) {
    return this.http.get(this.api.apiUrlNode + `/api/role/${id}`, this.httpOptions)
  }

  getAccess() {
    let accessId = this.http.get(this.api.apiUrlNode + "/api/Access", this.httpOptions)
    .pipe(retry(2))
    return accessId;
  }

  getRolesAccessId(id?: any) {
    return this.http.get(this.api.apiUrlNode + `/api/roleAccess/${id}`)
  }


  createRole(role: any) {

    const headers = { 'Content-Type': 'application/json', "AuthorizationV1": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyZWluYUBtYXRlYy5jb20uY28iLCJwYXNzd29yZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjc0MTU1OTUyfQ.RcsrZZzfwpc2jRxGF91lC7cubi7dn4Z3s2L6we1yuBw" };


    return this.http.post(this.api.apiUrlNode + "/api/roleAccess", role, { headers })
  }

  editRole(id: number, role: any) {

    // const headers = { 'Content-Type': 'application/json', "AuthorizationV1": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyZWluYUBtYXRlYy5jb20uY28iLCJwYXNzd29yZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjc0MTU1OTUyfQ.RcsrZZzfwpc2jRxGF91lC7cubi7dn4Z3s2L6we1yuBw" };

    return this.http.put(this.api.apiUrlNode + `/api/roleAccess/${id}`, role)
  }

  deleteRole(Id: number) {

    // const headers = { 'Content-Type': 'application/json', "AuthorizationV1": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyZWluYUBtYXRlYy5jb20uY28iLCJwYXNzd29yZCI6IjEyMzQ1Njc4IiwiaWF0IjoxNjc0MTU1OTUyfQ.RcsrZZzfwpc2jRxGF91lC7cubi7dn4Z3s2L6we1yuBw" };

    return this.http.delete(this.api.apiUrlNode + `/api/role/${Id}`, this.httpOptions)

  }

  asingRolesToUser(id: number, userName: string, incRoleArr: string[]) {

    const body = {
      "UserID": id,
      "NameUser": userName,
      "roleName": incRoleArr
    }

    return this.http.put(this.api.apiUrlNode + `/api/rolesUsers/`, body, this.httpOptions)
  }

  //TEST 
  getUserRole(Id: number) {

    return this.http.get(this.api.apiUrlNode + `/api/rolesUsers/${Id}`, this.httpOptions)

  }


}
