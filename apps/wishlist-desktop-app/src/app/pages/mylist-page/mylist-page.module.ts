import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MylistPageComponent } from './mylist-page.component';
import { MylistPageRoutingModule } from './mylist-page-routing.module';

@NgModule({
  declarations: [MylistPageComponent],
  imports: [CommonModule, MylistPageRoutingModule],
})
export class MylistPageModule {}
