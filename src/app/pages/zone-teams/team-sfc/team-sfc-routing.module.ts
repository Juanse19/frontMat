import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSfcComponent } from './team-sfc.component'


const routes: Routes = [
  {
    path: '',
    component: TeamSfcComponent,
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
export class TeamSFCRoutingModule { }
