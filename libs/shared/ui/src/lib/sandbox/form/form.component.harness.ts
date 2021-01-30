import { ComponentHarness } from '@angular/cdk/testing';
export class FormComponentHarness extends ComponentHarness {
  static hostSelector = 'ui-form';

  private inputEl = this.locatorFor('input');
  private titleEl = this.locatorFor('h1');

  async inputValue(value: string) {
    await (await this.inputEl()).setInputValue(value);
    await (await this.inputEl()).dispatchEvent('input');
  }

  async getTitleValue() {
    return (await this.titleEl()).text();
  }
}
