import { Component, Injectable, OnInit } from '@angular/core';
import { HttpService } from '../../../@core/backend/common/api/http.service';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface dinamic {
  name: string,
  ruta: string,
  estado: boolean
}

interface confi {
  Id?: number,
  Parameter?: string,
  Value?: string,
  CreateDate?: string,
  UpdateDate?: string,
  State?: number,
  Category: string,
  Description: string,
  Type: string,
  Value01?: string,
  token_report_server: string;
}

let confiReport: confi;

@Component({
  selector: 'ngx-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class Report1Component implements OnInit {

  public rutaData!: confi;
  private alive = true;
  public state: boolean;
  trustedDashboardUrl: any;
  trustedDashboardUrl01: any;
  public reportCategoryData = confiReport;
  public reportState: boolean = false;
  public select = false;
  public serviceUrl: string;
  public reportPath: string;
  public reportPath2: string;
  public reportServerUrl?: string;
  public serviceAuthorizationToken?: string;
  public Remote: string;
  public locale: string;
  public pageSettings: any;
  public pageSettings2: any;
  public isPrintMode: boolean;
  public parameterSettings: any;

  constructor(private http: HttpClient,
    private api: HttpService,
    protected domSanitizer: DomSanitizer,
    private router: Router,) {
    // this.getRutaDinamic();
  }

  ngOnInit(): void {
    this.getRutaDinamic();
    this.reportCategoryData === undefined ? this.router.navigate(["/pages/reports/reports"]) : true;
  }

  public headerText: Object = [{ text: 'Reporte' }, { text: 'Gráfica' }];

  // Data report
  getDataReport(reports: confi) {
    confiReport = reports[0]
    this.reportCategoryData = confiReport;
    console.log('DataReport', this.reportCategoryData.token_report_server);

  }

  getRutaDinamic() {
    if (confiReport === undefined) {
      this.router.navigate(["/pages/reports/reports"]);
    }

    if (this.reportCategoryData.Value01 === null) {
      this.select = true;
    }
    console.log('select', this.select);

    if (!this.select) {

      console.log('select is false');

      this.serviceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
      this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
      // this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgyNTE2NjA4IiwibmJmIjoxNjgyNTE2NjA4LCJleHAiOjE2ODMxMjE0MDgsImlhdCI6MTY4MjUxNjYwOCwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.3mOINdyyaOjK0NY4xhj_SWpVOa2KEzHUrPrwypGBMZc';
      this.serviceAuthorizationToken = this.reportCategoryData.token_report_server;
      this.reportPath2 = `/XPL_GRÁFICAS/${this.reportCategoryData?.Value}`;
      // this.Remote = 'Remote'
      this.locale = "es-ES";
      this.isPrintMode = true;
      // this.pageSettings2 = {
      //   height: 9.60,
      //   width: 15.06,
      //   margins: {
      //     top: 0.01,
      //     right: 0.01,
      //     bottom: 0.01,
      //     left: 0.01
      //   }
      // };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '0. Resumen de Maletas Procesadas por Día (Gráfica)') {
      this.pageSettings2 = {
        height: 9.60,
        width: 15.06,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '4. Resumen de Clasificación - Total (Gráfica)') {
      this.pageSettings2 = {
        height: 9.60,
        width: 11.35,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '7. Resumen por Aerolínea (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.33,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '11.Tiempo de Tránsito de Maleta (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.55,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '12. Reporte de Fin de Día (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.00,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '14. ATR (Gráfica)') {
      this.pageSettings2 = {
        height: 11.20,
        width: 17.45,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '18. Estadísticas EDS (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.15,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '20. KPI - Salidas Diarias (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.25,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print grahp style
    if (this.reportCategoryData?.Value === '25. Reporte Resumen de Mal Funcionamiento (Gráfica)') {
      this.pageSettings2 = {
        height: 10.60,
        width: 11.18,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }


    this.reportState = true
    if (this.reportCategoryData.Description === '26. Estado de Network') {
      console.log('reportState');

      this.reportState = true
    }

    this.trustedDashboardUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value);
    this.trustedDashboardUrl01 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.reportCategoryData.Value01);

    this.serviceUrl = 'http://xpl-matbag-app01:63863/reporting/reportservice/api/Viewer';
    this.reportServerUrl = 'http://xpl-matbag-app01:63863/reporting/api/site/site1';
    // this.serviceAuthorizationToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1sYWRtaW5AbWF0ZWMuY29tLmNvIiwibmFtZWlkIjoiMSIsInVuaXF1ZV9uYW1lIjoiYjVhZTAwM2QtNzEyMi00MDEyLThlZmItYTYwYzczNDVlMmU4IiwiSVAiOiJmZTgwOjoyNTI1OjRiMGE6Nzg2OTphMTAwIiwiaXNzdWVkX2RhdGUiOiIxNjgyNTE2NjA4IiwibmJmIjoxNjgyNTE2NjA4LCJleHAiOjE2ODMxMjE0MDgsImlhdCI6MTY4MjUxNjYwOCwiaXNzIjoiaHR0cDovL3hwbC1tYXRiYWctYXBwMDE6NjM4NjMvcmVwb3J0aW5nL3NpdGUvc2l0ZTEiLCJhdWQiOiJodHRwOi8veHBsLW1hdGJhZy1hcHAwMTo2Mzg2My9yZXBvcnRpbmcvc2l0ZS9zaXRlMSJ9.3mOINdyyaOjK0NY4xhj_SWpVOa2KEzHUrPrwypGBMZc';
    this.serviceAuthorizationToken = this.reportCategoryData.token_report_server;
    this.reportPath = `/XPL_V1/${this.reportCategoryData?.Description}`;
    // this.Remote = 'Remote'
    this.locale = "es-ES";
    this.isPrintMode = true;

    this.parameterSettings = {
      itemWidth: '250px',
      labelWidth: 'auto',
      dateTimePickerType: "DateTime",
      dateTimeFormat: "MM/dd/yyyy h:mm tt",
      timeDisplayFormat: "HH:mm",
      timeInterval: 60,
    };

    // Print report style
    if (this.reportCategoryData?.Description === '0. Resumen de Maletas Procesadas por Día') {
      this.pageSettings = {
        height: 9.60,
        width: 12.06,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }


    // Print report style
    if (this.reportCategoryData?.Description === '1. Reporte de Cronograma de Vuelo - Lista de Vuelos Activos') {
      return this.pageSettings = {
        height: 8.60,
        width: 11.48,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '2.Reporte de Cronograma de Vuelo - Lista de Vuelos Activos sin Asignación de Carrusel') {
      return this.pageSettings = {
        height: 8.60,
        width: 10.85,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '3. Reporte de Cronograma de Vuelo - Plantilla de Cronograma de Vuelo') {
      return this.pageSettings = {
        height: 10.60,
        width: 12.25,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '4. Resumen de Clasificación - Total') {
      return this.pageSettings = {
        height: 8.60,
        width: 11.4,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '5. Resumen de Clasificación por Vuelo Individual') {
      this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 11.76,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '6. Resumen de BSM Tag') {
      this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.65,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '7. Resumen por Aerolínea') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 11.18,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '8. Problema con BSM') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.53,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '9. BSM Raw') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.50,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '10. Fallo de Clasificación') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.55,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '11.Tiempo de Tránsito de Maleta') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 11.50,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '12. Reporte de Fin de Día') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.55,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '13. Resumen Operación por Equipo') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 11.72,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '15. ATR Reporte de Actividad') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.46,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '16. EDS - Performance de Nivel 1 y Nivel 2') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 11.32,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '17. EDS - Performance de Nivel 3') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 12.58,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '18. Estadísticas EDS') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.08,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '19. BPM Raw') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.55,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '20. KPI - Salidas Diarias') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 11.05,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '21. Reporte del Encoder') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.55,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '22. Procesamiento del Sistema') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.2,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '23. Estadísticas de Mantenimiento') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 9.2,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '24. Reporte de Mal funcionamiento') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.67,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '25. Reporte Resumen de Mal funcionamiento') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 10.60,
        width: 10.15,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '26. Estado de Network (Gráfica)') {
      // this.isPrintMode = false;
      return this.pageSettings = {
        height: 8.60,
        width: 10.95,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // Print report style
    if (this.reportCategoryData?.Description === '14. ATR') {
      this.pageSettings = {
        height: 10.60,
        width: 15.23,
        margins: {
          top: 0.01,
          right: 0.01,
          bottom: 0.01,
          left: 0.01
        }
      };
    }

    // else {
    //   // this.isPrintMode = false;
    //   this.pageSettings = {
    //     height: 8.69,
    //     width: 12.30,
    //     margins: {
    //       top: 0.01,
    //       right: 0.01,
    //       bottom: 0.01,
    //       left: 0.01
    //     }
    //   };
    // }


  }

  onReportPrint(event) {
    event.isStyleLoad = false;
  }

  onBeforeParameterAdd(event) {
    event.parameterSettings.dateTimePickerType = "DateTime";
    if (event.parameterModel.Name === "StartDate") {
      event.parameterSettings.minDateTime = new Date("4/5/2003 5:00:00 AM");
      event.parameterSettings.maxDateTime = new Date("4/15/2003 5:00:00 AM");
    }
    if (event.parameterModel.Name === "EndDate") {
      event.parameterSettings.minDateTime = new Date("5/10/2003 5:00:00 AM");
      event.parameterSettings.maxDateTime = new Date("5/20/2003 5:00:00 AM");
    }
  }

  goTo() {
    this.router.navigate(["/pages/reports/reports"]);
    return false;
  }

  backTo() {
    this.router.navigate(["/pages/reports/flightReport"]);
    return false;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
