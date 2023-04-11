import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { PermissionTableComponent } from './permission-table/permission-table.component'
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

const NB_MODULES = [
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
  NbToggleModule,
  NbTooltipModule
];


@NgModule({
  declarations: [PermissionsComponent, PermissionTableComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule, ...NB_MODULES
  ]
})
export class PermissionsModule { }
