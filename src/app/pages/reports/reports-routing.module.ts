import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { Report1Component } from './report1/report1.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Report4Component } from './report4/report4.component';
import { Report5Component } from './report5/report5.component';
import { Report6Component } from './report6/report6.component';
import { Report7Component } from './report7/report7.component';
import { Report8Component } from './report8/report8.component';
import { Report9Component } from './report9/report9.component';
import { Report10Component } from './report10/report10.component';
import { EdsstatisticsComponent } from './edsstatistics/edsstatistics.component';


const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'report1',  
        component: Report1Component, 
      },
      {
        path: 'report2',  
        component: Report2Component, 
      },
      {
        path: 'report3',  
        component: Report3Component, 
      },
      {
        path: 'report4',  
        component: Report4Component, 
      },
      {
        path: 'report5',  
        component: Report5Component, 
      },
      {
        path: 'report6',  
        component: Report6Component, 
      },
      {
        path: 'report7',  
        component: Report7Component, 
      },
      {
        path: 'report8',  
        component: Report8Component, 
      },
      {
        path: 'report9',  
        component: Report9Component, 
      },
      {
        path: 'report10',  
        component: Report10Component, 
      },
      { 
        path: 'edsstatistics',  
        component: EdsstatisticsComponent, 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
