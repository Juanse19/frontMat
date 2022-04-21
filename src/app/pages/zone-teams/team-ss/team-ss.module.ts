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

import { TeamSSRoutingModule } from "./team-ss-routing.module";
import { TeamSsComponent } from "./team-ss.component";
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";
import { AppComponent } from "../../../app.component";
import { Ss1_1Component } from './ss1.1/ss1.1.component';
import { Ss1_2Component } from './ss1.2/ss1.2.component';
import { Ss1_3Component } from './ss1.3/ss1.3.component';
import { Ss1_4Component } from './ss1.4/ss1.4.component';
import { Ss1_5Component } from './ss1.5/ss1.5.component';
import { Ss1_6Component } from './ss1.6/ss1.6.component';

@NgModule({
  declarations: [TeamSsComponent, Ss1_1Component, Ss1_2Component, Ss1_3Component, Ss1_4Component, Ss1_5Component, Ss1_6Component],
  imports: [
    CommonModule,
    TeamSSRoutingModule,
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
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class TeamSSModule {}
