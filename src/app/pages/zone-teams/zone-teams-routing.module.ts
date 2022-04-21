import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZoneTeamsComponent } from './zone-teams.component';
import { TeamSfcComponent } from './team-sfc/team-sfc.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneTeamsComponent,
    children: [
    {
      path: 'teamsfc',
      loadChildren: () => import('./team-sfc/team-sfc.module')
        .then(m => m.TeamSFCModule),
    },
    {
      path: 'teamsf',
      loadChildren: () => import('./team-sf/team-sf.module')
        .then(m => m.TeamSFModule),
    },
    {
      path: 'teamss',
      loadChildren: () => import('./team-ss/team-ss.module')
        .then(m => m.TeamSSModule),
    },
    {
      path: 'teamox',
      loadChildren: () => import('./team-ox/team-ox.module')
        .then(m => m.TeamOXModule),
    },
    {
      path: 'teamosr',
      loadChildren: () => import('./team-osr/team-osr.module')
        .then(m => m.TeamOSRModule),
    },
    {
      path: 'teammu',
      loadChildren: () => import('./team-mu/team-mu.module')
        .then(m => m.TeamMUModule),
    },
    {
      path: 'teamme',
      loadChildren: () => import('./team-me/team-me.module')
        .then(m => m.TeamMEModule),
    },
    {
      path: 'teamtx',
      loadChildren: () => import('./team-tx/team-tx.module')
        .then(m => m.TeamTXModule),
    },
    {
      path: 'teamcl',
      loadChildren: () => import('./team-cl/team-cl.module')
        .then(m => m.TeamCLModule),
    },
    {
      path: 'teamal',
      loadChildren: () => import('./team-al/team-al.module')
        .then(m => m.TeamALModule),
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneTeamsRoutingModule { }
