<template>
  <Nav />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Nav from "@/components/nav/Nav.vue";

export default defineComponent({
  components: {
    Nav,
  },
});
</script>

<style lang="scss">
@import "@/Styles.scss";

* {
  box-sizing: border-box;
  color: $color-primary;
  letter-spacing: 0px;
  margin: 0;
  padding: 0;
}

*:focus {
  outline: none;
}

body {
  background-color: $color-body-background;
  font-family: Nunito, sans-serif;
  min-width: $breakpoint-desktop;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
