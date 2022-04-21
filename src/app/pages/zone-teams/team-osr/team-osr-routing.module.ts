import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamOsrComponent } from './team-osr.component';


const routes: Routes = [
  {
    path: '',
    component: TeamOsrComponent,
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
export class TeamOSRRoutingModule { }
