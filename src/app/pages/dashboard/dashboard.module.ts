/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbToggleModule,
  NbInputModule,
  NbAutocompleteModule,
  NbTooltipModule,
  NbPopoverModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { WcsComponent } from './rooms/wcs/wcs.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';
import { StatusCardPlaceholderComponent } from './status-card/status-card-placeholder.component';
import { AuthModule } from '../../@auth/auth.module';
import { JacComponent} from './JacComponent/jac.component';
// import { DialogElementsExample} from './JacPopupComponent/jacpopup.component'
// import { DialogElementsExampleDialog} from './JacPopupComponent/jacpopup.component'
import { WindowComponent} from './WindowPopupComponent/windowPopup.component';
import { HttpClientModule} from '@angular/common/http';
import {ApiGetService} from './WindowPopupComponent/apiGet.services';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { WindowComponent2} from './OrderPopup/orderPopup.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SystemOperationComponent } from './rooms/system-operation/system-operation.component';
import { BhsArrivalComponent } from './rooms/bhs-arrival/bhs-arrival.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { WindowPopComponentComponent } from './window-pop-component/window-pop-component.component';
import { ConveyorModule } from './../conveyor/conveyor.module';
import { BhsDashboardComponent } from './bhs-dashboard/bhs-dashboard.component'

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule,
    NgxEchartsModule,
    AuthModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    // FormsModule,
    NbToggleModule,
    NbInputModule,
    NbAutocompleteModule,
    Ng2SmartTableModule,
    NbTooltipModule,
    NbPopoverModule,
    GridModule,
    DialogModule,
    ConveyorModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    WcsComponent,
    TemperatureComponent,
    RoomsComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    StatusCardPlaceholderComponent,
    JacComponent,
    WindowComponent,
    WindowComponent2,
    SystemOperationComponent,
    BhsArrivalComponent,
    WindowPopComponentComponent,
    BhsDashboardComponent,
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService],
})
export class DashboardModule { }
