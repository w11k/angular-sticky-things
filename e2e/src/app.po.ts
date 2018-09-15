import {browser, by, element} from 'protractor';

export class AppPage {


  constructor() {
    const width = 1200;
    const height = 900;
    browser.driver.manage().window().setSize(width, height);
  }

  navigateToDev() {
    return browser.get('/dev');
  }

  getStickyText() {
    return this.getStickyElement().getText();
  }

  getStickyElement() {
    return element(by.css('.some-thing-sticky'));
  }
}
