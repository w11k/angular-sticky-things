import {StickyStatus, StickyThingDirective} from './sticky-thing.directive';

// { provide: PLATFORM_ID, useValue: 'browser' },


describe('StickyThingDirective', () => {

  let directive!: StickyThingDirective;


  beforeEach(() => {
    directive = new StickyThingDirective({nativeElement: {offsetTo: '0px'}}, 'browser');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('checkEnabled', () => {
    it('should return true for the first truthy value', () => {
      expect(directive.checkEnabled(true)).toBe(true);
    });
    it('should return true for the first falsy value', () => {
      expect(directive.checkEnabled(false)).toBe(true);
    });
    it('should have set the gate up correctly', () => {
      expect(directive.filterGate).toBe(false);
      expect(directive.checkEnabled(false)).toBe(true);
      expect(directive.filterGate).toBe(true);
    });
    it('shouldnt gate for truthy values', () => {
      expect(directive.filterGate).toBe(false);
      expect(directive.checkEnabled(true)).toBe(true);
      expect(directive.filterGate).toBe(false);
    });

    it('should let only the first pass', () => {
      expect(directive.checkEnabled(false)).toBe(true);
      expect(directive.checkEnabled(false)).toBe(false);
    });
  });


// private makeSticky(boundaryReached: boolean = false, marginTop: number, marginBottom: number): void {
//
//     this.boundaryReached = boundaryReached;
//
//   // do this before setting it to pos:fixed
//   const {width, height, left} = this.getComputedStyle(this.stickyElement.nativeElement);
//   const offSet = boundaryReached ? (this.getComputedStyle(this.boundaryElement).bottom - height - this.marginBottom$.value) : this.marginTop$.value;
//
//   this.sticky = true;
//   this.stickyElement.nativeElement.style.position = 'fixed';
//   this.stickyElement.nativeElement.style.top = offSet + 'px';
//   this.stickyElement.nativeElement.style.left = left + 'px';
//   this.stickyElement.nativeElement.style.width = `${width}px`;
//   if (this.spacerElement) {
//     const spacerHeight = marginBottom + height + marginTop;
//     this.spacerElement.style.height = `${spacerHeight}px`;
//   }
// }


  describe('setSticky', () => {
    it('', () => {
    });
  });

//
// private setSticky(status: StickyStatus): void {
//     if (status.isSticky) {
//     this.makeSticky(status.reachedLowerEdge, status.marginTop, status.marginBottom);
//   } else {
//     this.removeSticky();
//   }
// }
//
// private removeSticky(): void {
//
//     this.boundaryReached = false;
//   this.sticky = false;
//
//   this.stickyElement.nativeElement.style.position = '';
//   this.stickyElement.nativeElement.style.width = 'auto';
//   this.stickyElement.nativeElement.style.left = 'auto';
//   this.stickyElement.nativeElement.style.top = 'auto';
//   if (this.spacerElement) {
//     this.spacerElement.style.height = '0';
//   }
// }

  describe('setSticky', () => {
    it('', () => {
    });
  });
  describe('removeSticky', () => {
    it('', () => {
    });
  });




});
