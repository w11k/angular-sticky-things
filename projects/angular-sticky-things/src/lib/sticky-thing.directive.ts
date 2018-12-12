import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {combineLatest, Observable, Subject, Subscription, merge} from 'rxjs';
import {animationFrame} from 'rxjs/internal/scheduler/animationFrame';
import {map, share, startWith, takeUntil, throttleTime} from 'rxjs/operators';


export interface StickyPositions {
  offsetY: number;
  bottomBoundary: number | null;
}

export interface StickyStatus {
  isSticky: boolean;
  reachedLowerEdge: boolean;
}

@Directive({
  exportAs: 'stickyDirective',
  selector: '[stickyThing]'
})
export class StickyThingDirective implements OnInit, OnChanges, OnDestroy {

  @Input() marginTop = 0;
  @Input() marginBottom = 0;
  @Input() enable = true;
  @Input('spacer') spacerElement: HTMLElement | undefined;
  @Input('boundary') boundaryElement: HTMLElement | undefined;

  @HostBinding('class.is-sticky') sticky = false;

  @HostBinding('class.boundary-reached') boundaryReached = false;

  private initialMarginTop: number;
  private initialMarginBottom: number;
  private stickyElementHeight: number;

  /**
   * The field represents some position values in normal (not sticky) mode.
   * If the browser size or the content of the page changes, this value must be recalculated.
   * */
  private recalculate$ = new Subject<void>();
  private normalPosition$: Observable<StickyPositions>;
  private scroll$ = new Subject<any>();
  private scrollThrottled$: Observable<number>;


  private resize$ = new Subject<void>();
  private redetermineThrottled$: Observable<void>;

  private status$: Observable<StickyStatus>;
  private statusSubscription$: Subscription;

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
    this.redetermineThrottled$ = merge(this.recalculate$, this.resize$)
      .pipe(
        throttleTime(0, animationFrame),
        share()
      );

    /**
     * Start with initial value (1 since void doesn't work) so that
     * the original position gets set during view init.*/
    this.normalPosition$ = this.redetermineThrottled$.pipe(startWith(1), map(_ => this.determineElementOffsets()));


    this.status$ = combineLatest(this.normalPosition$, this.scrollThrottled$)
      .pipe(
        map(([originalVals, pageYOffset]) => this.determineStatus(originalVals, pageYOffset)),
        share(),
        takeUntil(this.componentDestroyed),
      );

  }



  ngOnChanges(changes: SimpleChanges): void {
    const enableChanged: SimpleChange | undefined = changes.enable;

    if (enableChanged && !enableChanged.firstChange) {
      this.isEnabled ? this.activate() : this.deactivate();
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

    if (this.isEnabled) {
      this.setInitialMargins();
      this.determineHeight();
      this.activate();
    }
  }

  recalculate(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.determineHeight();
      this.recalculate$.next();
    }
  }

  getComputedStyle(el: HTMLElement): ClientRect | DOMRect {
    return el.getBoundingClientRect();
  }

  private get isEnabled(): boolean {
    return isPlatformBrowser(this.platformId) && this.enable;
  }

  private determineHeight(): void {
    this.stickyElementHeight = this.getComputedStyle(this.stickyElement.nativeElement).height;
  }

  private determineStatus(originalVals: StickyPositions, pageYOffset: number): StickyStatus {
    const reachedLowerEdge = this.boundaryElement && pageYOffset + this.stickyElementHeight + this.marginBottom >= (originalVals.bottomBoundary - this.marginTop);
    return {
      isSticky: pageYOffset > originalVals.offsetY,
      reachedLowerEdge
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

    return {offsetY: (getPosition(this.stickyElement.nativeElement).y - this.marginTop), bottomBoundary};
  }

  private makeSticky(boundaryReached: boolean = false): void {

    this.boundaryReached = boundaryReached;

    // do this before setting it to pos:fixed
    const {width, height, left} = this.getComputedStyle(this.stickyElement.nativeElement);
    const offSet = boundaryReached ? (this.getComputedStyle(this.boundaryElement).bottom - height - this.marginBottom) : this.marginTop;

    this.sticky = true;
    this.stickyElement.nativeElement.style.position = 'fixed';
    this.stickyElement.nativeElement.style.top = offSet + 'px';
    this.stickyElement.nativeElement.style.left = left + 'px';
    this.stickyElement.nativeElement.style.width = `${width}px`;
    if (this.spacerElement) {
      const spacerHeight = this.initialMarginBottom + height + this.initialMarginTop;
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

  private activate(): void {
    this.statusSubscription$ = this.status$.subscribe((status) => this.setSticky(status));
    this.setSticky(this.determineStatus(this.determineElementOffsets(), window.pageYOffset));
  }

  private deactivate(): void {
    this.removeSticky();

    if (this.statusSubscription$) {
      this.statusSubscription$.unsubscribe();
    }
  }

  private setSticky(status: StickyStatus): void {
    // console.log(status, status.isSticky);
    if (status.isSticky) {
      this.makeSticky(status.reachedLowerEdge);
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

  private setInitialMargins(): void {
    const stickyStyles = window.getComputedStyle(this.stickyElement.nativeElement);
    this.initialMarginTop = parseInt(stickyStyles.marginTop, 10);
    this.initialMarginBottom = parseInt(stickyStyles.marginBottom, 10);
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
