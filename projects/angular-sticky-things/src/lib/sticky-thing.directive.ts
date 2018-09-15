import {Directive, ElementRef, HostListener, Inject, Input, isDevMode, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[stickyThing]'
})
export class StickyThingDirective implements OnInit {


  @Input() spacer: HTMLElement | undefined;
  @Input() boundary: HTMLElement | undefined;

  private sticky = false;
  private offSet = 0;
  private className = 'is-sticky';
  private offsetTopUnsticky = 0;
  private offsetBottomBoundary = 0;

  constructor(private stickyElement: ElementRef, private render: Renderer2, @Inject(PLATFORM_ID) private platformId: string) {
  }


  /**
   * Calculates the height from the sticky element to top - only works if the sticky = false*/
  reCalcOffsetTopUnsticky() {
    this.offsetTopUnsticky = getPosition(this.stickyElement.nativeElement).y;
  }

  reCalcBottomBoundary() {
    if (this.boundary) {
      const boundaryElementHeight = this.getComputedStyle(this.boundary).height;
      const boundaryElementOffset = getPosition(this.boundary).y;
      this.offsetBottomBoundary = boundaryElementHeight + boundaryElementOffset;
    }
  }

  /**
   * If the window gets resized and the element is currently sticky
   * it will get resetted for a tick. This allows a proper width-
   * restore.
   * */
  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.sticky) {
      this.removeSticky();
      this.reCalcOffsetTopUnsticky();
      this.reCalcBottomBoundary();
      setTimeout(() => this.onWindowScroll(), 0);
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // In cases where the page has changed content length.
    if (this.sticky === false) {
      this.reCalcOffsetTopUnsticky();
    } else {
      // is only relevant during sticky
      this.reCalcBottomBoundary();
    }

    if (window.pageYOffset > this.offsetTopUnsticky) {
      if (this.sticky === false) {
        this.makeSticky();
      }
    } else {
      if (this.sticky === true) {
        this.removeSticky();
      }
    }


    if (this.boundary && this.sticky) {
      const stickyElementHeight = this.getComputedStyle(this.stickyElement.nativeElement).height;
      const reachedLowerEdge = window.pageYOffset + stickyElementHeight >= this.offsetBottomBoundary;

      if (reachedLowerEdge) {
        this.stickyElement.nativeElement.style.position = 'fixed';
        this.stickyElement.nativeElement.style.top = `${this.getComputedStyle(this.boundary).bottom - this.getComputedStyle(this.stickyElement.nativeElement).height}px`;
      }
    }

  }

  ngOnInit(): void {
    this.reCalcOffsetTopUnsticky();
    this.reCalcBottomBoundary();
    this.checkSetup();
  }

  getComputedStyle(el: HTMLElement): ClientRect | DOMRect {
    return el.getBoundingClientRect();
  }

  private makeSticky() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // do this before setting it to pos:fixed
    const {width, height, left} = this.getComputedStyle(this.stickyElement.nativeElement);

    this.sticky = true;
    this.stickyElement.nativeElement.style.position = 'fixed';
    this.stickyElement.nativeElement.style.top = this.offSet + 'px';
    this.stickyElement.nativeElement.style.left = left + 'px';
    this.stickyElement.nativeElement.style.width = `${width}px`;
    this.render.addClass(this.stickyElement.nativeElement, this.className);
    if (this.spacer) {
      this.spacer.style.height = `${height}px`;
    }
  }


  private removeSticky() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.sticky = false;
    this.stickyElement.nativeElement.style.position = '';
    this.stickyElement.nativeElement.style.width = 'auto';
    this.stickyElement.nativeElement.style.left = 'auto';
    this.stickyElement.nativeElement.style.top = 'auto';
    this.render.removeClass(this.stickyElement.nativeElement, this.className);
    if (this.spacer) {
      this.spacer.style.height = '0';
    }
  }

  private checkSetup() {
    if (isDevMode() && !this.spacer) {
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
