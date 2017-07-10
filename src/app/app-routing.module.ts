import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RechargeComponent} from './recharge/recharge.component'

const routes: Routes = [
  {
    path: '',
    children: []
  },
    { path: 'recharge',  component: RechargeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
