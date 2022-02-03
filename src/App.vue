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
  min-width: 200px;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
