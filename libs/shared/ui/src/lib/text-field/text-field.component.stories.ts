import { TextFieldComponent } from './text-field.component';

export default {
  title: 'TextFieldComponent',
};

const moduleMetadata = {
  declarations: [TextFieldComponent],
};

export const input = () => ({
  moduleMetadata,
  template: `
    <input ui-text-field type="text" class="ui-m-4">
    <input ui-text-field type="text" class="ui-m-4" typography="display1">
    <input ui-text-field type="text" class="ui-m-4" typography="heading">
    <input ui-text-field type="text" class="ui-m-4" typography="heading-b">
    <input ui-text-field type="text" class="ui-m-4" typography="subheading">
    <input ui-text-field type="text" class="ui-m-4" typography="subheading-b">
    <input ui-text-field type="text" class="ui-m-4" typography="body">
    <input ui-text-field type="text" class="ui-m-4" typography="body-b">
    <input ui-text-field type="text" class="ui-m-4" typography="caption">
  `,
});

export const textarea = () => ({
  moduleMetadata,
  template: `
    <textarea ui-text-field type="text" class="ui-m-4"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="display1"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="heading"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="heading-b"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="subheading"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="subheading-b"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="body"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="body-b"></textarea>
    <textarea ui-text-field type="text" class="ui-m-4" typography="caption"></textarea>
  `,
});
