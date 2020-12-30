import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

import '!style-loader!css-loader!sass-loader!../src/styles/main.scss';
