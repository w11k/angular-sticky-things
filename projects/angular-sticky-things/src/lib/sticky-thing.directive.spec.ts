import {StickyThingDirective} from './sticky-thing.directive';

describe('StickyThingDirective', () => {
  it('should create an instance', () => {
    const directive = new StickyThingDirective({nativeElement: {offsetTo: '0px'}}, null as any, null as any);
    expect(directive).toBeTruthy();
  });
});
