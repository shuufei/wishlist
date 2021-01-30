import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'FormComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ReactiveFormsModule],
  },
  component: FormComponent,
  props: {},
});
