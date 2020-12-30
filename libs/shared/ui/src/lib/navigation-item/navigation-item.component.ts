import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subject, merge } from 'rxjs';
import { ElementRef } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'a[ui-navigation-item]',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemComponent implements OnDestroy {
  @Input()
  set active(value: boolean) {
    this.active$.next(value);
  }

  private readonly active$ = new BehaviorSubject(false);

  private readonly onDestroy$ = new Subject<void>();

  private readonly setActiveStyleHandler$ = this.active$.pipe(
    tap((active) => {
      const className = 'active';
      return active
        ? this.getHostElement().classList.add(className)
        : this.getHostElement().classList.remove(className);
    })
  );

  constructor(private elementRef: ElementRef) {
    merge(this.setActiveStyleHandler$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }
}
