import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './layouts/Default.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
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
          path: '/about',
          name: 'about',
          component: About,
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
