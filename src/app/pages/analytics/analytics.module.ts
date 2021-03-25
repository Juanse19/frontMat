import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { PredictivoComponent } from './predictivo/predictivo.component';
import { OcupacionComponent } from './ocupacion/ocupacion.component';
import { OrdenesNoWipsComponent } from './ordenes-no-wips/ordenes-no-wips.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { AnalyticsComponent } from './analytics.component';


@NgModule({
  declarations: [PredictivoComponent, OcupacionComponent, OrdenesNoWipsComponent, OrdenesComponent, AnalyticsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
