import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationComponent } from './animation.component';
import { AnimationSvgComponent } from './animation-svg/animation-svg.component';


const routes: Routes = [{
  path: '',
  component: AnimationComponent,
  children: [{
    path: 'animationsvg',
    component: AnimationSvgComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimationRoutingModule { }
