/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTreeGridModule, NbRadioModule, NbCheckboxModule, 
  NbActionsModule, NbUserModule, NbDatepickerModule, NbButtonModule, NbToggleModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import {MeasureConverterPipe} from '../../@theme/pipes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import {ApiGetService} from './OrderTable/apiGet.services'
import {ApiWindowOrderPopup} from './WindowOrderPopup/apiWindowiOrderPopup.services'
import {WindowComponent} from './WindowOrderPopup/windowsOrderPopup.component'
import {ApiWindowCreateOrderPopup} from './WindowCreateOrderPopup/apiWindowCreateOrderPopup.services'
import {WindowCreateComponent} from './WindowCreateOrderPopup/windowsCreateOrderPopup.component'

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NbSelectModule,
    NbInputModule,
    NbCardModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
    NbToggleModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    WindowComponent,
    WindowCreateComponent,
  ],
  providers: [
    MeasureConverterPipe,
    ApiGetService,
    ApiWindowOrderPopup,
    ApiWindowCreateOrderPopup,
  ],
})
export class TablesModule { }
