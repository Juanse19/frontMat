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
    const dashboardMenu = [
      {
        title: 'Dashboard',
        icon: 'monitor-outline',
        link: '/pages/iot-dashboard',
        children: undefined,
      },
    ];

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
      children: [
        // {
        //   title: 'Inducción',
        //   link: '/pages/analytics/orposition',
        // },
        {
          title: 'Sic',
          link: '/pages/sic-syncro/Sic',
        },
        {
          title: 'Syncro',
          link: '/pages/sic-syncro/syncro',
        },
        // {
        //   title: 'Gantt',
        //   link: '/pages/sic-syncro/gantt',
        // },
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
    return this.accessChecker.isGranted('view', 'fullMenu')
      .pipe(map(hasAccess => {
        if (hasAccess) {
          // return [...dashboardMenu, orderMenu, userMenu, ...menu,registerMenu];
          // return [...dashboardMenu, orderMenu, reportMenu, analyticsMenu, userMenu, alarmMenu, registerMenu];
          return [...dashboardMenu, procesosMenu, induccionMenu, repoMenu, analyticsMenu, configurationMenu, alarmMenu];
        } else {
          //return [...dashboardMenu, ...menu];
          return [...dashboardMenu, procesosMenu, alarmMenu];
        }
      }));
  }
}
