/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { AdminGuard } from '../../@auth/admin.guard';
import { LicenseComponent } from './license/license.component'
import { EditLicenComponent } from './edit-licen/edit-licen.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'list',
      canActivate: [AdminGuard],
      component: UsersTableComponent,
    },
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    { 
      path: 'current',
      component: UserComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: UserComponent,
    },
    {
      path: 'licenses',
      canActivate: [AdminGuard],
      component: LicenseComponent,
    },
    {
      path: 'editlicen',
      canActivate: [AdminGuard],
      component: EditLicenComponent,
    },
  ],
}];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {

}
