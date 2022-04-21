import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule,  NbDatepickerModule, NbIconModule, NbInputModule, NbButtonModule, NbTreeGridModule, NbTabsetModule, NbTooltipModule, NbPopoverModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';  
import { ReportsPiaRoutingModule } from './reports-pia-routing.module';
import { ReportsPiaComponent } from './reports-pia.component';
import { BaggagedataComponent } from './baggagedata/baggagedata.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { PhotoelectricComponent } from './photoelectric/photoelectric.component';
import { BhsFaultsComponent } from './bhs-faults/bhs-faults.component';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { BhsEventsComponent } from './bhs-events/bhs-events.component';
import { EdsstatisticsComponent } from './edsstatistics/edsstatistics.component';
import { AtrperformanceComponent } from './atrperformance/atrperformance.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BagtagTrackingComponent } from './bagtag-tracking/bagtag-tracking.component';
import { CbisThroughputComponent } from './cbis-throughput/cbis-throughput.component';
import { BoldComponent } from './bold/bold.component';
import { BoldReportDesignerModule  } from '@boldreports/angular-reporting-components';
// Report viewer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
// Report Designer
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';

// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import { BoldReportComponent } from './bold-report/bold-report.component';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
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

@NgModule({
  declarations: [ReportsPiaComponent, BaggagedataComponent, PhotoelectricComponent, BhsFaultsComponent, BhsEventsComponent, EdsstatisticsComponent, AtrperformanceComponent, BagtagTrackingComponent, CbisThroughputComponent, BoldComponent, BoldReportComponent, SeguimientoComponent, Report1Component, Report2Component, Report3Component, Report4Component, Report5Component, Report6Component, Report7Component, Report8Component, Report9Component, Report10Component,],
  imports: [
    CommonModule,
    ReportsPiaRoutingModule,
    Ng2SmartTableModule,
    NbCardModule, 
    NbButtonModule,
    NbIconModule, 
    NbInputModule, 
    ThemeModule,
    GridModule,
    DropDownListAllModule,
    ToolbarModule,
    DateTimePickerModule,
    NbDatepickerModule,
    DatePickerModule,
    DropDownListModule,
    FormsModule, 
    ReactiveFormsModule,
    // BoldReportDesignerModule,
    BoldReportViewerModule,
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService],
})
export class ReportsPiaModule { }
