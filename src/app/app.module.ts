import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MdAutocompleteModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechargeComponent } from './recharge/recharge.component';
// import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxTestComponent } from './ngx-test/ngx-test.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    RechargeComponent,
    // LineChartComponent,
    NgxTestComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    // NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
   BrowserAnimationsModule,
   NgxChartsModule,
   MaterialModule,
   FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
