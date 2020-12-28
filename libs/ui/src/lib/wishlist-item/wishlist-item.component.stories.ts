import { WishlistItemComponent } from './wishlist-item.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WishlistFormGroupComponent } from '../wishlist-form-group/wishlist-form-group.component';

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
    WishlistFormGroupComponent,
  ],
  imports: [ReactiveFormsModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-wishlist-item title="ほしいものタイトル" description="ほしいもの詳細" class="ui-mx-16"></ui-wishlist-item>
  `,
  props: {},
});

export const NoSeparator = () => ({
  moduleMetadata,
  template: `
    <ui-wishlist-item title="ほしいものタイトル" description="ほしいもの詳細" [isShowSeparotor]="false" class="ui-mx-16"></ui-wishlist-item>
  `,
  props: {},
});
