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

import { TeamMURoutingModule } from './team-mu-routing.module';
import { TeamMUComponent } from './team-mu.component';
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";
import { Mu1_1Component } from './mu1.1/mu1.1.component';
import { Mu1_2Component } from './mu1.2/mu1.2.component';
import { Mu1_3Component } from './mu1.3/mu1.3.component';
import { Mu1_4Component } from './mu1.4/mu1.4.component';
import { Mu1_5Component } from './mu1.5/mu1.5.component';


@NgModule({
  declarations: [TeamMUComponent, Mu1_1Component, Mu1_2Component, Mu1_3Component, Mu1_4Component, Mu1_5Component],
  imports: [
    CommonModule,
    TeamMURoutingModule,
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
    CircularGaugeAllModule,
  ]
})
export class TeamMUModule { }
