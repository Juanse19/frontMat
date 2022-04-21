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

import { TeamSFRoutingModule } from './team-sf-routing.module';
import { TeamSfComponent } from './team-sf.component';
import { Sf1Component } from './sf1/sf1.component';
import { Sf1_4Component } from './sf1.4/sf1.4.component';
import { Sf1_5Component } from './sf1.5/sf1.5.component';
import { Sf1_6Component } from './sf1.6/sf1.6.component';
import { Sf1_7Component } from './sf1.7/sf1.7.component';
import { Sf1_8Component } from './sf1.8/sf1.8.component';
import { Sf1_9Component } from './sf1.9/sf1.9.component';
import { Sf1_10Component } from './sf1.10/sf1.10.component';
import { Sf1_11Component } from './sf1.11/sf1.11.component';
import { Sf1_12Component } from './sf1.12/sf1.12.component';
import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { AppComponent } from '../../../app.component';
import { Sf3_4Component } from './sf3.4/sf3.4.component';
import { Sf3_5Component } from './sf3.5/sf3.5.component';
import { Sf3_6Component } from './sf3.6/sf3.6.component';
import { Sf3_7Component } from './sf3.7/sf3.7.component';
import { Sf3_8Component } from './sf3.8/sf3.8.component';
import { Sf3_9Component } from './sf3.9/sf3.9.component';
import { Sf3_10Component } from './sf3.10/sf3.10.component';
import { Sf3_11Component } from './sf3.11/sf3.11.component';


@NgModule({
  declarations: [TeamSfComponent, Sf1Component, Sf1_4Component, Sf1_5Component, Sf1_6Component, Sf1_7Component, 
    Sf1_8Component, Sf1_9Component, Sf1_10Component, Sf1_11Component, Sf1_12Component, Sf3_4Component, 
    Sf3_5Component, Sf3_6Component, Sf3_7Component, Sf3_8Component, Sf3_9Component, Sf3_10Component, Sf3_11Component,],
  imports: [
    CommonModule,
    TeamSFRoutingModule,
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
export class TeamSFModule { }
