import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechargeComponent } from './recharge/recharge.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxTestComponent } from './ngx-test/ngx-test.component';

@NgModule({
  declarations: [
    AppComponent,
    RechargeComponent,
    LineChartComponent,
    NgxTestComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
   BrowserAnimationsModule,
   NgxChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
