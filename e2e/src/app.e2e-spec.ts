import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('angular sticky things', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have sticky element with text Hello', () => {
    page.navigateToDev();
    expect(page.getStickyText()).toEqual('Hello');
  });


  it('should be not sticky for scroll(0,0)', async () => {
    page.navigateToDev();
    const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
    expect(hasStickyClass).toBe(false);
  });


  it('should be sticky from the first scrolled pixel', async () => {
    page.navigateToDev();
    await browser.executeScript('window.scrollTo(0,501);');
    const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
    expect(hasStickyClass).toBe(true);
  });


  describe('boundary-reached', () => {
    it('should detect if the boundary is reached when scrolling down', async () => {
      page.navigateToDev();
      await browser.executeScript('window.scrollTo(0,501+500);');
      const hasStickyClass = await hasClass(page.getStickyElement(), 'boundary-reached');
      expect(hasStickyClass).toBe(true);
    });

    it('should remove if user scrolls up again after reaching boundary', async () => {
      page.navigateToDev();
      await browser.executeScript('window.scrollTo(0,501+500);');
      await browser.executeScript('window.scrollTo(0,501);');
      const hasBoundaryClass = await hasClass(page.getStickyElement(), 'boundary-reached');
      expect(hasBoundaryClass).toBe(false);
    });


    it('should be exactly at top:0 when boundary is removed again', async () => {
      page.navigateToDev();
      await browser.executeScript('window.scrollTo(0,501+500);');
      await browser.executeScript('window.scrollTo(0,501);');
      await browser.executeScript('window.scrollTo(0,501+550);');
      await browser.executeScript('window.scrollTo(0,600);');
      await browser.executeScript('window.scrollTo(0,601);');

      const stickyElement = page.getStickyElement();

      const hasBoundaryClass = await hasClass(stickyElement, 'boundary-reached');
      expect(hasBoundaryClass).toBe(false);

      const top = await stickyElement.getCssValue('top');
      expect(top).toBe('0px');


    });
  });


});

// via https://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor
async function hasClass(element, cls) {
  const classes = await element.getAttribute('class');
  return classes.split(' ').indexOf(cls) !== -1;
}
