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
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
import {PumpDataService} from './pump-data.service';

import * as $ from 'jquery';
import { NgxOximinComponent } from './ngx-oximin/ngx-oximin.component';

import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    RechargeComponent,
    // LineChartComponent,
    NgxTestComponent,
    HomeComponent,
    DashboardComponent,
    ThreeJsComponent,
    GooglemapComponent,
    NgxOximinComponent
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
    HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
            AngularFireDatabaseModule,
AngularFireAuthModule


  ],
  providers: [PumpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
