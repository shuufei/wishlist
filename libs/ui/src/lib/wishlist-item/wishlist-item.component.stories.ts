import { WishlistItemComponent } from './wishlist-item.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'WishlistItemComponent',
};

const moduleMetadata = {
  declarations: [
    WishlistItemComponent,
    PopupMenuComponent,
    ButtonComponent,
    IconComponent,
    TextFieldComponent,
  ],
  imports: [ReactiveFormsModule],
};

export const primary = () => ({
  moduleMetadata,
  template: `
    <ui-wishlist-item title="ほしいものタイトル" description="ほしいもの詳細" class="ui-mx-16"></ui-wishlist-item>
  `,
  props: {},
});
