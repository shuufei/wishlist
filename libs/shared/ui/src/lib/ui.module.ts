import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { IconComponent } from './icon/icon.component';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { WishlistItemComponent } from './wishlist-item/wishlist-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WishlistFormGroupComponent } from './wishlist-form-group/wishlist-form-group.component';

const COMPONENTS = [
  ButtonComponent,
  TextFieldComponent,
  PopupMenuComponent,
  IconComponent,
  NavigationItemComponent,
  WishlistItemComponent,
  WishlistFormGroupComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class UiModule {}
