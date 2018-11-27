<template>
  <q-page padding>
    <div class="experiences">
      <!-- possible solution for webpack bundle issue - update these image to another cdn -->
      <!-- also, for this current without hash solution, gotta "load" it first with another img tag before this can be used -->
      <q-parallax src="/img/city.jpg" :speed="1" :height="200">
        <!-- Dom elements to display while loading image -->
        <div slot="loading">Loading...</div>
        <img slot="media" src="@/assets/city.jpg">
        <!--
          The rest of Dom elements get displayed on
          top of the Parallax image after it's loaded
        -->
        <h1>Experiences</h1>
      </q-parallax>

    </div>

    <div  class="experiences__exp-wrapper q-ma-lg">
      <q-card @mouseover="hoverOverCard" class="q-ma-sm " v-for="exp in staticData.resume.experiences" :key="exp.company">

          <q-card-media @mouseover="hoverOverCard">
            <img src="../../assets/THD_logo.jpg">
          <q-card-title slot="overlay">
            {{exp.company}}
            <span slot="subtitle">{{exp.year}}</span>
          </q-card-title>
          </q-card-media>
          <q-card-main>
            {{exp.title}}
          </q-card-main>
        </q-card>

      <q-card @mouseover="hoverOverCard" class="q-ma-sm " v-for="pro in staticData.resume.projects" :key="pro.name">

          <q-card-media @mouseover="hoverOverCard">
            <img src="../../assets/THD_logo.jpg">
          <q-card-title slot="overlay">
            {{pro.name}}
            <span slot="subtitle">{{pro['sub-title']}}</span>
          </q-card-title>
          </q-card-media>
          <q-card-main>
            {{pro.title}}
          </q-card-main>
        </q-card>

    </div>
  </q-page>
</template>

<script>
import staticData from '@/assets/static-texts';

export default {
  name: 'experiences',
  data() {
    return {
      staticData,
    };
  },
  methods: {
    hoverOverCard() {
      console.log('hovered');
    },
  },
};
</script>

<style>
.experiences__exp-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

@media only screen and (max-width: 768px) {
  .experiences__exp-wrapper {
    display: inline-block;
    padding: 10px;
  }
}
</style>
