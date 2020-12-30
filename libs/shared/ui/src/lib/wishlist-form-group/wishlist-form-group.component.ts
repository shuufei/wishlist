import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-wishlist-form-group',
  templateUrl: './wishlist-form-group.component.html',
  styleUrls: ['./wishlist-form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistFormGroupComponent {
  @Input() titleFormCtrl = new FormControl<string>('');
  @Input() descriptionFormCtrl = new FormControl<string>('');
  @Input() executeLabel = '実行';
  @Output() clickedExecute = new EventEmitter<void>();
  @Output() clickedCancel = new EventEmitter<void>();
}
