import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report4',
  templateUrl: './report4.component.html',
  styleUrls: ['./report4.component.scss']
})
export class Report4Component implements OnInit {

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  constructor() { }

  ngOnInit(): void {
    this.reportServiceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgxNTAyNDI0IiwibmJmIjoxNjgxNTAyNDI0LCJleHAiOjE2ODIxMDcyMjQsImlhdCI6MTY4MTUwMjQyNCwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.WGF0Yc6gRLH2nXPcp_3AqN6eW6Wr0pQgfsTp8RxnGCA';
    this.reportPath = '/Reports Pia/Estadisticas EDS'
  }

}
