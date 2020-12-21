import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
};

export const primary = () => ({
  moduleMetadata: {
    declarations: [ButtonComponent],
  },
  template: `
    <button ui-button color="primary">button</button>
  `,
  props: {},
});

export const warn = () => ({
  moduleMetadata: {
    declarations: [ButtonComponent],
  },
  template: `
    <button ui-button color="warn">button</button>
  `,
  props: {},
});
