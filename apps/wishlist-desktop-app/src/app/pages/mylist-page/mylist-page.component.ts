import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { MylistFacadeService } from '@wishlist/mylist/feature-shell';
import { WishlistItem } from '@wishlist/shared/ui';
import { tag } from 'rxjs-spy/operators/tag';
import { ApolloService } from './services/apollo.service';

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
  readonly onUpdate$ = new Subject<[id: string, item: WishlistItem]>();
  readonly onDelete$ = new Subject<string>();
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

  listRes$ = this.apolloService.list();

  usersRes$ = this.apolloService.getUsers();

  constructor(
    private mylistFacade: MylistFacadeService,
    private apolloService: ApolloService
  ) {}

  ngOnInit() {
    merge(
      this.loadMylistHandler$,
      this.updateItemHandler$,
      this.deleteItemHandler$,
      this.createItemHandler$
    ).pipe(takeUntil(this.onDestroy$));
    // .subscribe();
    this.onInit$.next();

    // this.apolloService.list();
    // this.apolloService
    //   .create({
    //     title: 'title_' + new Date().toISOString(),
    //     description: 'description_' + new Date().toISOString(),
    //   })
    //   .subscribe((v) => console.log('--- create sub: ', v));
    // setTimeout(() => {
    //   this.apolloService.list().subscribe((v) => console.log('--- sub2: ', v));
    // }, 3000);
    // this.apolloService.list().subscribe((v) => console.log('--- sub3: ', v));
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  create() {
    this.apolloService
      .create({
        title: 'title_' + new Date().toISOString(),
        description: 'description_' + new Date().toISOString(),
      })
      .subscribe((v) => console.log('--- create sub: ', v));
  }

  delete(id: string) {
    return this.apolloService.delete(id).subscribe();
  }

  update(id: string) {
    return this.apolloService
      .update(id, {
        title: 'update_' + new Date().toISOString(),
        description: 'update_' + new Date().toISOString(),
      })
      .subscribe();
  }

  getWishlist() {
    this.apolloService.list2().subscribe();
  }

  getUsers() {
    return this.apolloService.getUsers().subscribe();
  }

  getWishlistById() {
    this.apolloService.getWishlist('161683081231618').subscribe();
  }
}
