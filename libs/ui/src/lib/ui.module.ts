import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, TextFieldComponent, PopupMenuComponent, IconComponent],
})
export class UiModule {}
