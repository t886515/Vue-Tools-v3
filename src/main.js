import Vue from 'vue';
import Quasar, * as All from 'quasar';

import './styles/quasar.styl';
import 'quasar-framework/dist/quasar.ie.polyfills';
import 'quasar-extras/animate';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
import 'quasar-extras/fontawesome';
import 'quasar-extras/ionicons';
import 'quasar-extras/mdi';

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

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App),
}).$mount('#app');
