import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import type { Color } from '../types';

@Component({
  selector: 'button[ui-button], button[ui-stroked-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() color: Color = 'basic';

  // Events
  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly setColorClassHandler$ = this.onInit$.pipe(
    tap(() => {
      this.getHostElement().classList.add(this.color);
    })
  );

  constructor(private elementRef: ElementRef) {
    merge(this.setColorClassHandler$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnInit() {
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }
}
