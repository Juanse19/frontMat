import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnergyTeamComponent } from './energy-team.component';


const routes: Routes = [{
  path: '',
  component: EnergyTeamComponent,
  children: [
    // {
    //   path: 'ParametrizacionAMS',
    //   component: SitaMessageComponent,
    // },
    // {
    //   path: 'MessageAMS',
    //   component: MessageAMSComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnergyTeamRoutingModule { }
