import { ComponentHarness } from '@angular/cdk/testing';

export class ButtonComponentHarness extends ComponentHarness {
  static hostSelector = ['[ui-button]', '[ui-stroked-button]'].join(',');

  async getText() {
    return (await this.host()).text();
  }
}
