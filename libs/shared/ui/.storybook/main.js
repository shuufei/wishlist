/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const rootMain = require('../../../../.storybook/main');

// Use the following syntax to add addons!
// rootMain.addons.push('');
rootMain.stories.push(
  ...['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.@(js|jsx|ts|tsx)']
);

module.exports = rootMain;
