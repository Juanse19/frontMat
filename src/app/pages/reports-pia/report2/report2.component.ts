import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ngx-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.scss']
})
export class Report2Component implements OnInit {

  // public reportServiceUrl?: string;
  // public reportServerUrl?: string;
  // public serviceAuthorizationToken?: string;
  // public reportPath?: string;

  // constructor() { }

  // ngOnInit(): void {
  //   this.reportServiceUrl = 'http://xpl-matbag-app01:56997/reporting/reportservice/api/Viewer';
  //   this.reportServerUrl = 'http://xpl-matbag-app01:56997/reporting/api/site/site1';
  //   this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiNzMxODczYjUtMDllNy00ODU4LWE0NGMtOWY0NGQ2NzJhMmFkIiwiSVAiOiIxMC4xMjAuMTguOCIsImlzc3VlZF9kYXRlIjoiMTY0NDk1NTYzOCIsIm5iZiI6MTY0NDk1NTYzOCwiZXhwIjoxNjQ1NTYwNDM4LCJpYXQiOjE2NDQ5NTU2MzgsImlzcyI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSIsImF1ZCI6Imh0dHA6Ly8xMC4xMjAuMTguODo1Njk5Ny9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.aQa4-wnzVV-1MStnQiPUS5Imwp7yPsRzwcHYEWeID7s';
  //   this.reportPath = '/Reports Pia/Informe diario por volumen de equipaje'
  // }
  public serviceUrl: string;
  public reportPath: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public Remote: string;
  public locale: string;

    constructor() {
      // this.locale = "es-ES";
      this.serviceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
      this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
      this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgxNzM4MTM2IiwibmJmIjoxNjgxNzM4MTM2LCJleHAiOjE2ODIzNDI5MzYsImlhdCI6MTY4MTczODEzNiwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.2XX1CqHS6hm874JMp4KQdg5Q1T3TVA-zQh0n1zN88yU';
      this.reportPath = '/XPL_V1/0. Resumen de Maletas Procesadas por Día';
      // this.Remote = 'Remote'
      this.locale = "es-ES";
    }

    ngOnInit(): void {
      
    }

}
