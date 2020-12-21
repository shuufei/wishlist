import { ButtonDirective } from './button.directive';
export default {
  title: 'Button',
};

export const Primary = () => ({
  moduleMetadata: {
    declarations: [ButtonDirective],
  },
  template: `
    <button uiButton>Button</button>
  `,
});
