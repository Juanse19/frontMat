import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { SicSyncroRoutingModule } from './sic-syncro-routing.module';
import { SicComponent } from './sic/sic.component';
import { SyncroComponent } from './syncro/syncro.component';
import { SicSyncroComponent } from './sic-syncro.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GanttComponent } from './gantt/gantt.component'; 
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { EditService , SelectionService, ToolbarService,DayMarkersService } from '@syncfusion/ej2-angular-gantt';


@NgModule({
  declarations: [SicComponent, SyncroComponent, SicSyncroComponent, GanttComponent],
  imports: [
    CommonModule, 
    SicSyncroRoutingModule,
    Ng2SmartTableModule,
    ThemeModule, 
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    GridModule,
    DropDownListAllModule,
    GanttAllModule,
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    EditService , 
    SelectionService, 
    ToolbarService,
    DayMarkersService],
})
export class SicSyncroModule { }
