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

import { TeamOSRRoutingModule } from "./team-osr-routing.module";
import { TeamOsrComponent } from "./team-osr.component";
import { AppComponent } from "../../../app.component";
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { Osr1_1Component } from './osr1.1/osr1.1.component';
import { Osr1_2Component } from './osr1.2/osr1.2.component';
import { Osr1_3Component } from './osr1.3/osr1.3.component';
import { Osr1_4Component } from './osr1.4/osr1.4.component';
import { Osr1_5Component } from './osr1.5/osr1.5.component';
import { Osr1_6Component } from './osr1.6/osr1.6.component';

@NgModule({
  declarations: [TeamOsrComponent, Osr1_1Component, Osr1_2Component, 
    Osr1_3Component, Osr1_4Component, Osr1_5Component, Osr1_6Component],
  imports: [
    CommonModule,
    TeamOSRRoutingModule,
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
export class TeamOSRModule {}
