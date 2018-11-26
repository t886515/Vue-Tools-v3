import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './layouts/Default.vue';
import Home from './components/home-page/Home.vue';
import Resources from './components/Resources.vue';
import ApolloTodos from './components/containers/ApolloTodos.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/resources',
          name: 'resources',
          component: Resources,
        },
        {
          path: '/todos',
          name: 'todos',
          component: ApolloTodos,
        },
      ],
    },
  ],
});
