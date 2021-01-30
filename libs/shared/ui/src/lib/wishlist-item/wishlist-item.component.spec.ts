import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { PopupMenuComponent } from '../popup-menu/popup-menu.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { WishlistFormGroupComponent } from '../wishlist-form-group/wishlist-form-group.component';
import { WishlistItemComponent } from './wishlist-item.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { PopupMenuComponentHarness } from '../popup-menu/popup-menun.component.harness';
import { WishlistFormGroupComponentHarness } from '../wishlist-form-group/wishlist-form-group.component.harness';
import { WishlistItemComponentHarness } from './wishlist-item.component.harness';

fdescribe('WishlistItemComponent', () => {
  let component: WishlistItemComponent;
  let fixture: ComponentFixture<WishlistItemComponent>;
  let loader: HarnessLoader;
  let harness: WishlistItemComponentHarness;

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

  beforeEach(async () => {
    fixture = TestBed.createComponent(WishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = await TestbedHarnessEnvironment.loader(fixture);
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      WishlistItemComponentHarness
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputにタイトルと詳細を指定した時', () => {
    const title = 'wishlist title';
    const description = 'wishlist description';

    beforeEach(() => {
      component.title = title;
      component.description = description;
      fixture.detectChanges();
    });

    it('Inputに指定したタイトルと詳細が表示される', async () => {
      const actualTitle = await harness.getTitleValue();
      const actualDescription = await harness.getDescriptionValue();
      expect(actualTitle).toBe(title);
      expect(actualDescription).toBe(description);
    });
  });

  describe('編集ボタンをクリックした時', () => {
    beforeEach(async () => {
      const popupMenu = await loader.getHarness(PopupMenuComponentHarness);
      await popupMenu.openPopup();
      await popupMenu.clickMenu(0);
      fixture.detectChanges();
    });

    it('編集モードになる', async () => {
      const formGroup = await loader.getHarness(
        WishlistFormGroupComponentHarness
      );
      expect(formGroup).toBeTruthy();
    });
  });

  describe('タイトルと詳細の編集を実行した時', () => {
    const title = 'wishlist title';
    const description = 'wishlist description';
    const updatedTitle = 'wishlist title update';
    const updatedDescription = 'wishlist description update';

    beforeEach(async () => {
      component.title = title;
      component.description = description;
      const popupMenu = await loader.getHarness(PopupMenuComponentHarness);
      await popupMenu.openPopup();
      await popupMenu.clickMenu(0);
      const formGroup = await loader.getHarness(
        WishlistFormGroupComponentHarness
      );
      await formGroup.inputTitle(updatedTitle);
      await formGroup.inputDescription(updatedDescription);
      await formGroup.clickExecuteButton();
      fixture.detectChanges();
    });

    it('更新されたタイトルと詳細が表示される', async () => {
      const actualTitle = await harness.getTitleValue();
      const actualDescription = await harness.getDescriptionValue();
      expect(actualTitle).toBe(updatedTitle);
      expect(actualDescription).toBe(updatedDescription);
    });
  });
});
