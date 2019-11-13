import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularStickyThingsModule} from '@ng-sticky-things';
import {ScrollContainerComponent} from './scroll-container/scroll-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScrollContainerComponent
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
