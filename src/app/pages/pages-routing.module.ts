/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    // {
    //   path: 'report',
    //   loadChildren: () => import('./charts/report/report.module')
    //     .then(m => m.ReportModule),
    // },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'analytics',
      loadChildren: () => import('./analytics/analytics.module')
        .then(m => m.AnalyticsModule),
    },
    {
      path: 'sic-syncro',
      loadChildren: () => import('./sic-syncro/sic-syncro.module')
        .then(m => m.SicSyncroModule),
    },
    // {
    //   path: 'animation',
    //   loadChildren: () => import('./animation/animation.module')
    //     .then(m => m.AnimationModule),
    // },
    {
      path: 'conveyor',
      loadChildren: () => import('./conveyor/conveyor.module')
        .then(m => m.ConveyorModule)
        .catch(err => console.error(err))
    },
    {
      path: 'zone-teams',
      loadChildren: () => import('./zone-teams/zone-teams.module')
        .then(m => m.ZoneTeamsModule),
    },
    {
      path: 'gantt',
      loadChildren: () => import('./gantt-schedule/gantt-schedule.module')
        .then(m => m.GanttScheduleModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'reports-pia',
      loadChildren: () => import('./reports-pia/reports-pia.module')
        .then(m => m.ReportsPiaModule),
    },
    {
      path: 'sita',
      loadChildren: () => import('./sita/sita.module')
        .then((m) => m.SitaModule)
        .catch( err => console.log('Oh no!', err))
    },
    {
      path: 'scheduler',
      loadChildren: () => import('./scheduler/scheduler.module')
        .then(m => m.SchedulerModule)
        .catch(err => console.error(err))
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'iot-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
