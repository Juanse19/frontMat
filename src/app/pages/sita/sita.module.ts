import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
} from "@nebular/theme";
 
import { ThemeModule } from '../../@theme/theme.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SitaRoutingModule } from './sita-routing.module';
import { SitaMessageComponent } from './sita-message/sita-message.component';
import { SitaComponent } from './sita.component';
import { GridModule, ResizeService  } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { MessageAMSComponent } from './message-ams/message-ams.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ProgressBarAllModule } from '@syncfusion/ej2-angular-progressbar';
import { MessageBMComponent } from './message-bm/message-bm.component';
import { SitaMessageBMComponent } from './sita-message-bm/sita-message-bm.component';
import { StoreMessageComponent } from './store-message/store-message.component';




@NgModule({
  declarations: [SitaComponent, SitaMessageComponent, MessageAMSComponent, MessageBMComponent, 
    SitaMessageBMComponent, StoreMessageComponent ],
  imports: [
    CommonModule,
    SitaRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    // NbTabsetModule,
    // NbUserModule,
    // NbRadioModule,
    // NbSelectModule,
    // NbListModule,
    // NbIconModule,
    // NbSpinnerModule,
    NbDatepickerModule,
    // NbCheckboxModule,
    // ThemeModule,
    GridModule,
    DropDownListAllModule,
    ToolbarModule,
    DateTimePickerModule,
    DropDownListModule,
    DatePickerModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarAllModule,
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    GroupService,
    ResizeService ,
  ]
})
export class SitaModule { }
