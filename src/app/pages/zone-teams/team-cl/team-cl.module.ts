import { NgModule } from "@angular/core";
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

import { TeamCLRoutingModule } from "./team-cl-routing.module";
import { TeamclComponent } from "./team-cl.component";
import { Cl1_1Component } from "./cl1.1/cl1.1.component";
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";
import { Cl1_2Component } from './cl1.2/cl1.2.component';
import { Cl1_3Component } from './cl1.3/cl1.3.component';
import { Cl1_4Component } from './cl1.4/cl1.4.component';
import { Cl1_5Component } from './cl1.5/cl1.5.component';
import { Cl1_6Component } from './cl1.6/cl1.6.component';
import { Cl1_7Component } from './cl1.7/cl1.7.component';
import { Cl1_8Component } from './cl1.8/cl1.8.component';
import { Cl1_9Component } from './cl1.9/cl1.9.component';
import { Cl1_10Component } from './cl1.10/cl1.10.component';
import { Cl1_11Component } from './cl1.11/cl1.11.component';
import { Cl1_12Component } from './cl1.12/cl1.12.component';
import { Cl1_13Component } from './cl1.13/cl1.13.component';
import { Cl1_14Component } from './cl1.14/cl1.14.component';
import { Cl1_15Component } from './cl1.15/cl1.15.component';
import { Cl1_16Component } from './cl1.16/cl1.16.component';
import { Cl1_17Component } from './cl1.17/cl1.17.component';
import { Cl1_18Component } from './cl1.18/cl1.18.component';

@NgModule({
  declarations: [TeamclComponent, Cl1_1Component, Cl1_2Component, Cl1_3Component, Cl1_4Component, Cl1_5Component, 
    Cl1_6Component, Cl1_7Component, Cl1_8Component, Cl1_9Component, Cl1_10Component, Cl1_11Component, 
    Cl1_12Component, Cl1_13Component, Cl1_14Component, Cl1_15Component, Cl1_16Component, Cl1_17Component, 
    Cl1_18Component],
  imports: [
    CommonModule,
    TeamCLRoutingModule,
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
  ],
})
export class TeamCLModule {}
