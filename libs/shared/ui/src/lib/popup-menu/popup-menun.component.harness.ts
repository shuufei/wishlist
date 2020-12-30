import { ComponentHarness } from '@angular/cdk/testing';
export class PopupMenuComponentHarness extends ComponentHarness {
  static hostSelector = 'ui-popup-menu';

  private trigger = this.locatorFor('img[ui-icon]');
  private actionButtons = this.locatorForAll('button[ui-button]');

  async openPopup() {
    return (await this.trigger()).click();
  }

  async clickMenu(index: number) {
    const buttons = await this.actionButtons();
    return buttons[index].click();
  }
}
