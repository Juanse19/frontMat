import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { RolesCreateComponent } from './roles-create/roles-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { UserRolesComponent } from './user-roles/user-roles.component';

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
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AssingRoleUsersComponent } from './assing-role-users/assing-role-users.component';

const NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
 
  NbRadioModule,
  NbSelectModule,
  NbInputModule,
  NbCheckboxModule,
];


@NgModule({
  declarations: [RolesComponent, RolesTableComponent, RolesCreateComponent, AssingRoleUsersComponent,UserRolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ...NB_MODULES,
  ]
})
export class RolesModule { }
