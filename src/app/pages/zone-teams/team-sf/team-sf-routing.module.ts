import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSfComponent } from './team-sf.component';

const routes: Routes = [
  {
    path: '',
    component: TeamSfComponent,
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
export class TeamSFRoutingModule { }
