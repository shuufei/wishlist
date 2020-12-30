import { MenuAction, PopupMenuComponent } from './popup-menu.component';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'PopupMenuComponent',
};

const moduleMetadata = {
  declarations: [PopupMenuComponent, IconComponent, ButtonComponent],
};

const actions: MenuAction[] = [
  {
    text: '編集',
  },
  {
    text: '削除',
    color: 'warn',
  },
];

export const Default = () => ({
  moduleMetadata,
  component: PopupMenuComponent,
  props: {
    actions,
  },
});
