import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';

@Component({
  selector: 'wda-mylist-page',
  templateUrl: './mylist-page.component.html',
  styleUrls: ['./mylist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MylistPageComponent implements OnInit, OnDestroy {
  // State
  readonly wishlistItems$ = this.mylistFacade.mylist$;

  // Events
  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly loadMylistHandler$ = this.onInit$.pipe(
    switchMap(() => this.mylistFacade.loadMylist())
  );

  constructor(private mylistFacade: MylistFacadeService) {}

  ngOnInit() {
    merge(this.loadMylistHandler$).pipe(takeUntil(this.onDestroy$)).subscribe();
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
