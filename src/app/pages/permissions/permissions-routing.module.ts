import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsComponent } from './permissions.component';
import { PermissionTableComponent } from './permission-table/permission-table.component';


const routes: Routes = [{
  path: '',
  component: PermissionsComponent,
  children: [
    {
      path: 'list',
      component: PermissionTableComponent,
    },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
