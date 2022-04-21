import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GanttScheduleComponent } from './gantt-schedule.component';
import { SchedulerganttComponent } from './schedulergantt/schedulergantt.component';
// import { SchedulerSitaComponent } from './scheduler-sita/scheduler-sita.component';


const routes: Routes = [
  {
    path: '',
    component: GanttScheduleComponent,
    children: [
    {
      path: 'ganttScheduler',
      component: SchedulerganttComponent,
    },
    // {
    //   path: 'SchedulerPalmerola',
    //   component: SchedulerSitaComponent,
    // },
   
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttScheduleRoutingModule { }
