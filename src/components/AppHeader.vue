<template>
  <q-toolbar
    class="q-pa-none"
    color="dark"
    text-color="grey-1"
  >
    <!-- <img src="../assets/namelogo1.png" size="" /> -->
    <!-- <q-item> -->
      <!-- <img src="../assets/cute-cat-logo.png" height="40" class="q-ma-sm"/> -->
    <!-- </q-item> -->
    <q-toolbar-title class="dancing-script">
      <router-link class="app-header__home-logo" to="/"> ♡ L . Y . </router-link>
      <!-- <div slot="subtitle">A tools and built from Vue, Apollo and Quasar.</div> -->
    </q-toolbar-title>
    <q-tabs v-if="isDesktop" color="dark">
      <q-route-tab class="q-py-md"  to="/" exact slot="title" name="home" icon="home" />
      <q-route-tab class="q-py-md"  to="/resources" exact slot="title" name="resources" icon="favorite_border" />
      <q-route-tab class="q-py-md"  to="/todos" exact slot="title" name="todos" icon="list_alt" />
    </q-tabs>
    <q-btn v-if="!isDesktop" flat round dense icon="menu" class="q-ma-sm" @click="toggleLeftDrawer"/>
  </q-toolbar>
</template>

<script>
export default {
  name: 'app-header',
  props: ['toggleLeftDrawer'],
  computed: {
    isDesktop() {
      return this.$q.screen.width > this.$q.screen.sizes.md;
    },
  },
};
</script>

<style>
.app-header__home-logo {
  text-decoration: none;
  color: white;
  font-size: 1.5em;
}
</style>
