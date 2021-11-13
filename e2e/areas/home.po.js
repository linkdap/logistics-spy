import config from '../e2e-config.json';

export class HomePage {
  constructor() {
    this.page = global.page;
  }

  logoSelector = 'img.App-logo';

  async load() {
    await this.page.goto(config.websiteUrl);
    await this.page.waitForSelector(this.logoSelector);
  }

  async logo() {
    return this.page.$(this.logoSelector);
  }
}
