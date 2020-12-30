import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { WishlistItem } from '@wishlist/shared/ui';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { tap, takeUntil, mapTo, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'wda-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemFormComponent implements OnInit, OnDestroy {
  @Output() create = new EventEmitter<WishlistItem>();

  // State
  readonly isActiveForm$ = new BehaviorSubject(false);
  readonly itemFormGroup: FormGroup<WishlistItem> = this.fb.group({
    title: '',
    description: '',
  });

  // Events
  readonly onClickedAddButton$ = new Subject<void>();
  readonly onClickedAddCancel$ = new Subject<void>();
  readonly onClickedAddExecute$ = new Subject<void>();
  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly changeIsActiveFormHandler$ = merge(
    this.onClickedAddButton$.pipe(mapTo(true)),
    this.onClickedAddCancel$.pipe(mapTo(false)),
    this.onClickedAddExecute$.pipe(mapTo(false))
  ).pipe(tap((isActive) => this.isActiveForm$.next(isActive)));
  private readonly emitCreateEventHandler$ = this.onClickedAddExecute$.pipe(
    map(() => this.itemFormGroup.value),
    tap((item) => this.create.emit(item))
  );
  private readonly resetItemFormGroupHandler$ = this.onClickedAddExecute$.pipe(
    tap(() => this.itemFormGroup.setValue({ title: '', description: '' }))
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    merge(
      this.changeIsActiveFormHandler$,
      this.emitCreateEventHandler$,
      this.resetItemFormGroupHandler$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
