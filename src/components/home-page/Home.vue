<template>
  <q-page>
    <!-- maybe u should do your own parallax -->

      <!-- <q-parallax src="/img/background_attempt1.jpg" :height="screenHeight">
      <img slot="media" src="../../assets/background_attempt1.jpg"/> -->

    <!-- <q-parallax :height="screenHeight">
      <video slot="media" poster="http://www.markhillard.com/sandbox/media/polina.jpg" autoplay loop muted>
        <source type="video/webm" src="http://www.markhillard.com/sandbox/media/polina.webm">
        <source type="video/mp4" src="http://www.markhillard.com/sandbox/media/polina.mp4">
      </video> -->


    <transition
      appear
      :enter-active-class="enterClass"
      :leave-active-class="leaveClass"
      :duration="{ enter: 1000, leave: 800 }"
    >
      <div class="home" :key="show">
        <div class="home-title">
          <div class="home-title__name montserrat text-grey-3">LINA YANG</div>

          <div v-if="!isDesktop" class="home-title__titles dosis">I draw with code.</div>
          <div v-if="isDesktop" class="home-title__titles dosis text-gray">
            SOFTWARE ENGINEER・FULL-STACK DEVELOPER・UI DESIGNER
          </div>
          <!-- could use a for loop for this -->
          <div v-if="isDesktop" class="text-center">
            <span class="home-title__icons text-grey-3" @click="scrollToPart('about')">
              <q-icon name="face" />。
            </span>
            <span class="home-title__icons text-grey-3" @click="scrollToPart('experiences')">
              <q-icon name="description" />。
            </span>
            <span class="home-title__icons text-grey-3" @click="scrollToPart('education')">
              <q-icon name="school" />。
            </span>
            <span class="home-title__icons text-grey-3" @click="showEmailModal">
              <q-icon name="mail_outlined" />
            </span>
          </div>
        </div>
      </div>
    </transition>
    <!-- </q-parallax> -->

    <About id="about" />
    <Experiences id="experiences"/>
  </q-page>
</template>

<script>
import About from './About.vue';
import Experiences from './Experiences.vue';

export default {
  name: 'home',
  components: {
    About,
    Experiences,
  },
  data() {
    return {
      show: true,
      enter: 'fadeIn',
      leave: 'fadeOut',
    };
  },
  props: ['scrollToPart', 'showEmailModal'],
  computed: {
    enterClass() {
      return `animated ${this.enter}`;
    },
    leaveClass() {
      return `animated ${this.leave}`;
    },
    screenHeight() {
      // eslint-disable-next-line
      return screen.height;
    },
    isDesktop() {
      // console.log(this.$q.screen);
      return this.$q.screen.width > this.$q.screen.sizes.md;
    },
  },
};
</script>

<style>
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../../assets/background_attempt1.jpg') no-repeat;
  background-size: cover;
  background-color: transparent;
}

.home-title {
  padding-bottom: 60px;
}
/* we can figure out style later */
.home-title__name {
  /* line-height: 1; */
  text-align: center;
  font-weight: 500;
  font-size: 6.4vw;
  text-shadow: none;
}

.home-title__titles {
  text-align: center;
  font-size: 2.1vw;
  color: gray;
  text-shadow: none;
}

@media only screen and (max-width: 768px) {
  .home-title__name {
    font-size: 13vw;
  }

  .home-title__titles {
    font-size: 5vw;
  }
}

.home-title__icons {
  text-decoration: none;
  color: beige;
  width: 80%;
  font-size: 40px;
  font-family: 'Montserrat', sans-serif;
  text-shadow: none;
}
</style>
