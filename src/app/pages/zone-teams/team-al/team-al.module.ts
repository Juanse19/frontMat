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
  
import { TeamALRoutingModule } from "./team-al-routing.module";
import { TeamALComponent } from "./team-al.component";
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";
import { Al1_1Component } from './al1.1/al1.1.component';
import { Al1_2Component } from './al1.2/al1.2.component';
import { Al1_3Component } from './al1.3/al1.3.component';
import { Al1_4Component } from './al1.4/al1.4.component';
import { Al1_5Component } from './al1.5/al1.5.component';
import { Al1_6Component } from './al1.6/al1.6.component';
import { Al1_7Component } from './al1.7/al1.7.component';
import { Al1_8Component } from './al1.8/al1.8.component';
import { Al1_9Component } from './al1.9/al1.9.component';
import { Al1_10Component } from './al1.10/al1.10.component';
import { Al1_11Component } from './al1.11/al1.11.component';
import { Al2_1Component } from './al2.1/al2.1.component';
import { Al2_2Component } from './al2.2/al2.2.component';
import { Al2_3Component } from './al2.3/al2.3.component';
import { Al2_4Component } from './al2.4/al2.4.component';

@NgModule({
  declarations: [TeamALComponent, Al1_1Component, Al1_2Component, Al1_3Component, Al1_4Component, Al1_5Component, Al1_6Component, Al1_7Component, Al1_8Component, Al1_9Component, Al1_10Component, Al1_11Component, Al2_1Component, Al2_2Component, Al2_3Component, Al2_4Component],
  imports: [
    CommonModule,
    TeamALRoutingModule,
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
export class TeamALModule {}
