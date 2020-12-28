import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { WishlistFormGroupComponent } from './wishlist-form-group.component';

export default {
  title: 'WishlistFormGroupComponent',
};

const moduleMetadata = {
  declarations: [
    WishlistFormGroupComponent,
    PopupMenuComponent,
    ButtonComponent,
    IconComponent,
    TextFieldComponent,
  ],
  imports: [ReactiveFormsModule],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <ui-wishlist-form-group></ui-wishlist-form-group>
  `,
  props: {},
});
