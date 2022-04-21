import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamTXComponent } from "./team-tx.component";

const routes: Routes = [
  {
    path: '',
    component: TeamTXComponent,
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
export class TeamTXRoutingModule { }
