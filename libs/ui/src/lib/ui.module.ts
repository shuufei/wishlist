import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, TextFieldComponent],
})
export class UiModule {}
