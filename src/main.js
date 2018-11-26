import Vue from 'vue';
import Quasar, * as All from 'quasar';

import 'quasar-framework/dist/quasar.ie.polyfills';
import 'quasar-extras/animate';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/fontawesome';
import 'quasar-extras/ionicons';
import 'quasar-extras/mdi';
import './styles/quasar.styl';

import { createProvider } from './vue-apollo';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(Quasar, {
  components: All,
  directives: All,
  plugins: All,
});

Vue.config.productionTip = false;

// Register a global custom directive called `v-focus`
Vue.directive('autofocus', {
  // When the bound element is inserted into the DOM...
  inserted(el) {
    // Focus the element
    el.focus();
  },
});

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App),
}).$mount('#app');
