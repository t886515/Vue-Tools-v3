<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <!-- <MobileHeader v-if="!isDesktop"/>
      <DesktopHeader v-if="isDesktop"/> -->
      <AppHeader :toggleLeftDrawer="toggleLeftDrawer"/>
    </q-layout-header>

    <q-layout-drawer
      v-if="!isDesktop"
      v-model="leftDrawerOpen"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Navigation</q-list-header>

            <q-item to="/" exact>
              <q-item-side icon="home" />
              <q-item-main label="Home" />
            </q-item>
            <q-item to="/resources">
              <q-item-side icon="favorite_outline" />
              <q-item-main label="Resources" />
            </q-item>
            <q-item to="/todos">
              <q-item-side icon="list_alt" />
              <q-item-main label="To-Dos Helper" />
            </q-item>

            <q-item-separator />
            <q-list-header>Profiles</q-list-header>
             <q-item @click.native="scrollToPart('about')">
              <q-item-side icon="face" />
              <q-item-main label="About" sublabel="Hi There!"></q-item-main>
            </q-item>

            <q-item @click.native="scrollToPart('experiences')">
              <q-item-side icon="description" />
              <q-item-main label="Experiences" sublabel="What have I done?"></q-item-main>
            </q-item>
             <q-item @click.native="scrollToPart('education')">
              <q-item-side icon="school" />
              <q-item-main label="Education" sublabel="Where did I go to school?"></q-item-main>
            </q-item>

            <q-item @click.native="showEmailModal">
              <q-item-side icon="mail_outline" />
              <q-item-main label="Contact Me" sublabel="Shoot me an email!"></q-item-main>
            </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="bg-grey-2">
      <router-view :scrollToPart="scrollToPart" :showEmailModal="showEmailModal"/>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar';
// import MobileHeader from '@/components/MobileHeader.vue';
// import DesktopHeader from '@/components/DesktopHeader.vue';
import { scroll } from 'quasar';

import AppHeader from '@/components/AppHeader.vue';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'LayoutDefault',
  components: {
    AppHeader,
    // MobileHeader,
    // DesktopHeader
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    isDesktop() {
      return this.$q.screen.width > this.$q.screen.sizes.md;
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    scrollToPart(type) {
      const el = document.getElementById(type);
      const target = getScrollTarget(el);
      const duration = 300;
      setScrollPosition(target, el.offsetTop, duration);
    },
    showEmailModal() {
      console.log('toggle email modal');
    },
  },
};
</script>
