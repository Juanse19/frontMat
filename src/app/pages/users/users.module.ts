/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule } from './users-routing.module';
import { AuthModule } from '../../@auth/auth.module';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

// components
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ComponentsModule } from '../../@components/components.module';

import { NgxResetPasswordComponent} from '../../@auth/components';
// components

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
} from '@nebular/theme';
import { LicenseComponent } from './license/license.component';
import { EditLicenComponent } from './edit-licen/edit-licen.component';

const  NB_MODULES = [
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
  NbInputModule,
  NbCheckboxModule,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    Ng2SmartTableModule,
    UsersRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    DropDownListAllModule,
    ...NB_MODULES,
  ],
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UserComponent,
    LicenseComponent,
    EditLicenComponent,
  ],
  entryComponents: [
  ],
  providers: [
    NgxResetPasswordComponent,
    PageService,
    SortService,
    FilterService,
    GroupService,
  ],
})
export class UsersModule { }
