import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { WishlistFormGroupComponent } from './wishlist-form-group.component';
import { WishlistFormGroupComponentHarness } from './wishlist-form-group.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormControl } from '@ngneat/reactive-forms';

describe('WishlistFormGroupComponent', () => {
  let component: WishlistFormGroupComponent;
  let fixture: ComponentFixture<WishlistFormGroupComponent>;
  let harness: WishlistFormGroupComponentHarness;

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

  beforeEach(async () => {
    fixture = TestBed.createComponent(WishlistFormGroupComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      WishlistFormGroupComponentHarness
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('タイトルと詳細を入力して実行ボタンをクリックした時', () => {
    const titleFormCtrl = new FormControl('');
    const descriptionFormCtrl = new FormControl('');

    const title = 'wishlist title';
    const description = 'wishlist description';

    let clickedExecuteEmitSpy;

    beforeEach(async () => {
      clickedExecuteEmitSpy = jest.spyOn(component.clickedExecute, 'emit');
      component.titleFormCtrl = titleFormCtrl;
      component.descriptionFormCtrl = descriptionFormCtrl;
      await harness.inputTitle(title);
      await harness.inputDescription(description);
      await harness.clickExecuteButton();
    });

    it('実行ボタンのクリックイベントが発火する', () => {
      expect(clickedExecuteEmitSpy).toHaveBeenCalledTimes(1);
    });

    it('Inputで指定したFormControlの値が、入力した値になる', () => {
      expect(titleFormCtrl.value).toBe(title);
      expect(descriptionFormCtrl.value).toBe(description);
    });
  });
});
