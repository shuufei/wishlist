import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';
import { FormComponentHarness } from './form.component.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let harness: FormComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      FormComponentHarness
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input要素に値を入力した時、入力した値がタイトルに表示される', async () => {
    const value = 'form test';

    // input要素にテキストを入力する
    await harness.inputValue(value);

    fixture.detectChanges();

    // タイトル要素を取得
    const titleValue = await harness.getTitleValue();

    // タイトル要素のテキストが、入力値であることを確認
    expect(titleValue).toBe(value);
  });
});
