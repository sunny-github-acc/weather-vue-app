<template>
  <Nav />
  <router-view />
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import "@/Styles.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: $color-primary;
}

body {
  font-family: Nunito, sans-serif;
  background-color: $color-body-background;
  min-width: 200px;
}
</style>
