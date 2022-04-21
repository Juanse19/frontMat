import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamALComponent } from './team-al.component';

const routes: Routes = [
  {
    path: '',
    component: TeamALComponent,
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
export class TeamALRoutingModule { }
