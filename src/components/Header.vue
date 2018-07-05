<template>
  <q-toolbar
    color="dark"
    class="q-pa-xs"
  >
    <!-- <img src="../assets/namelogo1.png" size="" /> -->
    <q-item>
      <img src="../assets/cute-cat-logo.png" height="45"/>
    </q-item>
    <q-toolbar-title>
      Some Vue Tools ¯\_(ツ)_/¯
      <div slot="subtitle">A tools and built from Vue, Apollo and Quasar.</div>
    </q-toolbar-title>
    <q-tabs class="q-pa-sm" color="dark" v-model="selectedTab">
      <q-route-tab to="/" exact slot="title" name="home" icon="home" />
      <q-route-tab to="/about" exact slot="title" name="about" icon="star_border" />
      <q-route-tab to="/todos" exact slot="title" name="todos" icon="list_alt" />
    </q-tabs>
  </q-toolbar>
</template>

<script>
export default {
  name: 'app-header',
};
</script>
