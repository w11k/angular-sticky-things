import {browser, by, element, protractor} from 'protractor';

export class AppPage {


  constructor() {
    const width = 1200;
    const height = 900;
    browser.driver.manage().window().setSize(width, height);
  }

  navigateToDev() {
    return browser.get('#/dev');
  }


  async setMargin(value: number, pos: 'top' | 'bottom') {
    const inputEl = element(by.css(`#${pos}`));
    await inputEl.clear();
    await inputEl.sendKeys(value);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }




  async toggleEnabled() {
    const btn = this.getEnableButton();
    await btn.click();
    // await browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  getStickyText() {
    return this.getStickyElement().getText();
  }

  getStickyElement() {
    return element(by.css('.some-thing-sticky'));
  }

  getEnableButton() {
    return element(by.css('#enable-btn'));
  }
}
