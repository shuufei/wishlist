import { BehaviorSubject, Subject, merge, fromEvent } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { withLatestFrom, tap, takeUntil, filter, map } from 'rxjs/operators';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'ui-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupMenuComponent implements OnDestroy {
  @Input() actions: MenuAction[] = [];
  @Output() clickedAction = new EventEmitter<MenuAction>();
  @ViewChild('trigger', {
    read: ElementRef,
  })
  triggerEl?: ElementRef;

  // State
  readonly isOpen$ = new BehaviorSubject<boolean>(false);

  // Events
  readonly onClickedAction$ = new Subject<MenuAction>();
  readonly onClickedTrigger$ = new Subject<void>();
  private readonly onClickedOutOfArea$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly togglePopupHandler$ = this.onClickedTrigger$.pipe(
    withLatestFrom(this.isOpen$),
    tap(([, isOpen]) => this.isOpen$.next(!isOpen))
  );
  private readonly closePopupHandler$ = this.onClickedOutOfArea$.pipe(
    tap(() => this.isOpen$.next(false))
  );
  private readonly emitClickedActionEventHandler$ = this.onClickedAction$.pipe(
    tap((event) => this.clickedAction.emit(event))
  );

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef) {
    this.setClickOutOfAreaEvent();
    merge(
      this.togglePopupHandler$,
      this.closePopupHandler$,
      this.emitClickedActionEventHandler$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private setClickOutOfAreaEvent() {
    this.zone.runOutsideAngular(() => {
      fromEvent(document, 'click')
        .pipe(
          withLatestFrom(this.isOpen$),
          filter(([, isOpen]) => isOpen),
          map(([event]) =>
            this.triggerEl?.nativeElement.contains(event.target as Node)
          ),
          filter((isInner) => !isInner),
          tap(() => {
            this.onClickedOutOfArea$.next();
            this.cdRef.detectChanges();
          }),
          takeUntil(this.onDestroy$)
        )
        .subscribe();
    });
  }
}

export type MenuAction = {
  id?: string;
  text: string;
};
