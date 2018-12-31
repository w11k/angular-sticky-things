import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {animationFrame} from 'rxjs/internal/scheduler/animationFrame';
import {filter, map, share, startWith, takeUntil, throttleTime} from 'rxjs/operators';


export interface StickyPositions {
  offsetY: number;
  bottomBoundary: number | null;
}

export interface StickyStatus {
  isSticky: boolean;
  reachedLowerEdge: boolean;
  marginTop: number;
  marginBottom: number;
}

@Directive({
  selector: '[stickyThing]'
})
export class StickyThingDirective implements OnInit, AfterViewInit, OnDestroy {

  filterGate = false;
  marginTop$ = new BehaviorSubject(0);
  marginBottom$ = new BehaviorSubject(0);
  enable$ = new BehaviorSubject(true);

  @Input() set marginTop(value: number) {
    this.marginTop$.next(value);
  }

  @Input() set marginBottom(value: number) {
    this.marginBottom$.next(value);
  }

  @Input() set enable(value: boolean) {
    this.enable$.next(value);
  }
  @Input('spacer') spacerElement: HTMLElement | undefined;
  @Input('boundary') boundaryElement: HTMLElement | undefined;

  @HostBinding('class.is-sticky') sticky = false;

  @HostBinding('class.boundary-reached') boundaryReached = false;

  /**
   * The field represents some position values in normal (not sticky) mode.
   * If the browser size or the content of the page changes, this value must be recalculated.
   * */
  private scroll$ = new Subject<any>();
  private scrollThrottled$: Observable<number>;


  private resize$ = new Subject<void>();
  private resizeThrottled$: Observable<void>;
  private extraordinaryChange$ = new BehaviorSubject<void>(undefined);

  private status$: Observable<StickyStatus>;

  private componentDestroyed = new Subject<void>();


  constructor(private stickyElement: ElementRef, @Inject(PLATFORM_ID) private platformId: string) {

    /**
     * Throttle the scroll to animation frame (around 16.67ms) */
    this.scrollThrottled$ = this.scroll$
      .pipe(
        throttleTime(0, animationFrame),
        map(() => window.pageYOffset),
        share()
      );

    /**
     * Throttle the resize to animation frame (around 16.67ms) */
    this.resizeThrottled$ = this.resize$
      .pipe(
        throttleTime(0, animationFrame),
        // emit once since we are currently using combineLatest
        startWith(null),
        share()
      );


    this.status$ = combineLatest(
      this.enable$,
      this.scrollThrottled$,
      this.marginTop$,
      this.marginBottom$,
      this.extraordinaryChange$,
      this.resizeThrottled$,
    )
      .pipe(
        filter(([enabled]) => this.checkEnabled(enabled)),
        map(([enabled, pageYOffset, marginTop, marginBottom]) => this.determineStatus(this.determineElementOffsets(), pageYOffset, marginTop, marginBottom, enabled)),
        share(),
      );

  }

  ngAfterViewInit(): void {
    this.status$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((status) => this.setSticky(status));
  }

  public recalculate(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Make sure to be in the next tick by using timeout
      setTimeout(() => {
        this.extraordinaryChange$.next(undefined);
      }, 0);
    }
  }


  /**
   * This is nasty code that should be refactored at some point.
   *
   * The Problem is, we filter for enabled. So that the code doesn't run
   * if @Input enabled = false. But if the user disables, we need exactly 1
   * emit in order to reset and call removeSticky. So this method basically
   * turns the filter in "filter, but let the first pass".
   * */
  private checkEnabled(enabled: boolean): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    if (enabled) {
      // reset the gate
      this.filterGate = false;
      return true;
    } else {
      if (this.filterGate) {
        // gate closed, first emit has happened
        return false;
      } else {
        // this is the first emit for enabled = false,
        // let it pass, and activate the gate
        // so the next wont pass.
        this.filterGate = true;
        return true;
      }
    }


  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resize$.next();
    }
  }

  @HostListener('window:scroll', [])
  adapter(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scroll$.next();
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  ngOnInit(): void {
    this.checkSetup();
  }

  getComputedStyle(el: HTMLElement): ClientRect | DOMRect {
    return el.getBoundingClientRect();
  }

  private determineStatus(originalVals: StickyPositions, pageYOffset: number, marginTop: number, marginBottom: number, enabled: boolean): StickyStatus {
    const stickyElementHeight = this.getComputedStyle(this.stickyElement.nativeElement).height;
    const reachedLowerEdge = this.boundaryElement && window.pageYOffset + stickyElementHeight + marginBottom >= (originalVals.bottomBoundary - marginTop);
    return {
      isSticky: enabled && pageYOffset > originalVals.offsetY,
      reachedLowerEdge,
      marginBottom,
      marginTop,
    };
  }


  /**
   * Gets the offset for element. If the element
   * currently is sticky, it will get removed
   * to access the original position. Other
   * wise this would just be 0 for fixed elements. */
  private determineElementOffsets(): StickyPositions {
    if (this.sticky) {
      this.removeSticky();
    }

    let bottomBoundary: number | null = null;

    if (this.boundaryElement) {
      const boundaryElementHeight = this.getComputedStyle(this.boundaryElement).height;
      const boundaryElementOffset = getPosition(this.boundaryElement).y;
      bottomBoundary = boundaryElementHeight + boundaryElementOffset;
    }

    return {offsetY: (getPosition(this.stickyElement.nativeElement).y - this.marginTop$.value), bottomBoundary};
  }

  private makeSticky(boundaryReached: boolean = false, marginTop: number, marginBottom: number): void {

    this.boundaryReached = boundaryReached;

    // do this before setting it to pos:fixed
    const {width, height, left} = this.getComputedStyle(this.stickyElement.nativeElement);
    const offSet = boundaryReached ? (this.getComputedStyle(this.boundaryElement).bottom - height - this.marginBottom$.value) : this.marginTop$.value;

    this.sticky = true;
    this.stickyElement.nativeElement.style.position = 'fixed';
    this.stickyElement.nativeElement.style.top = offSet + 'px';
    this.stickyElement.nativeElement.style.left = left + 'px';
    this.stickyElement.nativeElement.style.width = `${width}px`;
    if (this.spacerElement) {
      const spacerHeight = marginBottom + height + marginTop;
      this.spacerElement.style.height = `${spacerHeight}px`;
    }
  }

  private checkSetup() {
    if (isDevMode() && !this.spacerElement) {
      console.warn(`******There might be an issue with your sticky directive!******

You haven't specified a spacer element. This will cause the page to jump.

Best practise is to provide a spacer element (e.g. a div) right before/after the sticky element.
Then pass the spacer element as input:

<div #spacer></div>

<div stickyThing="" [spacer]="spacer">
    I am sticky!
</div>`);
    }
  }


  private setSticky(status: StickyStatus): void {
    if (status.isSticky) {
      this.makeSticky(status.reachedLowerEdge, status.marginTop, status.marginBottom);
    } else {
      this.removeSticky();
    }
  }

  private removeSticky(): void {

    this.boundaryReached = false;
    this.sticky = false;

    this.stickyElement.nativeElement.style.position = '';
    this.stickyElement.nativeElement.style.width = 'auto';
    this.stickyElement.nativeElement.style.left = 'auto';
    this.stickyElement.nativeElement.style.top = 'auto';
    if (this.spacerElement) {
      this.spacerElement.style.height = '0';
    }
  }
}

// Thanks to https://stanko.github.io/javascript-get-element-offset/
function getPosition(el) {
  let top = 0;
  let left = 0;
  let element = el;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    y: top,
    x: left,
  };
}
