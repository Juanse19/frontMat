import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';


@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    // GanttAllModule,
  ],
})
export class SchedulerModule { }
