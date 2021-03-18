import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimationRoutingModule } from './animation-routing.module';
import { AnimationComponent } from './animation.component';
import { AnimationSvgComponent } from './animation-svg/animation-svg.component';


@NgModule({
  declarations: [AnimationComponent, AnimationSvgComponent],
  imports: [
    CommonModule,
    AnimationRoutingModule
  ]
})
export class AnimationModule { }
