<template>
  <q-toolbar
    color="dark"
    class="q-pa-none"
  >
    <!-- <img src="../assets/namelogo1.png" size="" /> -->
    <!-- <q-item> -->
      <!-- <img src="../assets/cute-cat-logo.png" height="40" class="q-ma-sm"/> -->
    <!-- </q-item> -->
    <q-toolbar-title class="dancing-script">
      <router-link class="app-header__home-logo" to="/"> ♡ L . Y . </router-link>
      <!-- <div slot="subtitle">A tools and built from Vue, Apollo and Quasar.</div> -->
    </q-toolbar-title>
    <q-tabs color="dark">
      <q-route-tab class="q-py-md"  to="/" exact slot="title" name="home" icon="home" />
      <q-route-tab class="q-py-md"  to="/resources" exact slot="title" name="about" icon="star_border" />
      <q-route-tab class="q-py-md"  to="/todos" exact slot="title" name="todos" icon="list_alt" />
    </q-tabs>
  </q-toolbar>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style>
.app-header__home-logo {
  text-decoration: none;
  color: white;
  font-size: 1.5em;
}
</style>
