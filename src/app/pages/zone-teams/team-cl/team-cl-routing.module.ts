import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamclComponent } from './team-cl.component'


const routes: Routes = [
  {
    path: '',
    component: TeamclComponent,
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
export class TeamCLRoutingModule { }
