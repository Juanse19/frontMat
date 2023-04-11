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
import { ThemeModule } from '../../@theme/theme.module';
import { GanttScheduleRoutingModule } from './gantt-schedule-routing.module';
import { GanttScheduleComponent } from './gantt-schedule.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SchedulerganttComponent } from './schedulergantt/schedulergantt.component';
import { EditService , FilterService, SortService, SelectionService, ToolbarService, 
         DayMarkersService } from '@syncfusion/ej2-angular-gantt';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
// import { SchedulerSitaComponent } from './scheduler-sita/scheduler-sita.component';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { WindowsSchedulerComponent } from './windows-scheduler/windows-scheduler.component';
import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowFormComponent } from './window-form/window-form.component';
import { SearchShedulerComponent } from './search-sheduler/search-sheduler.component'
import { GridModule, ResizeService  } from '@syncfusion/ej2-angular-grids';
// import { PageService, GroupService } from '@syncfusion/ej2-angular-grids';
import { TabAllModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [GanttScheduleComponent, SchedulerganttComponent,  WindowsSchedulerComponent, WindowFormComponent, SearchShedulerComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbSpinnerModule,
    NbActionsModule,
    NbButtonModule,
    NbDatepickerModule,
    NbCheckboxModule,
    GanttScheduleRoutingModule,
    GanttAllModule,
    DialogModule,
    ThemeModule,
    NbDatepickerModule.forRoot(),
    DatePickerAllModule, 
    TimePickerAllModule, 
    DateTimePickerAllModule,
    DateTimePickerModule,
    DatePickerModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    TabAllModule
  ],
  providers: [ EditService , FilterService, SortService, SelectionService, ToolbarService, DayMarkersService, ],
  bootstrap: [GanttScheduleModule],
})
export class GanttScheduleModule { }
