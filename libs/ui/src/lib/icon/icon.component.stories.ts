import { IconComponent } from './icon.component';

export default {
  title: 'IconComponent',
};

const moduleMetadata = {
  declarations: [IconComponent],
};

export const Default = () => ({
  moduleMetadata,
  template: `
    <img ui-icon class="ui-m-4">
    <img ui-icon icon="more" class="ui-m-4" alt="more icon">
    <img ui-icon icon="plus" class="ui-m-4" alt="plus icon">
  `,
});
