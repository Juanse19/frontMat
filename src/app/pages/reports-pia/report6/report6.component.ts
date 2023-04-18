import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report6',
  templateUrl: './report6.component.html',
  styleUrls: ['./report6.component.scss']
})
export class Report6Component implements OnInit {

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  constructor() { }

  ngOnInit(): void {
    this.reportServiceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgxNDg3MTM3IiwibmJmIjoxNjgxNDg3MTM3LCJleHAiOjE2ODIwOTE5MzcsImlhdCI6MTY4MTQ4NzEzNywiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.LOBCZEAqV5HUBun8hFCO1BwO4fFxC3W7RH182tVu_fA';
    this.reportPath = '/Reports Pia/Informacion de equipos'
  }

}
