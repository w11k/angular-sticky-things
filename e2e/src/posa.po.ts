import {browser, by, element} from 'protractor';

export class PosaPage {


  constructor() {
    const width = 1200;
    const height = 900;
    browser.driver.manage().window().setSize(width, height);
  }

  navigateToDev() {
    return browser.get('/posa');
  }


  getStickyElement() {
    return element(by.css('.some-thing-sticky'));
  }

  getOtherScrollable() {
    return element(by.css('.another-scrollable-container'));
  }

  getEnableButton() {
    return element(by.css('#enable-btn'));
  }
}

