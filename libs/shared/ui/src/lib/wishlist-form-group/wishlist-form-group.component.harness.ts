import { ComponentHarness } from '@angular/cdk/testing';
export class WishlistFormGroupComponentHarness extends ComponentHarness {
  static hostSelector = 'ui-wishlist-form-group';

  private titleEl = this.locatorFor('input');
  private descriptionEl = this.locatorFor('textarea');
  private executeButton = this.locatorFor('button[ui-fill-button]');
  private cancelButton = this.locatorFor('button[ui-button]');

  async inputTitle(value: string) {
    await (await this.titleEl()).setInputValue(value);
    await (await this.titleEl()).dispatchEvent('input');
  }

  async inputDescription(value: string) {
    await (await this.descriptionEl()).setInputValue(value);
    await (await this.descriptionEl()).dispatchEvent('input');
  }

  async clickExecuteButton() {
    await (await this.executeButton()).click();
  }

  async clickCancelButton() {
    await (await this.cancelButton()).click();
  }
}
