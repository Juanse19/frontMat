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
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { PredictivoComponent } from './predictivo/predictivo.component';
import { OcupacionComponent } from './ocupacion/ocupacion.component';
import { OrdenesNoWipsComponent } from './ordenes-no-wips/ordenes-no-wips.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { AnalyticsComponent } from './analytics.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module'; 
import { ReportsComponent } from './reports/reports.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

 
@NgModule({
  declarations: [PredictivoComponent, OcupacionComponent, OrdenesNoWipsComponent, OrdenesComponent, AnalyticsComponent, ReportsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
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
export class AnalyticsModule { }
