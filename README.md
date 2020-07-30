[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.2.5&x2=0)](https://badge.fury.io/js/%40w11k%2Fangular-sticky-things)

# Angular Sticky Things

An Angular directive for making things sticky when the user scrolls (for Angular 2+) with no jQuery Dependency.

[See the demo here](https://w11k.github.io/angular-sticky-things/).


### Requirements

* Angular (requires Angular 4.x or higher)
* Supports all major browsers and IE11 and up (lower versions might not be supported)

### Features:
* Stick all the things!
* Super smooth!
* Tested in real world projects
* Support for Angular Universal
* Prevents page-jumping when switching to sticky mode
* No jQuery or other dependencies - pure Angular solution

<p align="center">
  <img src="./src/assets/screencast.apng?raw=true" alt="Scroll in Action" width="500"/>
</p>

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

#### Boundary Elements

If a boundary element is defined, the sticky element scrolls only within the height of the boundary element and then stops. This is useful if you have multiple sticky elements since it prevents stacking. You can [take a look at the examples](https://w11k.github.io/angular-sticky-things/).
```html
<div #boundary style="height:1000px;">
  <div #spacer></div>
  <div stickyThing [spacer]="spacer" [boundary]="boundary">
    I am sticky but only inside #boundary!
  </div>
</div>
```

*Hint*: The boundary feature is still in beta - position errors might occur!

#### Spacer

The spacer is not required but prevents a page jump when the sticky effect steps in.

#### Enable

An `enable` (default `true`) input can be used to dynamically activate or deactivate the sticky directive (e.g. to have a sticky navbar only in certain conditions). You can [take a look at the examples](https://w11k.github.io/angular-sticky-things/).

```html
<div #spacer></div>
<div stickyThing [spacer]="spacer" [enable]="enableSticky">
  I can become sticky only when enableSticky is true!
</div>
```

#### Margins

A `marginTop` (default `0`) input can be used to add some top spacing to the sticky element, in case you don't want it to stick right at the top. It expects the `number` of pixels you want to use for the space. You can [take a look at the examples](https://w11k.github.io/angular-sticky-things/). Accordingly, `marginBottom` is available.


```html
<div #boundary style="height:1000px;">
  <div #spacer></div>
  <div stickyThing [spacer]="spacer" marginTop="30">
    I leave 30px of space to the top when I'm sticky!
  </div>
</div>
```

#### Event Outputs

```html
<div #boundary style="height:1000px;">
  <div #spacer></div>
  <div stickyThing (stickyPosition)="consoleLog($event)" (stickyStatus)="consoleLog($event)" marginTop="30" marginBottom="50">
    I leave 30px of space to the top when I'm sticky!
  </div>
</div>
```
Example Output: 
```
[Log] stickyPositon - {offsetY: 786, bottomBoundary: 1406.9999389648438, upperScreenEdgeAt: 75, marginBottom: "50", marginTop: "30"}
[Log] stickyStatus - {isSticky: false, reachedUpperEdge: true, reachedLowerEdge: false}
```

#### Scroll in Container

Per default Sticky Things expects your body to be the element that scrolls. However, if Sticky Things is used in an `overflow`-container, that container must be made known to the directive.

This is best done with a query selector. If a string is provided it will be called with `document.querySelector`. Instead an HTML element (nativeElement) can be provided as well.

Note: In a scrollable container boundary, spacer and margins don't work.

```html
<div class="scrollable-container">
  <p>I'm special, since my content scrolls and not the body.</p>
  <p>...</p>
  <div stickyThing [scrollContainer]="'.scrollable-container'">Sticky</div>
</div>
```

````scss
.scrollable-container {
  height: 300px;
  margin: 3em auto;
  overflow: scroll;
}
````
<p align="center">
  <img src="./src/assets/scrollcontainer.gif?raw=true" alt="Scroll-Container in Action" width="500"/>
</p>

## Patron

❤️ [W11K - The Web Engineers](https://www.w11k.de/)

❤️ [theCodeCampus - Trainings for Angular and TypeScript](https://www.thecodecampus.de/)
