import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SicSyncroComponent } from './sic-syncro.component'; 
import { SicComponent } from './sic/sic.component';
import { SyncroComponent } from './syncro/syncro.component';
import { GanttComponent } from './gantt/gantt.component';


const routes: Routes = [{
  path: '',
  component: SicSyncroComponent,
  children: [
    {
      path: 'Sic',
      component: SicComponent,
    },
    {
      path: 'syncro',
      component: SyncroComponent,
    },
    {
      path: 'gantt',
      component: GanttComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SicSyncroRoutingModule { }
