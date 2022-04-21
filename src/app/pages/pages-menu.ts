/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesMenu {

  constructor(private accessChecker: NbAccessChecker) {}

  getMenu(): Observable<NbMenuItem[]> {
    // const dashboardMenu = [
    //   {
    //     title: 'Dashboard',
    //     icon: 'monitor-outline',
    //     link: '/pages/iot-dashboard',
    //     children: undefined,
    //   },
    // ];

    const menu: NbMenuItem[] = [
      {
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Layout',
        icon: 'layout-outline',
        children: [
          {
            title: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            title: 'List',
            link: '/pages/layout/list',
          },
          {
            title: 'Infinite List',
            link: '/pages/layout/infinite-list',
          },
          {
            title: 'Accordion',
            link: '/pages/layout/accordion',
          },
          {
            title: 'Tabs',
            pathMatch: 'prefix',
            link: '/pages/layout/tabs',
          },
        ],
      },
      {
        title: 'Forms',
        icon: 'edit-2-outline',
        children: [
          {
            title: 'Form Inputs',
            link: '/pages/forms/inputs',
          },
          {
            title: 'Form Layouts',
            link: '/pages/forms/layouts',
          },
          {
            title: 'Buttons',
            link: '/pages/forms/buttons',
          },
          {
            title: 'Datepicker',
            link: '/pages/forms/datepicker',
          },
        ],
      },
      {
        title: 'UI Features',
        icon: 'keypad-outline',
        link: '/pages/ui-features',
        children: [
          {
            title: 'Grid',
            link: '/pages/ui-features/grid',
          },
          {
            title: 'Icons',
            link: '/pages/ui-features/icons',
          },
          {
            title: 'Typography',
            link: '/pages/ui-features/typography',
          },
          {
            title: 'Animated Searches',
            link: '/pages/ui-features/search-fields',
          },
        ],
      },
      {
        title: 'Modal & Overlays',
        icon: 'browser-outline',
        children: [
          {
            title: 'Dialog',
            link: '/pages/modal-overlays/dialog',
          },
          {
            title: 'Window',
            link: '/pages/modal-overlays/window',
          },
          {
            title: 'Popover',
            link: '/pages/modal-overlays/popover',
          },
          {
            title: 'Toastr',
            link: '/pages/modal-overlays/toastr',
          },
          {
            title: 'Tooltip',
            link: '/pages/modal-overlays/tooltip',
          },
        ],
      },
      {
        title: 'Extra Components',
        icon: 'message-circle-outline',
        children: [
          {
            title: 'Calendar',
            link: '/pages/extra-components/calendar',
          },
          {
            title: 'Progress Bar',
            link: '/pages/extra-components/progress-bar',
          },
          {
            title: 'Spinner',
            link: '/pages/extra-components/spinner',
          },
          {
            title: 'Alert',
            link: '/pages/extra-components/alert',
          },
          {
            title: 'Calendar Kit',
            link: '/pages/extra-components/calendar-kit',
          },
          {
            title: 'Chat',
            link: '/pages/extra-components/chat',
          },
        ],
      },
      {
        title: 'Maps',
        icon: 'map-outline',
        children: [
          {
            title: 'Google Maps',
            link: '/pages/maps/gmaps',
          },
          {
            title: 'Leaflet Maps',
            link: '/pages/maps/leaflet',
          },
          {
            title: 'Bubble Maps',
            link: '/pages/maps/bubble',
          },
          {
            title: 'Search Maps',
            link: '/pages/maps/searchmap',
          },
        ],
      },
      {
        title: 'Charts',
        icon: 'pie-chart-outline',
        children: [
          {
            title: 'Echarts',
            link: '/pages/charts/echarts',
          },
          {
            title: 'Charts.js',
            link: '/pages/charts/chartjs',
          },
          {
            title: 'D3',
            link: '/pages/charts/d3',
          },
        ],
      },
      {
        title: 'Editors',
        icon: 'text-outline',
        children: [
          {
            title: 'TinyMCE',
            link: '/pages/editors/tinymce',
          },
          {
            title: 'CKEditor',
            link: '/pages/editors/ckeditor',
          },
        ],
      },
      {
        title: 'Tables & Data',
        icon: 'grid-outline',
        children: [
          {
            title: 'Order Table',
            link: '/pages/tables/OrderTable',
          },
          {
            title: 'SMART Order Table',
            link: '/pages/tables/SmartOrderTable',
          },
          {
            title: 'Smart Table',
            link: '/pages/tables/smart-table',
          },
          {
            title: 'Tree Grid',
            link: '/pages/tables/tree-grid',
          },
        ],
      },
      {
        title: 'Miscellaneous',
        icon: 'shuffle-2-outline',
        children: [
          {
            title: '404',
            link: '/pages/miscellaneous/404',
          },
        ],
      },
      
    ];
    
    const userMenu: NbMenuItem = {
      title: 'Usuarios',
      icon: 'people-outline',
      link: '/pages/users/list',
      children: undefined,
    };

    const configurationsMenu: NbMenuItem = {
      title: 'Configuración',
      icon: 'settings-outline',
      // link: '/pages/analytics/analytics',
      children: [ 
        {
          title: 'Usuarios',
          link: '/pages/users/list',
        },
        {
          title: 'Licencia',
          link: '/pages/users/licenses',
        },
        {
          title: 'Parametrización',
          link: '/pages/users/param',
        }
      ],
    };

    const animationMenu: NbMenuItem = {
      title: 'WCS',
      icon: 'monitor-outline',
      link: '/pages/animation/animationsvg',
      // link: '/pages/analytics/analytics',
      children: undefined,
    };
    const analyticsMenu: NbMenuItem = {
      title: 'Analitica',
      icon: 'bar-chart-outline',
      // link: '/pages/analytics/analytics',
      children: [
        {
          title: 'Ocupación',
          link: '/pages/analytics/ocupacion',
        },
        {
          title: 'Ordenes',
          link: '/pages/analytics/ordenes',
        },
        {
          title: 'Ordenes no transportables',
          link: '/pages/analytics/ordenesNotWips',
        },
        {
          title: 'Predictivo',
          link: '/pages/analytics/predictivo',
        },
        
      ],
    };

    const induccionMenu: NbMenuItem = {
      title: 'Inducción',
      icon: 'archive-outline',
      // link: '/pages/analytics/analytics',
      children: [,
        // {
        //   title: 'Sic',
        //   link: '/pages/sic-syncro/Sic',
        // },
        // {
        //   title: 'Syncro',
        //   link: '/pages/sic-syncro/syncro',
        // },
        {
          title: 'GanttSheduler',
          link: '/pages/sic-syncro/gantt',
        },
      ],
    };

    const procesosMenu: NbMenuItem = {
      title: 'Procesos',
      icon: 'grid-outline',
      link: '/pages/tables/OrderTable',
      children:[
        {
          title: 'Ordenes',
          link: '/pages/tables/OrderTable',
        },
        {
          title: 'Inducción',
          link: '/pages/analytics/orposition',
        },
        {
          title: 'Rutas',
          link: '/pages/analytics/routs',
        },
      ]
    };

    // const reportMenu: NbMenuItem = {
    //   title: 'Reporte',
    //   icon: 'pie-chart-outline',
    //   link: '/pages/charts/report',
    //   children: undefined,
    // };

    const repoMenu: NbMenuItem = {
      title: 'Reportes',
      icon: 'pie-chart-outline',
      // link: '/pages/charts/charts-report',
      children:[
        {
          title: 'Reporte Maquina',
          link: '/pages/charts/report',
        },
        {
          title: 'Reporte Sistema',
          link: '/pages/charts/charts-report',
        },
        // {
        //   title: 'Reportes',
        //   link: '/pages/charts/charts-reports2',
        // },
      ],
    };

    const alarmMenu: NbMenuItem = {
      title: 'Alarmas',
      icon: 'bell-outline',
      link: '/pages/tables/alarms',
      children: undefined,
    };

    const registerMenu: NbMenuItem ={
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

    //--------------------- new menú ----------------------------------

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
                title: 'Dashboard Salida', 
                link: '/pages/conveyor/BhsSalidas',
              },
              { 
                title: 'Security Feed Check In',
                link: '/pages/conveyor/bhs5',
              },
              {
                title: 'Security Feed',
                link: '/pages/conveyor/bhs2',
              },
              {
                title: 'Crossover',
                link: '/pages/conveyor/bhs10',
              },
    
              {
                title: 'Transfer Line',
                link: '/pages/conveyor/bhs1',
              },
              {
                title: 'Make Up',
                link: '/pages/conveyor/bhs3',
              },
              {
                title: 'Alarm Line',
                link: '/pages/conveyor/bhs4',
              },
              {
                title: 'Clear Line',
                link: '/pages/conveyor/bhs6',
              },
              {
                title: 'Security Shunt',
                link: '/pages/conveyor/bhs9', 
              },
              {
                title: 'On Screen Resolution Line',
                link: '/pages/conveyor/bhs7', 
              },
              {
                title: 'Manual Encode',
                link: '/pages/conveyor/bhs8',
              },
            ]
          },

          { 
            title: 'BHS Llegada',
            link: '/pages/conveyor/bhs5',
            children: [
              {
                title: 'Dashboard Llegada',
                link: '/pages/conveyor/info',
              },
              {
                title: 'Inbound 1',
                link: '/pages/conveyor/ib1',
              },
              {
                title: 'Inbound 2',
                link: '/pages/conveyor/ib2',
              },
              {
                title: 'Inbound 3',
                link: '/pages/conveyor/ib3',
              },
            ]
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
          title: 'Induccion Mensajes AMS',
          link: '/pages/sita/MessageAMS',
        },
        {
          title: 'Induccion Mensajes BM',
          link: '/pages/sita/MessageBM',
        },
      ],
    };

    const functionMenu: NbMenuItem = {
      title: 'Información',
      icon: 'archive-outline',
      // link: '/pages/analytics/analytics',
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
          title: 'Induccion Mensajes AMS',
          link: '/pages/sita/MessageAMS',
        },
        {
          title: 'Induccion Mensajes BM',
          link: '/pages/sita/MessageBM',
        },
      ],
    };

    const SchedulerMenu1: NbMenuItem = {
      title: 'Asignación de aerolineas',
      icon: 'calendar-outline',
      // link: '/pages/analytics/analytics',
      children: [
        
        {
          title: 'Asignación de Salidas',
          link: '/pages/gantt/ganttScheduler',
        },
      ],
    };

    const cosumeMenu: NbMenuItem = {
      title: 'Consumo energético',
      icon: 'activity-outline',
      // link: '/pages/analytics/analytics',
      children: [
        {
          title: 'Consumo generales',
          link: '/pages/conveyor/energy',
        },
        {
          title: 'Consumo por zonas',
          link: '/pages/conveyor/energyZone',
        },
        // {
        //   title: 'GanttSheduler',
        //   link: '/pages/sic-syncro',
        // },
      ],
    };

    const repocbisMenu: NbMenuItem = {
      title: 'Reportes',
      icon: 'pie-chart-outline',
      // link: '/pages/charts/charts-report',
      children:[
        {
          title: 'Eficiencia ATR´S', 
          link: '/pages/conveyor/Readerefficiency',
        },
        {
          title: 'Estadisticas EDS',
          link: '/pages/reports/edsstatistics',
        },
        {
          title: 'Informe volumen',
          link: '/pages/reports/report1',
        },
        // {
        //   title: 'Informe diario volumen equipaje',
        //   link: '/pages/reports-pia/report2',
        // },
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
        // {
        //   title: 'Informe equipaje CBRA',
        //   link: '/pages/reports-pia/report6',
        // },
        // {
        //   title: 'Informe de rendimiento por hora BHS ( Througput)',
        //   link: '/pages/reports-pia/report7',
        // },
        {
          title: 'Informe resumen diario por hora',
          link: '/pages/reports/report8',
        },
        {
          title: 'Informe mensual',
          link: '/pages/reports/report10',
        },
      ],
    };

    const configurationMenu: NbMenuItem = {
      title: 'Configuración',
      icon: 'settings-outline',
      // link: '/pages/analytics/analytics',
      children: [ 
        {
          title: 'Usuarios',
          link: '/pages/users/list',
        },
        {
          title: 'Licencia',
          link: '/pages/users/licenses',
        },
        {
          title: 'Integración SITA AMS',
          // link: '/pages/sita/SitaMessage',
          children: [
            {
            title: 'Recepción Notificaciónes AMS',
            link: '/pages/sita/ParametrizacionAMS',
          },
        ]},
        {
          title: 'Integración SITA BagMessage',
          // link: '/pages/sita/SitaMessage',
          children: [
            {
            title: 'Recepción Notificaciónes BM',
            link: '/pages/sita/ParametrizacionBM',
          },
        ]},
      ],
    };

    return this.accessChecker.isGranted('view', 'fullMenu')
      .pipe(map(hasAccess => {
        if (hasAccess) {
          // return [...dashboardMenu, orderMenu, userMenu, ...menu,registerMenu];
          // return [...dashboardMenu, orderMenu, reportMenu, analyticsMenu, userMenu, alarmMenu, registerMenu];
          return [...dashboardMenu, functionMenu, SchedulerMenu1, cosumeMenu, repocbisMenu, configurationMenu, alarmMenu];
        } else {
          //return [...dashboardMenu, ...menu];
          return [...dashboardMenu, procesosMenu, alarmMenu];
        }
      }));
  }
}
