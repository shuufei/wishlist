import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMenuComponent, MenuAction } from './popup-menu.component';
import { PopupMenuComponentHarness } from './popup-menun.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';

describe('PopupMenuComponent', () => {
  let component: PopupMenuComponent;
  let fixture: ComponentFixture<PopupMenuComponent>;
  let harness: PopupMenuComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupMenuComponent, IconComponent, ButtonComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PopupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      PopupMenuComponentHarness
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('popup menu表示後', () => {
    const actions: MenuAction[] = [
      {
        text: 'edit',
      },
      {
        text: 'delete',
      },
    ];
    beforeEach(async () => {
      component.actions = actions;
      await fixture.detectChanges();
      await harness.openPopup();
    });
    it('menuボタンを押下した時、押下したボタンのclickイベントが発火する', async () => {
      spyOn(component.clickedAction, 'emit');
      const targetIndex = 0;
      await harness.clickMenu(targetIndex);
      expect(component.clickedAction.emit).toHaveBeenCalledWith(
        actions[targetIndex]
      );
    });
  });
});
