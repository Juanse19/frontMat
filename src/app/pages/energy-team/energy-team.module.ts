import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbTabsetModule,
  NbCardModule
} from '@nebular/theme';

import { EnergyTeamRoutingModule } from './energy-team-routing.module';
import { EnergyTeamComponent } from './energy-team.component';
import { SalidasBhsComponent } from './salidas-bhs/salidas-bhs.component';
import { LlegadasBhsComponent } from './llegadas-bhs/llegadas-bhs.component';


@NgModule({
  declarations: [EnergyTeamComponent, SalidasBhsComponent, LlegadasBhsComponent],
  imports: [
    CommonModule,
    EnergyTeamRoutingModule,
    NbTabsetModule,
    NbCardModule
  ]
})
export class EnergyTeamModule { }
