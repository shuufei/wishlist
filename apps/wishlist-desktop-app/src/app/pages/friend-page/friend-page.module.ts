import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendPageRoutingModule } from './friend-page-routing.module';
import { FriendPageComponent } from './friend-page.component';

@NgModule({
  declarations: [FriendPageComponent],
  imports: [CommonModule, FriendPageRoutingModule],
})
export class FriendPageModule {}
