import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { WishlistFormGroupComponent } from './wishlist-form-group.component';

describe('WishlistFormGroupComponent', () => {
  let component: WishlistFormGroupComponent;
  let fixture: ComponentFixture<WishlistFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WishlistFormGroupComponent,
        PopupMenuComponent,
        ButtonComponent,
        IconComponent,
        TextFieldComponent,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
