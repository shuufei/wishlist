import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Subject, merge, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, takeUntil, filter, map } from 'rxjs/operators';
import type { Icon } from '../types';

@Component({
  selector: 'img[ui-icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit, OnDestroy {
  @Input()
  set icon(value: Icon) {
    this.icon$.next(value);
  }

  private readonly icon$ = new BehaviorSubject<Icon | undefined>(undefined);

  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  private readonly setIconHandler$ = combineLatest([
    this.onInit$,
    this.icon$,
  ]).pipe(
    map(([, icon]) => icon),
    filter((v) => v != null),
    tap((icon) => {
      this.getHostElement().setAttribute('src', `assets/icon/${icon}.svg`);
    })
  );

  constructor(private elementRef: ElementRef) {
    merge(this.setIconHandler$).pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnInit(): void {
    this.onInit$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }
}
