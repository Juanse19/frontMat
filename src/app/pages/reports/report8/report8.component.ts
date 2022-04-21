import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-report8',
  templateUrl: './report8.component.html',
  styleUrls: ['./report8.component.scss']
})
export class Report8Component implements OnInit {

  public reportServiceUrl: string;
  public reportServerUrl: string;
  public serviceAuthorizationToken: string;
  public reportPath?: string;
  public secretKey: string = 'Snytow602BsPcbL0lpyjDW2UDiP79D9';
  constructor() { }

  ngOnInit(): void {
    this.reportServiceUrl = 'http://10.120.18.8:56997/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://10.120.18.8:56997/reporting/api/site/site1';
    this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiNzMxODczYjUtMDllNy00ODU4LWE0NGMtOWY0NGQ2NzJhMmFkIiwiSVAiOiIxMC4xMjAuMTguOCIsImlzc3VlZF9kYXRlIjoiMTY0ODgyOTE1MSIsIm5iZiI6MTY0ODgyOTE1MSwiZXhwIjoxNjQ5NDMzOTUxLCJpYXQiOjE2NDg4MjkxNTEsImlzcyI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSIsImF1ZCI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.c9Ihf5t3sddJYqnQFdfAYYmKXmNXDAtls-XDtoyUWkY';
    this.reportPath = '/Reports Pia/Informe resumen diario por hora 8'
  }

}
