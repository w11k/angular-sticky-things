import {Directive, ElementRef, HostListener, Inject, Input, isDevMode, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[stickyThing]'
})
export class StickyThingDirective implements OnInit {


  @Input() spacer: HTMLElement | undefined;

  private stick = false;
  private offSet = 0;
  private className = 'is-sticky';
  private offsetTopUnsticky = 0;

  constructor(private stickyElement: ElementRef, private render: Renderer2, @Inject(PLATFORM_ID) private platformId: string) {
    this.reCalcOffsetTopUnsticky();
  }


  reCalcOffsetTopUnsticky() {
    this.offsetTopUnsticky = getPosition(this.stickyElement.nativeElement).y;
  }

  /**
   * If the window gets resized and the element is currently sticky
   * it will get resetted for a tick. This allows a proper width-
   * restore.
   * */
  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.stick) {
      this.removeSticky();
      this.reCalcOffsetTopUnsticky();
      setTimeout(this.makeSticky(), 0);
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // In cases where the page has changed content length.
    if (this.stick === false) {
      this.reCalcOffsetTopUnsticky();
    }

    if (window.pageYOffset >= this.offsetTopUnsticky) {
      this.makeSticky();
    } else {
      this.removeSticky();
    }

  }

  ngOnInit(): void {
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

    this.stick = true;
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

    this.stick = false;
    this.stickyElement.nativeElement.style.position = '';
    this.stickyElement.nativeElement.style.width = 'auto';
    this.stickyElement.nativeElement.style.left = 'auto';
    this.stickyElement.nativeElement.style.top = 'auto';
    this.render.removeClass(this.stickyElement.nativeElement, this.className);
    if (this.spacer) {
      this.spacer.style.height = '0';
    }
  }


  private getHeight(el: HTMLElement): string {
    return window.getComputedStyle(el, null).getPropertyValue('height');
  }

  private getWidth(el: HTMLElement): string {
    return window.getComputedStyle(el, null).getPropertyValue('width');
  }

  private checkSetup() {
    if (isDevMode() && !this.spacer) {
      console.warn(`******There might be an issue with your sticky directive!******

You haven't specified a spacer element. This will cause the page to jump.

Best practise is to provide a spacer element (e.g. a div) right before/after the sticky element.
Then pass the spacer element as input:

<div #spacer></div>

<div tccSticky="" [spacer]="spacer">
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
