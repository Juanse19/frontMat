import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from "@angular/common";

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from "@nebular/theme";

import { TeamMERoutingModule } from './team-me-routing.module';
import { TeamMEComponent } from './team-me.component';
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";


@NgModule({
  declarations: [TeamMEComponent],
  imports: [
    CommonModule,
    TeamMERoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbCheckboxModule,
    CircularGaugeAllModule
  ]
})
export class TeamMEModule { }
