import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { tap, takeUntil, startWith, map, shareReplay } from 'rxjs/operators';
import type { MenuAction } from '../popup-menu/popup-menu.component';

@Component({
  selector: 'ui-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistItemComponent implements OnDestroy {
  @Input()
  set title(value: WishlistItem['title']) {
    this.inputTitle$.next(value);
  }
  @Input()
  set description(value: WishlistItem['description']) {
    this.inputDescription$.next(value);
  }
  @Input()
  set isShowSeparotor(value: boolean) {
    this.inputIsShowSeparator$.next(value);
  }
  @Output() update = new EventEmitter<WishlistItem>();
  @Output() delete = new EventEmitter<void>();

  // Events
  readonly onClickedAction$ = new Subject<MenuAction>();
  readonly onUpdate$ = new Subject<void>();
  readonly onDelete$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // State
  // TODO: 型推論が効くFormライブラリを利用する
  readonly wishlistFormGroup = this.fb.group({
    title: [''],
    description: [''],
  });
  private readonly inputTitle$ = new BehaviorSubject<string>('');
  private readonly inputDescription$ = new BehaviorSubject<string>('');
  private readonly inputIsShowSeparator$ = new BehaviorSubject<boolean>(true);
  readonly title$ = merge(
    this.inputTitle$,
    this.onUpdate$.pipe(map(() => this.wishlistFormGroup.value.title as string))
  ).pipe(startWith(''), shareReplay(1));
  readonly description$ = merge(
    this.inputDescription$,
    this.onUpdate$.pipe(
      map(() => this.wishlistFormGroup.value.description as string)
    )
  ).pipe(startWith(''), shareReplay(1));
  readonly isShowSeparator$ = this.inputIsShowSeparator$
    .asObservable()
    .pipe(shareReplay(1));
  readonly mode$ = new BehaviorSubject<Mode>('view');
  readonly actions: MenuAction[] = [
    {
      id: 'edit',
      text: '編集',
      color: 'primary',
    },
    {
      id: 'delete',
      text: '削除',
      color: 'warn',
    },
  ];

  // Event Handlers
  private readonly updateTitleFormValueHandler$ = this.inputTitle$.pipe(
    tap((title) =>
      this.wishlistFormGroup.patchValue({
        title,
      })
    )
  );
  private readonly updateDescriptionFormValueHandler$ = this.inputTitle$.pipe(
    tap((description) =>
      this.wishlistFormGroup.patchValue({
        description,
      })
    )
  );
  private readonly changeModeHandler$ = merge(
    this.onClickedAction$.pipe(
      tap((event) => {
        const id = event.id;
        switch (id) {
          case 'edit':
            this.mode$.next('update');
            return;
          case 'delete':
            this.mode$.next('delete');
            return;
        }
      })
    ),
    merge(this.onUpdate$, this.onDelete$).pipe(
      tap(() => this.mode$.next('view'))
    )
  );
  private readonly emitUpdateEventHandler$ = this.onUpdate$.pipe(
    tap(() => {
      const title = this.wishlistFormGroup.value.title as string;
      const description = this.wishlistFormGroup.value.description as string;
      this.update.emit({
        title,
        description,
      });
    })
  );
  private readonly emitDeleteEventHandler$ = this.onDelete$.pipe(
    tap(() => this.delete.emit())
  );

  constructor(private fb: FormBuilder) {
    merge(
      this.updateTitleFormValueHandler$,
      this.updateDescriptionFormValueHandler$,
      this.changeModeHandler$,
      this.emitUpdateEventHandler$,
      this.emitDeleteEventHandler$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}

export type WishlistItem = {
  title: string;
  description: string;
};

export type Mode = 'view' | 'update' | 'delete';
