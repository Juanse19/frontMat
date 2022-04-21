import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMEComponent } from './team-me.component';

const routes: Routes = [
  {
    path: '',
    component: TeamMEComponent,
    children: [
    // {
    //   path: 'sfc',
    //   component: SfcComponent,
    // },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMERoutingModule { }
