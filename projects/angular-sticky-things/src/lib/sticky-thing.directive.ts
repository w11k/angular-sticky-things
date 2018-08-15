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
  private selectedOffset = 0;
  private windowOffsetTop = 0;

  constructor(private stickyElement: ElementRef, private render: Renderer2, @Inject(PLATFORM_ID) private platformId: string) {
    this.selectedOffset = this.stickyElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const offset: number = this.stickyElement.nativeElement.offsetTop;
    this.windowOffsetTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (this.selectedOffset === 0) {
      this.selectedOffset = offset;
    }

    if (this.stick === false) {
      this.selectedOffset = offset;
    }

    if (((this.windowOffsetTop + this.offSet) > this.selectedOffset)) {
      if (this.stick === false) {
        this.makeSticky();
      }
    } else {
      if (this.stick === true) {
        this.removeSticky();
      }
    }
  }

  ngOnInit(): void {
    this.checkSetup();
  }

  private makeSticky() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // do this before setting it to pos:fixed
    const width = this.getWidth(this.stickyElement.nativeElement);
    const height = this.getHeight(this.stickyElement.nativeElement);

    this.stick = true;
    this.stickyElement.nativeElement.style.position = 'fixed';
    this.stickyElement.nativeElement.style.top = this.offSet + 'px';
    this.stickyElement.nativeElement.style.width = width;
    this.render.addClass(this.stickyElement.nativeElement, this.className);
    if (this.spacer) {
      this.spacer.style.height = height;
    }
  }

  private removeSticky() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.stick = false;
    this.stickyElement.nativeElement.style.position = '';
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
