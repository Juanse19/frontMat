import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSsComponent } from './team-ss.component';


const routes: Routes = [
  {
    path: '',
    component: TeamSsComponent,
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
export class TeamSSRoutingModule { }
