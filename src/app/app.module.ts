import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MdAutocompleteModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechargeComponent } from './recharge/recharge.component';
// import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxTestComponent } from './ngx-test/ngx-test.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import 'hammerjs';
import { ThreeJsComponent } from './three-js/three-js.component';
import { GooglemapComponent } from './googlemap/googlemap.component';

import * as $ from 'jquery';

@NgModule({
  declarations: [
    AppComponent,
    RechargeComponent,
    // LineChartComponent,
    NgxTestComponent,
    HomeComponent,
    DashboardComponent,
    ThreeJsComponent,
    GooglemapComponent
  ],
  imports: [
    // NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
   BrowserAnimationsModule,
   NgxChartsModule,
   MaterialModule,
   FlexLayoutModule,
   AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
    }),
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
