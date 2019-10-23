import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InfoComponent} from './info/info.component';
import {DevComponent} from './dev/dev.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularStickyThingsModule} from '../../projects/angular-sticky-things/src/lib/angular-sticky-things.module';
import {PosaContainerComponent} from './test-cases/posa-container/posa-container.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    DevComponent,
    HomeComponent,
    PosaContainerComponent
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
