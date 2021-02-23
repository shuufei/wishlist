import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiHintModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { TuiTagModule } from '@taiga-ui/kit';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    TuiButtonModule,
    TuiHintModule,
    TuiTooltipModule,
    TuiTagModule,
  ],
})
export class ProfilePageModule {}
