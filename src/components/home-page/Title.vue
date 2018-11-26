<template>
  <transition
    appear
    :enter-active-class="enterClass"
    :leave-active-class="leaveClass"

  >
    <div  class="home" :key="show">
      <div class="home-title">
        <q-item-tile class="home-title__name"> LINA YANG </q-item-tile>
        <div class="home-title__titles"> SOFTWARE ENGINEER・FULL-STACK DEVELOPER・UI DESIGNER </div>
        <!-- could use a for loop for this -->
        <div class="home-icons text-center">
          <router-link class="home-icons__navlink" to="/about">
            <q-icon name="face"/>。
          </router-link>
          <router-link class="home-icons__navlink" to="/resume">
            <q-icon name="description"/>。
          </router-link>
          <router-link class="home-icons__navlink" to="/journal">
              <q-icon name="build"/>。
          </router-link>
          <router-link class="home-icons__navlink" to="/contact">
              <q-icon name="mail_outlined"/>
          </router-link>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'title',
  data() {
    return {
      show: true,
      enter: 'fadeIn',
      leave: 'fadeOut',
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
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* we can figure out style later */
.home-title__name {
  /* line-height: 1; */
  color: black;
  text-align: center;
  /* font-family: 'Josefin Sans', sans-serif; */
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  /* padding: 10px; */
  font-size: 90em;
}

.home-title__titles {
  text-align: center;
  font-family: 'Economica', sans-serif;
  font-size: 30px;
  color: gray;
}

.home-icons__navlink {
  text-decoration: none;
  color: #212121;
  width: 80%;
  font-size: 40px;
  font-family: 'Montserrat', sans-serif;
}
</style>
