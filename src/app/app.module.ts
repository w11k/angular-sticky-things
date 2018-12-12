import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularStickyThingsModule} from '../../projects/angular-sticky-things/src/public_api';
import {InfoComponent} from './info/info.component';
import {DevComponent} from './dev/dev.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    DevComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularStickyThingsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
