<template>
  <q-page>
    <!-- maybe u should do your own parallax -->
    <!--
      <q-parallax src="/img/background_attempt1.jpg" :height="800">
      <img slot="media" src="../../assets/background_attempt1.jpg"/>
    -->
    <transition
      appear
      :enter-active-class="enterClass"
      :leave-active-class="leaveClass"
    >
      <div class="home" :key="show">
        <div class="home-title">
          <div class="home-title__name montserrat">LINA YANG</div>
          <div class="home-title__titles dosis">
            SOFTWARE ENGINEER・FULL-STACK DEVELOPER・UI DESIGNER
          </div>
          <!-- could use a for loop for this -->
          <div class="home-icons text-center">
            <span class="home-icons__navlink" @click="scrollToPart('about')">
              <q-icon name="face" />。
            </span>
            <span class="home-icons__navlink" @click="scrollToPart('experiences')">
              <q-icon name="description" />。
            </span>
            <span class="home-icons__navlink" @click="scrollToPart('education')">
              <q-icon name="build" />。
            </span>
            <span class="home-icons__navlink" @click="showEmailModal">
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
import { scroll } from 'quasar';
import About from './About.vue';
import Experiences from './Experiences.vue';

const { getScrollTarget, setScrollPosition } = scroll;

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
  methods: {
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
  computed: {
    enterClass() {
      return `animated ${this.enter}`;
    },
    leaveClass() {
      return `animated ${this.leave}`;
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
}
/* we can figure out style later */
.home-title__name {
  /* line-height: 1; */
  color: white;
  text-align: center;

  font-weight: 500;
  /* padding: 10px; */
  font-size: 90px;
}

.home-title__titles {
  text-align: center;
  font-size: 30px;
  color: gray;
}

.home-icons__navlink {
  text-decoration: none;
  color: white;
  width: 80%;
  font-size: 40px;
  font-family: 'Montserrat', sans-serif;
}
</style>
