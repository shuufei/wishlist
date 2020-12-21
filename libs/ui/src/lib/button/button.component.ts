import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  ViewEncapsulation,
} from '@angular/core';

const HOST_ATTRIBUTES = ['ui-button', 'ui-stroked-button'];

@Component({
  selector: 'button[ui-button], button[ui-stroked-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input()
  set color(value: Color) {
    this.getHostElement().classList.add(value);
  }

  constructor(private elementRef: ElementRef) {
    this.addBaseStyleClass();
    this.addStyleClassByAttributes();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }

  private addStyleClassByAttributes() {
    HOST_ATTRIBUTES.filter((attr) =>
      this.getHostElement().hasAttribute(attr)
    ).forEach((attr) => this.getHostElement().classList.add(attr));
  }

  private addBaseStyleClass() {
    this.getHostElement().classList.add('ui-button-base');
  }
}

export type Color = 'primary' | 'warn';
