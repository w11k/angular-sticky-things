import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('app page', () => {
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });
  it('should be rendered', async () => {
    expect(true).toBe(true);
  });
});

xdescribe('angular sticky things', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToDev();
    // browser.waitForAngular();

    // page.setMarginTop(0).then(()=>done());
  });

  xit('should be not sticky for scroll(0,0)', async () => {
    page.navigateToDev();
    const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
    expect(hasStickyClass).toBe(false);
  });


  xit('should be sticky from the first scrolled pixel', async () => {
    page.navigateToDev();
    await browser.executeScript('window.scrollTo(0,501);');
    const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
    expect(hasStickyClass).toBe(true);
  });


  xdescribe('boundary-reached', () => {
    xit('should detect if the boundary is reached when scrolling down', async () => {
      page.navigateToDev();
      await browser.executeScript('window.scrollTo(0,501+500);');
      const hasStickyClass = await hasClass(page.getStickyElement(), 'boundary-reached');
      expect(hasStickyClass).toBe(true);
    });

    xit('should remove if user scrolls up again after reaching boundary', async () => {
      page.navigateToDev();
      await browser.executeScript('window.scrollTo(0,501+500);');
      await browser.executeScript('window.scrollTo(0,501);');
      const hasBoundaryClass = await hasClass(page.getStickyElement(), 'boundary-reached');
      expect(hasBoundaryClass).toBe(false);
    });


    xit('should be exactly at top:0 when boundary is removed again', async () => {
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

  xdescribe('marginTop', () => {
    xit('should respect margin top when set', async () => {
      page.navigateToDev();
      await page.setMargin(50, 'top');
      await browser.executeScript('window.scrollTo(0,601);');
      const stickyElement = page.getStickyElement();
      const top = await stickyElement.getCssValue('top');
      expect(top).toBe('50px');
    });

    // This is currently disabled since the project is curently not capable
    // of handling changes of margins. This will be added later.
    // it('should respect margin top in start', async () => {
    //   page.navigateToDev();
    //   await page.setMargin(50, 'top');
    //   await browser.executeScript('window.scrollTo(0,475);');
    //   const stickyElement = page.getStickyElement();
    //   const top = await stickyElement.getCssValue('top');
    //   expect(top).toBe('50px');
    // });

    xit('should respect margin bottom when set', async () => {
      page.navigateToDev();
      await page.setMargin(50, 'bottom');
      await browser.executeScript('window.scrollTo(0,1000);');
      const stickyElement = page.getStickyElement();
      const top = await stickyElement.getCssValue('top');
      expect(top).toBe('-250px');
    });

  });


  xdescribe('enabled', () => {
    xit('should respect enabled = false', async () => {
      page.navigateToDev();
      await page.toggleEnabled();
      await browser.executeScript('window.scrollTo(0,601);');
      const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
      expect(hasStickyClass).toBe(false);
    });

    xit('should be re-enable-able', async () => {
      page.navigateToDev();
      await page.toggleEnabled();
      await browser.executeScript('window.scrollTo(0,601);');
      const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
      expect(hasStickyClass).toBe(false);

      await page.toggleEnabled();
      await browser.executeScript('window.scrollTo(0,201);');
      await browser.executeScript('window.scrollTo(0,601);');
      const hasStickyClass2 = await hasClass(page.getStickyElement(), 'is-sticky');
      expect(hasStickyClass2).toBe(true);

    });

  });


});

// via https://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor
async function hasClass(element, cls) {
  const classes = await element.getAttribute('class');
  return classes.split(' ').indexOf(cls) !== -1;
}
