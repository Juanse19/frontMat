import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component'
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { AssingRoleUsersComponent } from './assing-role-users/assing-role-users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { PermissionGuardGuard } from '../../@core/backend/common/services/guards/permission-guard.guard';

const routes: Routes = [{
  path: '',
  component: RolesComponent,
  
  children: [
    {
      path: 'list',
      component: RolesTableComponent,
      // data: { expectedPermission: 'role.index' }
    },
    {
      path: 'create-rol',
      component: RolesCreateComponent,
      canActivate: [PermissionGuardGuard], data: { expectedPermission: 'role.create' }
    },
    {
      path: 'edit-rol/:id',
      component: RolesCreateComponent,
      canActivate: [PermissionGuardGuard], data: { expectedPermission: 'role.edit' }
    },
    {
      path: 'role-assignation/:id',
      component: AssingRoleUsersComponent,
      canActivate: [PermissionGuardGuard], data: { expectedPermission: 'userRole.edit' }
    },
    {
      path: 'user-roles',
      component: UserRolesComponent,
      // data: { expectedPermission: 'userRole.index' }
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
