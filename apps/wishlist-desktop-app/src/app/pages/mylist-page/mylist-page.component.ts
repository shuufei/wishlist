import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';
import { WishlistItem } from '@wishlist/shared/ui';
import { tag } from 'rxjs-spy/operators/tag';

@Component({
  selector: 'wda-mylist-page',
  templateUrl: './mylist-page.component.html',
  styleUrls: ['./mylist-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MylistPageComponent implements OnInit, OnDestroy {
  // State
  readonly wishlistItems$ = this.mylistFacade.mylist$.pipe(tag('wishlist'));

  // Events
  readonly onUpdate$ = new Subject<[id: number, item: WishlistItem]>();
  readonly onDelete$ = new Subject<number>();
  readonly onCreate$ = new Subject<WishlistItem>();
  private readonly onInit$ = new Subject<void>();
  private readonly onDestroy$ = new Subject<void>();

  // Event Handlers
  private readonly loadMylistHandler$ = this.onInit$.pipe(
    switchMap(() => this.mylistFacade.loadMylist())
  );
  private readonly updateItemHandler$ = this.onUpdate$.pipe(
    switchMap(([id, item]) =>
      this.mylistFacade.update({
        id,
        title: item.title,
        description: item.description,
      })
    )
  );
  private readonly deleteItemHandler$ = this.onDelete$.pipe(
    switchMap((id) => this.mylistFacade.delete(id))
  );
  private readonly createItemHandler$ = this.onCreate$.pipe(
    switchMap((item) => this.mylistFacade.create(item))
  );

  constructor(private mylistFacade: MylistFacadeService) {}

  ngOnInit() {
    merge(
      this.loadMylistHandler$,
      this.updateItemHandler$,
      this.deleteItemHandler$,
      this.createItemHandler$
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
    this.onInit$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
