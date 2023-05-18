/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';


@Injectable()
export class PagesMenu {

  alive: boolean = true;
  public access?: any;
  public superAdmin?: any;

  constructor(private accessChecker: NbAccessChecker,
    private authService: NbAuthService,) {

    this.authService.getToken()
    .pipe(takeWhile(() => this.alive))
    .subscribe((res:any) => {
      
      let email = res.accessTokenPayload.user.email
      // console.log(email);
      this.superAdmin = email == 'mladmin@matec.com.co' ?  true : false 
      // console.log('data', this.superAdmin);
      this.access = res.accessTokenPayload.user.access;
    });

  // this.access = this.userStore.getUser()?.access
  
 }

  getMenu(): Observable<NbMenuItem[]> {
    
    // --------------------- new menú ----------------------------------

    const dashboardMenu = [
      {
        title: 'Dashboard',
        icon: 'monitor-outline',
        link: '/pages/iot-dashboard',
        children: [
          
          { 
            title: 'BHS Salida',
            link: '/pages/conveyor/bhs5',
            children: [
              {
                title: 'Dashboard salida', 
                link: '/pages/conveyor/BhsSalidas',
              },
              { 
                title: 'SFC-Security feed checkin line',
                link: '/pages/conveyor/bhs5',
              },
              {
                title: 'SF-Security feed line',
                link: '/pages/conveyor/bhs2',
              },
              {
                title: 'XO-Crossover line',
                link: '/pages/conveyor/bhs10',
              },
    
              {
                title: 'TX-Transfer line',
                link: '/pages/conveyor/bhs1',
              },
              {
                title: 'MU-Make up line',
                link: '/pages/conveyor/bhs3',
              },
              {
                title: 'AL-Alarm line',
                link: '/pages/conveyor/bhs4',
              },
              {
                title: 'CL-Clear line',
                link: '/pages/conveyor/bhs6',
              },
              {
                title: 'SS-Security shunt line',
                link: '/pages/conveyor/bhs9', 
              },
              {
                title: 'OSR-On Screen resolution line',
                link: '/pages/conveyor/bhs7', 
              },
              {
                title: 'ME-Manual encode line',
                link: '/pages/conveyor/bhs8',
              },
            ],
          },

          { 
            title: 'BHS Llegada',
            link: '/pages/conveyor/bhs5',
            children: [
              {
                title: 'Dashboard llegada',
                link: '/pages/conveyor/info',
              },
              {
                title: 'Inbound line 1',
                link: '/pages/conveyor/ib1',
              },
              {
                title: 'Inbound line 2',
                link: '/pages/conveyor/ib2',
              },
              {
                title: 'Inbound line 3',
                link: '/pages/conveyor/ib3',
              },
            ],
          },

          
        ],
      },
    ];

    const informacionMenu: NbMenuItem = {
      title: 'Información',
      icon: 'archive-outline',
      children: [
        
        {
          title: 'Equipos',
          link: '/pages/conveyor/team',
        },
        {
          title: 'Funcionamiento del sistema',
          link: '/pages/conveyor/functioning',
        },
        {
          title: 'Induccion mensajes AMS',
          link: '/pages/sita/MessageAMS',
        },
        {
          title: 'Induccion mensajes BM',
          link: '/pages/sita/MessageBM',
        },
      ],
    };

    const functionMenu: NbMenuItem = {
      title: 'Información',
      icon: 'archive-outline',
      // link: '/pages/analytics/analytics',
      children: [
        
        // {
        //   title: 'Equipos',
        //   link: '/pages/conveyor/team',
        // },
        // {
        //   title: 'Funcionamiento del sistema',
        //   link: '/pages/conveyor/functioning',
        // },
        // {
        //   title: 'Induccion Mensajes AMS',
        //   link: '/pages/sita/MessageAMS',
        // },
        // {
        //   title: 'Induccion Mensajes BM',
        //   link: '/pages/sita/MessageBM',
        // },
      ],
    };

    const SchedulerMenu1: NbMenuItem = {
      title: 'Asignación de aerolíneas',
      icon: 'calendar-outline',
      link: '/pages/gantt/ganttScheduler',
      hidden: !this.access.includes('assignment.index')
      // children: [
      //   {
      //     title: 'Asignación de Salidas',
      //     link: '/pages/gantt/ganttScheduler',
      //   }
      // ],
    };

    const cosumeMenu: NbMenuItem = {
      title: 'Consumo energético',
      icon: 'activity-outline',
      // link: '/pages/analytics/analytics',
      children: [
        // {
        //   title: 'Consumo generales',
        //   link: '/pages/conveyor/energy',
        // },
        {
          title: 'Consumo por zonas',
          link: '/pages/conveyor/energyZone',
        },
        {
          title: 'Consumo por zonas V2.0',
          link: '/pages/energy-team',
        },
      ],
    };

    const repocbisMenu: NbMenuItem = {
      title: 'Reportes',
      icon: 'pie-chart-outline',
      // link: '/pages/charts/charts-report',
      children: [
        {
          title: 'Eficiencia ATR´S', 
          link: '/pages/conveyor/Readerefficiency',
        },
        {
          title: 'Estadisticas EDS',
          link: '/pages/reports/edsstatistics',
        },
        {
          title: 'Funcionamiento del sistema',
          link: '/pages/conveyor/functioning',
        },
        {
          title: 'Informe volumen',
          link: '/pages/reports/report1',
        },
        {
          title: 'Informe ejecutivo BHS - SSI',
          link: '/pages/reports/report3',
        },
        {
          title: 'Informe ejecutivo CBRA - SSI',
          link: '/pages/reports/report4',
        },
        {
          title: 'Informe seguimiento de PEC',
          link: '/pages/reports/report5',
        },
        {
          title: 'Informe resumen diario por hora',
          link: '/pages/reports/report8',
        },
        {
          title: 'Informe mensual',
          link: '/pages/reports/report10',
        },
        //-------------------//----------------------------------------------------
        {
          title: 'ReportSita',
          group: true,
        },
        {
          title: 'Reporte de Cronograma de Vuelo - Lista de Vuelos Activos',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte de Cronograma de Vuelo - Lista de Vuelos Activos sin Asignacion de Carrusel',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte de Cronograma de Vuelo - Plantilla de Cronograma de Vuelo',
          link: '/pages/reports/report9',
        },
        {
          title: 'Resumen de Clasificacion - Total ',
          link: '/pages/reports/report9',
        },
        {
          title: 'Resumen de Clasificacion por Vuelo Individual',
          link: '/pages/reports/report9',
        },
        {
          title: 'Resumen de BSM Tag',
          link: '/pages/reports/report9',
        },
        {
          title: 'Resumen por Aerolinea',
          link: '/pages/reports/report9',
        },
        {
          title: 'Problema con BSM',
          link: '/pages/reports/report9',
        },
        {
          title: 'Tiempo de Transito de Maleta',
          link: '/pages/reports/report9',
        },
        {
          title: 'Procesamiento del Sistema',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte de Fin de Dia',
          link: '/pages/reports/report9',
        },
        {
          title: 'Resumen operacion por Equipo',
          link: '/pages/reports/report9',
        },
        {
          title: 'Estadisticas de Mantenimiento',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte de Malfuncionamiento',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte Resumen de Malfuncionamiento',
          link: '/pages/reports/report9',
        },
        {
          title: 'ATR',
          link: '/pages/reports/report9',
        },
        {
          title: 'ATR Reporte de Acitividad',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte del Encoder',
          link: '/pages/reports/report9',
        },
        {
          title: 'Fallo de Clasificacion',
          link: '/pages/reports/report9',
        },
        {
          title: 'Estado de Network',
          link: '/pages/reports/report9',
        },
        {
          title: 'EDS - Performance de Nivel 1 y Nivel 2',
          link: '/pages/reports/report9',
        },
        {
          title: 'EDS - Performance de Nivel 3',
          link: '/pages/reports/report9',
        },
        {
          title: 'HBS Performance',
          link: '/pages/reports/report9',
        },
        {
          title: 'HBS Resumen de Screening',
          link: '/pages/reports/report9',
        },
        {
          title: 'Performance del Tiempo de Minimo de Conexion',
          link: '/pages/reports/report9',
        },
        {
          title: 'Reporte de Performance del Sistema por Sector',
          link: '/pages/reports/report9',
        },
        {
          title: 'KPI - Salidas Diarias',
          link: '/pages/reports/report9',
        },
        {
          title: 'Performance por Aerolinea',
          link: '/pages/reports/report9',
        },
        {
          title: 'Tiempo en Sistema',
          link: '/pages/reports/report9',
        },
        {
          title: 'Ocurrencias por Carrusel	',
          link: '/pages/reports/report9',
        },
      ],
    };

    const reportsMenu: NbMenuItem = {
      title: 'ReportesV2',
      icon: 'pie-chart-outline',
      link: '/pages/reports-pia/report2',
    };

    const reportMenu: NbMenuItem = {
      title: 'Reportes',
      icon: 'pie-chart-outline',
      link: '/pages/reports/reports',
      hidden: !this.access.includes('report.index'),
    };

    const configurationMenu: NbMenuItem = {
      title: 'Configuración',
      icon: 'settings-outline',
      hidden: !this.access.includes('configuracion.index'),
      // link: '/pages/analytics/analytics',
      children: [ 
        {
          title: 'Usuarios',
          link: '/pages/users/list',
          hidden: !this.access.includes('user.index')
        },
        {
          title: 'Roles',
          link: '/pages/roles/list',
          hidden: !this.access.includes('role.index')
        },
        {
          title: 'Asignar roles a usuarios',
          link: '/pages/roles/user-roles',
          hidden: !this.access.includes('userRole.index')
        },
        {
          title: 'Licencia',
          link: '/pages/users/licenses',
          hidden: !this.superAdmin
        },
        {
          title: 'Reportes parametrizables',
          link: '/pages/users/reportParametrizable',
          hidden: !this.superAdmin
        },
        {
          title: 'Parametrización de aerolíneas',
          link: '/pages/sita/airline',
          hidden: !this.superAdmin
        },
        {
          title: 'Integración SITA AMS',
          // link: '/pages/sita/SitaMessage',
          hidden: !this.superAdmin,
          children: [
            {
            title: 'Parametrización',
            link: '/pages/sita/ParametrizacionAMS',
            hidden: !this.access.includes('parametersAMS.index')
          },
          {
            title: 'Inducción manual',
            link: '/pages/sita/MessageAMS',
            hidden: !this.access.includes('manualinduction.index')
          },
          {
            title: 'Mensajes almacenados',
            link: '/pages/sita/storeMessage',
            hidden: !this.access.includes('messageAMS.index')
          },
        ]},
        {
          title: 'Integración SITA BM',
          // link: '/pages/sita/SitaMessage',
          hidden: !this.superAdmin,
          children: [
            {
            title: 'Parametrización',
            link: '/pages/sita/ParametrizacionBM',
            hidden: !this.access.includes('parametersBM.index')
          },
          {
            title: 'Mensajes almacenados',
            link: '/pages/sita/MessageBM',
            hidden: !this.access.includes('messageBM.index')
          },
        ]},
      ],
    };

    const maintenanceMenu: NbMenuItem = {
      title: 'Mantenimiento',
      icon: 'scissors-outline',
      link: '/pages/maintenance/list',
      hidden: !this.access.includes('alarms.index'),
      children: undefined,
    };
    
    const alarmMenu: NbMenuItem = {
      title: 'Log eventos',
      icon: 'bell-outline',
      link: '/pages/tables/alarms',
      hidden: !this.access.includes('alarms.index'),
      children: undefined,
    };

    const registerMenu: NbMenuItem = {
      title: 'Auth',
      icon: 'lock-outline',
      children: [ 
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
        {
          title: 'Request Password',
          link: '/auth/request-password',
        },
        {
          title: 'Reset Password',
          link: '/auth/reset-password',
        },
      ],
    };
     

    return this.accessChecker.isGranted('view', 'fullMenu')
      .pipe(map(hasAccess => {
        if (hasAccess) {
          // return [...dashboardMenu, orderMenu, userMenu, ...menu,registerMenu];
          // return [...dashboardMenu, orderMenu, reportMenu, analyticsMenu, userMenu, alarmMenu, registerMenu];
          // return [...dashboardMenu, SchedulerMenu1, cosumeMenu, reportMenu, configurationMenu, alarmMenu];
          return [...dashboardMenu, SchedulerMenu1, reportMenu, maintenanceMenu, alarmMenu,  configurationMenu];
        } else {
          // return [...dashboardMenu, ...menu];
          return [...dashboardMenu, SchedulerMenu1, reportMenu, maintenanceMenu, alarmMenu, configurationMenu];
        }
      }));

  }
  
}
