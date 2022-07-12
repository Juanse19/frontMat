import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report5',
  templateUrl: './report5.component.html',
  styleUrls: ['./report5.component.scss']
})
export class Report5Component implements OnInit {

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;

  constructor() { }

  ngOnInit(): void {
    this.reportServiceUrl = 'http://xpl-matbag-app01:56997/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://xpl-matbag-app01:56997/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiNzMxODczYjUtMDllNy00ODU4LWE0NGMtOWY0NGQ2NzJhMmFkIiwiSVAiOiIxMC4xMjAuMTguOCIsImlzc3VlZF9kYXRlIjoiMTY0NTU2NzU3NCIsIm5iZiI6MTY0NTU2NzU3NCwiZXhwIjoxNjQ2MTcyMzc0LCJpYXQiOjE2NDU1Njc1NzQsImlzcyI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSIsImF1ZCI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.ht9Rcyz5019jKkHpRvzC4teACPrpUt0MHYJ5UYnn0Bo';
    this.reportPath = '/Reports Pia/Informe seguimiento de PEC por zona de tracking'
  }

}
