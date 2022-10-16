<template>
  <nav>
    <div class="title">weather</div>
  </nav>
</template>

<script lang="ts">
export default { name: "Nav" };
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

nav {
  background: $color-primary;
  max-width: $breakpoint-max-width;
  width: 100%;

  .title {
    color: $color-white;
    font: normal normal 900 35px/47px Nunito;
    letter-spacing: 0px;
    padding: 27px 30px;
  }

  @media screen and (min-width: $breakpoint-medium) {
    background: $color-white;

    .title {
      color: $color-primary;
      padding: 33px 52px;
    }
  }
}
</style>
