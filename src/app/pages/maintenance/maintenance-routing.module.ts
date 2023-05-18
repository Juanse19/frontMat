import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceTableComponent } from './maintenance-table/maintenance-table.component';


const routes: Routes = [{
  path: '',
  component: MaintenanceComponent,
  
  children: [
    {
      path: 'list',
      component: MaintenanceTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
