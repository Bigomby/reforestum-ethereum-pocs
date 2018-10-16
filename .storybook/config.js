import { setOptions } from '@storybook/addon-options';
import { configure } from '@storybook/vue';
import Vue from 'vue';
import Buefy from 'buefy';

import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => console.log(err, vm, info);

setOptions({
  hierarchyRootSeparator: /\|/,
  name: 'Reforestum Storybook',
  url: '#',
  addonPanelInRight: true,
  sortStoriesByKind: true,
});

const req = require.context('../stories', true, /\.story\.js$/);
configure(() => req.keys().forEach(filename => req(filename)), module);
