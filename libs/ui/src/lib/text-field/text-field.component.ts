import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import type { Typography } from '../types';
import { Subject, merge } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'input[ui-text-field], textarea[ui-text-field]',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements OnInit, OnDestroy {
  @Input() typography: Typography = 'body';

  // Events
  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly setTypographyStyleHandler$ = this.onInit$.pipe(
    tap(() => this.getHostElement().classList.add(`ui-${this.typography}`))
  );

  constructor(private elementRef: ElementRef) {
    merge(this.setTypographyStyleHandler$)
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
