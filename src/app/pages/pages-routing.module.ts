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
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'conveyor',
      loadChildren: () => import('./conveyor/conveyor.module')
        .then(m => m.ConveyorModule)
        .catch(err => console.error(err))
    },
    {
      path: 'zone-teams',
      loadChildren: () => import('./zone-teams/zone-teams.module')
        .then(m => m.ZoneTeamsModule)
        .catch( err => console.log('Oh no!', err)),
    },
    {
      path: 'gantt',
      loadChildren: () => import('./gantt-schedule/gantt-schedule.module')
        .then(m => m.GanttScheduleModule)
        .catch( err => console.log('Oh no!', err)),
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule)
        .catch( err => console.log('Oh no!', err)),
    },
    {
      path: 'sita',
      loadChildren: () => import('./sita/sita.module')
        .then((m) => m.SitaModule)
        .catch( err => console.log('Oh no!', err))
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'roles',
      loadChildren: () => import('./roles/roles.module')
        .then(m => m.RolesModule),
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
