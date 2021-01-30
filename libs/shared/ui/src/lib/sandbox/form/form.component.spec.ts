import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input要素に値を入力した時、入力した値がタイトルに表示される', () => {
    const value = 'form test';

    // input要素にテキストを入力する
    const input = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = input.nativeElement;
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // タイトル要素を取得
    const title = fixture.debugElement.query(By.css('h1'));
    const titleEl: HTMLElement = title.nativeElement;

    // タイトル要素のテキストが、入力値であることを確認
    expect(titleEl.textContent).toBe(value);
  });
});
