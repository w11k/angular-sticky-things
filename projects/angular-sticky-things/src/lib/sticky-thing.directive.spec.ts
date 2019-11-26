import {StickyThingDirective} from './sticky-thing.directive';

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

  describe('setSticky', () => {
    it('', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('setSticky', () => {
    it('', () => {
      expect(true).toBeTruthy();
    });
  });
  describe('removeSticky', () => {
    it('', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('boundary element', () => {
    it('should work with', () => {
      expect(true).toBeTruthy();
    });
    it('should work without', () => {
      expect(true).toBeTruthy();
    });
    it('should get fixed', () => {
      expect(true).toBeTruthy();
    });
    it('should stop', () => {
      expect(true).toBeTruthy();
    });
  });
});
