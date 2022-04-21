import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
 
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

import { TeamSFCRoutingModule } from './team-sfc-routing.module';
import { TeamSfcComponent } from './team-sfc.component';
import { Sf1_1Component } from './sf1.1/sf1.1.component';
import { Sf1_2Component } from './sf1.2/sf1.2.component';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { AppComponent } from '../../../app.component';
import { Sf3_1Component } from './sf3.1/sf3.1.component';
import { Sf3_2Component } from './sf3.2/sf3.2.component';
import { Cs1Component } from './cs1/cs1.component';
import { Cs1_3Component } from './cs1.3/cs1.3.component';
import { Cs1_4Component } from './cs1.4/cs1.4.component';
import { Cs1_5Component } from './cs1.5/cs1.5.component';
import { Cs1_6Component } from './cs1.6/cs1.6.component';
import { Cs1_7Component } from './cs1.7/cs1.7.component';
import { Cs3_3Component } from './cs3.3/cs3.3.component';
import { Cs3_4Component } from './cs3.4/cs3.4.component';
import { Cs3_5Component } from './cs3.5/cs3.5.component';
import { Cs3_6Component } from './cs3.6/cs3.6.component';
import { Cs3_7Component } from './cs3.7/cs3.7.component';


@NgModule({
  declarations: [TeamSfcComponent, Sf1_1Component, Sf1_2Component, Sf3_1Component, Sf3_2Component, Cs1Component, 
    Cs1_3Component, Cs1_4Component, Cs1_5Component, Cs1_6Component, Cs1_7Component, Cs3_3Component, 
    Cs3_4Component, Cs3_5Component, Cs3_6Component, Cs3_7Component,],
  imports: [
    CommonModule,
    TeamSFCRoutingModule,
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
  bootstrap: [AppComponent]
})
export class TeamSFCModule { }
