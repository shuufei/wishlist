import { NavigationItemComponent } from './navigation-item.component';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'NavigationItemComponent',
};

const moduleMetadata = {
  declarations: [NavigationItemComponent, ButtonComponent],
};

export const deactive = () => ({
  moduleMetadata,
  template: `
    <a ui-navigation-item>Home</a>
  `,
  props: {},
});

export const active = () => ({
  moduleMetadata,
  template: `
    <a ui-navigation-item [active]="true">Home</a>
  `,
  props: {},
});
