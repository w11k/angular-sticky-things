import {NgModule} from '@angular/core';
import {StickyThingDirective} from './sticky-thing.directive';

@NgModule({
  imports: [],
  declarations: [
    StickyThingDirective,
  ],
  exports: [
    StickyThingDirective,
  ]
})
export class AngularStickyThingsModule {
}
