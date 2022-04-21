import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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

import { TeamTXRoutingModule } from "./team-tx-routing.module";
import { TeamTXComponent } from "./team-tx.component";
import { CircularGaugeAllModule } from "@syncfusion/ej2-angular-circulargauge";

@NgModule({
  declarations: [TeamTXComponent],
  imports: [
    CommonModule,
    TeamTXRoutingModule,
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
    CircularGaugeAllModule,
  ],
})
export class TeamTXModule {}
