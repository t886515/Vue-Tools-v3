<template>
  <q-page class="flex flex-center">
    <img src="../assets/namelogo.png" height="50"/>
    <q-item>
      <transition
          appear
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
        >
          <div v-if="show" v-html="test" />
        </transition>
    </q-item>
    <q-item>
      <q-btn label="to-do list" to="todos" />
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      show: true,
      enter: 'bounceInLeft',
      leave: 'bounceOutRight',
      test: 'Hello. Welcome to a collections of random tools. Please pick an option to continue..',
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
