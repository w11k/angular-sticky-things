# Angular Sticky Things

A pure TypeScript directive for making things sticky when the user scrolls (for Angular 2+).

### Requirements

* Angular (requires Angular 4.x or higher)
* Supports all major browsers and IE9 and up (lower versions might not be supported)

### Features:
* Stick all the things!
* Super smooth!
* Tested in real world projects
* Support for Angular Universal
* Prevents page-jumping when switching to sticky mode
* No jQuery or other dependencies - pure Angular solution

### Installation

with npm:
```
npm install @w11k/angular-sticky-things
```

with yarn:
```
yarn add @w11k/angular-sticky-things
```


Now import the **AngularStickyThingsModule** in the corresponding Module
```
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';

@NgModule({
  declarations: [
  ],
  imports: [
    AngularStickyThingsModule,
  ],
  providers: [],
})
export class SomeModule { }
```


### Usage:
```html
<div #spacer></div>
<div stickyThing [spacer]="spacer">
  I am sticky!
</div>
```


#### Spacer

The spacer is not required but prevents a page jump when the sticky effect steps in.
