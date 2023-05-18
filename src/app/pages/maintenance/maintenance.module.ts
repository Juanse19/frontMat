import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

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

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceTableComponent } from './maintenance-table/maintenance-table.component';
import { WindowMaintenanceComponent } from './window-maintenance/window-maintenance.component';


@NgModule({
  declarations: [MaintenanceComponent, MaintenanceTableComponent, WindowMaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    GridModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
   
    NbRadioModule,
    NbSelectModule,
    NbInputModule,
    NbCheckboxModule,
    DatePickerModule,
    DialogModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
  ]
})
export class MaintenanceModule { }
