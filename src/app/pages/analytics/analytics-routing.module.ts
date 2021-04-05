import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { OcupacionComponent } from './ocupacion/ocupacion.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenesNoWipsComponent } from './ordenes-no-wips/ordenes-no-wips.component';
import { PredictivoComponent } from './predictivo/predictivo.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [{
  path: '',
  component: AnalyticsComponent,
  children: [
    {
      path: 'ocupacion',
      component: OcupacionComponent,
    },
    {
      path: 'ordenes',
      component: OrdenesComponent,
    },
    {
      path: 'ordenesNotWips',
      component: OrdenesNoWipsComponent,
    },
    {
      path: 'predictivo',
      component: PredictivoComponent,
    },
    {
      path: 'reportes',
      component: ReportsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
