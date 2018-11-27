<template>
  <q-page padding class="bg-grey-2">
    <div class="about">
      <!-- possible solution for webpack bundle issue - update these image to another cdn -->
      <!-- also, for this current without hash solution, gotta "load" it first with another img tag before this can be used -->
      <q-parallax class="q-ma-md" src="/img/about_collage3.jpg" :speed="1" :height="parallaxHeight">
        <!-- Dom elements to display while loading image -->
        <div slot="loading">Loading...</div>
        <img slot="media" src="@/assets/about_collage3.jpg">
        <!--
          The rest of Dom elements get displayed on
          top of the Parallax image after it's loaded
        -->
        <h1>About</h1>
      </q-parallax>
      <q-card class="bg-dark q-ma-md about__description">
        <div class="about__description-border q-ma-sm q-pa-sm">
          <q-item-tile class="q-pa-md" color="grey-1">
            <span
              class="dancing-script text-primary about__description-title"
            >
              {{staticData.about.title}}
            </span>
            <br>
            <span v-for="(sentence, index) in staticData.about.paragraphs" :key="index" class="nunito about__description-text">
              {{sentence}}
              <br>
            </span>
          </q-item-tile>
         </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import staticData from '@/assets/static-texts';

export default {
  name: 'about',
  data() {
    return {
      staticData,
    };
  },
  computed: {
    parallaxHeight() {
      return this.$q.screen.width > this.$q.screen.sizes.md ? 600 : 200;
    },
  },
};
</script>

<style>
.about {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

@media only screen and (max-width: 768px) {
  .about {
    flex-wrap: wrap;
    padding: 10px;
  }
}

.about__description {
  min-height: 600px;
}

.about__description-border {
  border: white solid 2px;
  min-height: 585px;
}

.about__description-title {
  font-size: 3em;
  display: flex;
  justify-content: center;
}
.about__description-text {
  font-size: 1.3em;
}
</style>
