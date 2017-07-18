import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RechargeComponent} from './recharge/recharge.component'
import {HomeComponent} from './home/home.component'
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  // {
  //   path: '',
  //   children: []
  // },
     { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'recharge',  component: RechargeComponent },
    { path: 'dashboard',  component: DashboardComponent },
    {path: 'home', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
