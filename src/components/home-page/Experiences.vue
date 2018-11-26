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
      <!-- <div>{{staticData.resume.experiences[0].title}}</div> -->
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
};
</script>

<style>
.experiences {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
