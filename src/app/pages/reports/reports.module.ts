import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
// Report Designer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';

// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';

import { BoldReportsModule } from '@boldreports/angular-reporting-components';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { Report5Component } from './report5/report5.component';
import { Report6Component } from './report6/report6.component';
import { Report7Component } from './report7/report7.component';
import { Report8Component } from './report8/report8.component';
import { Report9Component } from './report9/report9.component';
import { Report10Component } from './report10/report10.component';
import { EdsstatisticsComponent } from './edsstatistics/edsstatistics.component';
import { FlightReportComponent } from './flight-report/flight-report.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';

import '@boldreports/global/l10n/ej.localetexts.es-ES.min.js';
import '@boldreports/global/i18n/ej.culture.es-ES.min.js';
@NgModule({
  declarations: [
    ReportsComponent, 
    Report1Component, 
    Report2Component, 
    Report3Component,
    Report4Component,
    Report5Component,
    Report6Component,
    Report7Component,
    Report8Component,
    Report9Component,
    Report10Component,
    EdsstatisticsComponent,
    FlightReportComponent,
    SearchComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
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
    ReportsRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BoldReportsModule,
    TabAllModule
  ]
})
export class ReportsModule { }
