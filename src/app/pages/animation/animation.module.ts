import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@nebular/theme';
import { AnimationRoutingModule } from './animation-routing.module';
import { AnimationComponent } from './animation.component';
import { AnimationSvgComponent } from './animation-svg/animation-svg.component';
import { WindowComponent } from './WindowPopupComponent/windowPopup.component';
import { WindowComponent2 } from './OrderPopup/orderPopup.component';
import { AuthModule } from '../../@auth/auth.module';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AnimationComponent, AnimationSvgComponent, WindowComponent, WindowComponent2],
  imports: [
    CommonModule,
    AnimationRoutingModule,
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
    AuthModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    // FormsModule,
    NbToggleModule,
    NbInputModule,
    NbAutocompleteModule,
    Ng2SmartTableModule,
  ]
})
export class AnimationModule { }
