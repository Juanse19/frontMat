import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-bold-report',
  templateUrl: './bold-report.component.html',
  styleUrls: ['./bold-report.component.scss']
})
export class BoldReportComponent implements OnInit {

  title = 'reportviewerapp';
  // public serviceUrl: string;
  

  public reportServiceUrl?: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public reportPath?: string;


  constructor() { 
    // this.serviceUrl = 'https://demos.boldreports.com/services/api/ReportViewer';
    // // this.reportPath = '~/../../assets/Untitled1.rdl';
    // this.reportPath = '~/Resources/docs/sales-order-detail.rdl';
    // MatReport.rdl

    
  
   }

  ngOnInit(): void {
    this.reportServiceUrl = 'http://10.120.18.8:56997/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://10.120.18.8:56997/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiNzMxODczYjUtMDllNy00ODU4LWE0NGMtOWY0NGQ2NzJhMmFkIiwiSVAiOiIxMC4xMjAuMTguOCIsImlzc3VlZF9kYXRlIjoiMTY0NTU2NzU3NCIsIm5iZiI6MTY0NTU2NzU3NCwiZXhwIjoxNjQ2MTcyMzc0LCJpYXQiOjE2NDU1Njc1NzQsImlzcyI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSIsImF1ZCI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.ht9Rcyz5019jKkHpRvzC4teACPrpUt0MHYJ5UYnn0Bo';
    this.reportPath = '/Reports Pia/Seguimiento de maletas'
  }

}
