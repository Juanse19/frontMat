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


@NgModule({
  declarations: [SicComponent, SyncroComponent, SicSyncroComponent],
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
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService],
})
export class SicSyncroModule { }
