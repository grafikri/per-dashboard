import Vue from 'vue';
import Vuex from 'vuex';

import analytics from './analytics';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    analytics,
  },
});
