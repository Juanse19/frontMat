import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitaComponent } from './sita.component';
import { SitaMessageComponent } from './sita-message/sita-message.component';
import { MessageAMSComponent } from './message-ams/message-ams.component';
import { MessageBMComponent } from './message-bm/message-bm.component';
import { SitaMessageBMComponent } from './sita-message-bm/sita-message-bm.component';
import { StoreMessageComponent } from './store-message/store-message.component';


const routes: Routes = [{
  path: '',
  component: SitaComponent,
  children: [
    {
      path: 'ParametrizacionAMS',
      component: SitaMessageComponent,
    },
    {
      path: 'MessageAMS',
      component: MessageAMSComponent,
    },
    {
      path: 'MessageBM',
      component: MessageBMComponent,
    },
    {
      path: 'ParametrizacionBM',
      component: SitaMessageBMComponent,
    },
    {
      path: 'storeMessage',
      component: StoreMessageComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitaRoutingModule { }
