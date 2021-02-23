import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'wda-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  readonly primaryStatus = TuiStatus.Primary;

  edited(event: unknown) {
    console.log('---- edited: ', event);
  }
}
