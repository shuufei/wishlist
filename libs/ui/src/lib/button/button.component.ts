import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
} from '@angular/core';
import type { Color } from '../types';

const HOST_ATTRIBUTES = ['ui-button', 'ui-stroked-button'];

@Component({
  selector: 'button[ui-button], button[ui-stroked-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  set color(value: Color) {
    switch (value) {
      case 'primary':
        this.addStyleClass('ui-bg-color-primary');
        this.addStyleClass('ui-color-white');
        break;
      case 'warn':
        this.addStyleClass('ui-bg-color-warn');
        this.addStyleClass('ui-color-white');
        break;
      default:
        break;
    }
  }

  constructor(private elementRef: ElementRef) {
    this.addStyleClassByAttributes();
  }

  private getHostElement() {
    return this.elementRef.nativeElement as HTMLElement;
  }

  private addStyleClass(name: string) {
    this.getHostElement().classList.add(name);
  }

  private addStyleClassByAttributes() {
    HOST_ATTRIBUTES.filter((attr) =>
      this.getHostElement().hasAttribute(attr)
    ).forEach((attr) => this.addStyleClass(attr));
  }
}
