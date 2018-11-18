<template>
  <q-page class="flex flex-center">

    <!-- <img src="../assets/namelogo.png" height="50"/> -->

    <!-- <q-item> -->
      <transition
          appear
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
        >
          <div v-if="show" v-html="test">

        </div>
      </transition>
    <!-- </q-item> -->

    <!-- <q-item>
      <q-btn label="to-do list" to="todos" />
    </q-item> -->

  </q-page>
</template>

<script>
import Logo from './Logo.js';

export default {
  name: 'home',
  data() {
    return {
      show: true,
      enter: 'fadeIn',
      leave: 'fadeOut',
      test: Logo,
    };
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
.home__name {
  line-height: 1;
  color: black;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 90px;
}

.home__titles {
  text-align: center;
  font-family: 'Dosis', sans-serif;
  font-size: 30px;
  color: gray;
}

.navlink {
  text-decoration: none;
  color: #212121;
  width: 80%;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
}
</style>
