import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { WishlistFormGroupComponent } from '../wishlist-form-group/wishlist-form-group.component';
import { WishlistItemComponent } from './wishlist-item.component';

describe('WishlistItemComponent', () => {
  let component: WishlistItemComponent;
  let fixture: ComponentFixture<WishlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WishlistItemComponent,
        PopupMenuComponent,
        ButtonComponent,
        IconComponent,
        TextFieldComponent,
        WishlistFormGroupComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
