import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {InfoComponent} from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AngularStickyThingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
