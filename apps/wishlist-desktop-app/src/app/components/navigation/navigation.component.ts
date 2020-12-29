import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'wda-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  private readonly navigationEnd$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  );
  readonly isMylistActive$ = this.navigationEnd$.pipe(
    map(() => this.router.isActive('/mylist', true))
  );
  readonly isFriendActive$ = this.navigationEnd$.pipe(
    map(() => this.router.isActive('/friend', true))
  );
  readonly isProfileActive$ = this.navigationEnd$.pipe(
    map(() => this.router.isActive('/profile', true))
  );
  constructor(private router: Router) {}
}
