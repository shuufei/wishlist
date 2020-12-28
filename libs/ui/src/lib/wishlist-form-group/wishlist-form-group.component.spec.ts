import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistFormGroupComponent } from './wishlist-form-group.component';

describe('WishlistFormGroupComponent', () => {
  let component: WishlistFormGroupComponent;
  let fixture: ComponentFixture<WishlistFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistFormGroupComponent ]
    })
    .compileComponents();
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
