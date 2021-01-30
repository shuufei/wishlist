import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  readonly title = new FormControl('');
}
