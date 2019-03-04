import {browser} from 'protractor';
import {PosaPage} from './posa.po';

describe('with position:absolute container', () => {
  let page: PosaPage;

  beforeEach(() => {
    page = new PosaPage();
    page.navigateToDev();
  });


  it('should recognize sticky ', async () => {
    page.navigateToDev();
    await browser.executeScript('window.scrollTo(0,501);');
    const hasStickyClass = await hasClass(page.getStickyElement(), 'is-sticky');
    expect(hasStickyClass).toBe(true);
  });


});

// via https://stackoverflow.com/questions/20268128/how-to-test-if-an-element-has-class-using-protractor
async function hasClass(element, cls) {
  const classes = await element.getAttribute('class');
  return classes.split(' ').indexOf(cls) !== -1;
}
