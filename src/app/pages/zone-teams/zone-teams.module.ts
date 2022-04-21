import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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

import { ZoneTeamsRoutingModule } from "./zone-teams-routing.module";
import { ZoneTeamsComponent } from "./zone-teams.component";
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

import { GridModule } from '@syncfusion/ej2-angular-grids';

import { CircularGaugeAllModule } from '@syncfusion/ej2-angular-circulargauge';
import { BrowserModule } from '@angular/platform-browser';
import { TeamSFCModule } from './team-sfc/team-sfc.module';
import { TeamSSModule } from './team-ss/team-ss.module'
import { AppComponent } from "../../app.component";

@NgModule({
  declarations: [ZoneTeamsComponent, ],
  imports: [
    CommonModule,
    ZoneTeamsRoutingModule,
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
    GridModule, 
    ButtonModule, 
    CircularGaugeAllModule, 
    TeamSFCModule,
    TeamSSModule,
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class ZoneTeamsModule {}
