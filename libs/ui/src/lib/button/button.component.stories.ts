import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
};

const moduleMetadata = {
  declarations: [ButtonComponent],
};

export const fill = () => ({
  moduleMetadata,
  template: `
    <button ui-button class="ui-m-2">default button</button>
    <button ui-button color="basic" class="ui-m-2">basic button</button>
    <button ui-button color="primary" class="ui-m-2">primary button</button>
    <button ui-button color="warn" class="ui-m-2">warn button</button>
  `,
  props: {},
});

export const stroked = () => ({
  moduleMetadata,
  template: `
  <button ui-stroked-button class="ui-m-2">default button</button>
  <button ui-stroked-button color="basic" class="ui-m-2">basic button</button>
  <button ui-stroked-button color="primary" class="ui-m-2">primary button</button>
  <button ui-stroked-button color="warn" class="ui-m-2">warn button</button>
  `,
  props: {},
});
