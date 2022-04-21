import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConveyorComponent } from './conveyor.component';
import { FunctioningComponent } from './functioning/functioning.component';
import { TeamComponent } from './team/team.component';
import { AccumulationComponent } from './accumulation/accumulation.component';
import { AssignComponent } from './assign/assign.component';
import { InfoComponent } from './info/info.component';
import { Bhs1Component } from './bhs1/bhs1.component';
import { Bhs2Component } from './bhs2/bhs2.component';
import { Bhs3Component } from './bhs3/bhs3.component';
import { Bhs4Component } from './bhs4/bhs4.component';
import { Bhs5Component } from './bhs5/bhs5.component';
import { Bhs6Component } from './bhs6/bhs6.component';
import { Bhs7Component } from './bhs7/bhs7.component';
import { Bhs8Component } from './bhs8/bhs8.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { Ib1Component } from './ib1/ib1.component';
import { Ib2Component } from './ib2/ib2.component';
import { Ib3Component } from './ib3/ib3.component';
import { Bhs9Component } from './bhs9/bhs9.component';
import { Bhs10Component } from './bhs10/bhs10.component';
import { WindowComponent } from './window/window.component';
import { EnergyComponent } from './energy/energy.component';
import { ConsumZoneComponent } from './consum-zone/consum-zone.component';
import { BsdComponent } from './bsd/bsd.component';
import { BhsSalidasComponent } from './bhs-salidas/bhs-salidas.component';
import { SchedulerSitaComponent } from './scheduler-sita/scheduler-sita.component';
import { ReaderefficiencyComponent } from './readerefficiency/readerefficiency.component';

const routes: Routes = [
  {
    path: '',
    component: ConveyorComponent,
    children: [
      {
        path: 'assign',
        component: AssignComponent,
      },
      {
        path: 'team',
        component: TeamComponent,
      },
      {
        path: 'accumulation',
        component: AccumulationComponent,
      },
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'functioning',
        component: FunctioningComponent,
      },
      {
        path: 'bhs1',
        component: Bhs1Component,
      },
      {
        path: 'bhs2',
        component: Bhs2Component,
      },
      {
        path: 'bhs3',
        component: Bhs3Component,
      },
      {
        path: 'bhs4',
        component: Bhs4Component,
      },
      {
        path: 'bhs5',
        component: Bhs5Component,
      },
      {
        path: 'bhs6',
        component: Bhs6Component,
      },
      {
        path: 'bhs7',
        component: Bhs7Component,
      },
      {
        path: 'bhs8',
        component: Bhs8Component,
      },
      {
        path: 'bhs9',
        component: Bhs9Component,
      },
      {
        path: 'bhs10',
        component: Bhs10Component,
      },
      {
        path: 'scheduler',
        component: SchedulerComponent,
      },
      {
        path: 'schedulerSita',
        component: SchedulerSitaComponent,
      },
      {
        path: 'ib1',
        component: Ib1Component,
      },
      {
        path: 'ib2',
        component: Ib2Component,
      },
      {
        path: 'ib3',
        component: Ib3Component,
      },
      {
        path: 'window',
        component: WindowComponent,
      },
      {
        path: 'energy',
        component: EnergyComponent,
      },
      {
        path: 'energyZone',
        component: ConsumZoneComponent,
      },
      {
        path: 'bsd',
        component: BsdComponent,
      },
      {
        path: 'BhsSalidas',
        component: BhsSalidasComponent,
      },
      {
        path: 'Readerefficiency',
        component: ReaderefficiencyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConveyorRoutingModule { }

export const routedComponents = [
  ConveyorComponent,
  TeamComponent,
  FunctioningComponent,
  InfoComponent,
];
