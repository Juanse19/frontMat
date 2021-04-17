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
  ]
})
export class SicSyncroModule { }
