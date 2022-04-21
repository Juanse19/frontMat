import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMUComponent } from './team-mu.component';

const routes: Routes = [
  {
    path: '',
    component: TeamMUComponent,
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
export class TeamMURoutingModule { }
