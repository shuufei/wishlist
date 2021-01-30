import { ComponentHarness } from '@angular/cdk/testing';
export class WishlistItemComponentHarness extends ComponentHarness {
  static hostSelector = 'ui-wishlist-item';

  private titleEl = this.locatorFor('p.ui-subheading-b');
  private descriptionEl = this.locatorFor('pre.ui-caption');

  async getTitleValue() {
    return (await this.titleEl()).text();
  }

  async getDescriptionValue() {
    return (await this.descriptionEl()).text();
  }
}
