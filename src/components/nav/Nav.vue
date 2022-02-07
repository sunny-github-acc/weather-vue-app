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
  max-width: 1679px;
  width: 100%;

  .title {
    color: $color-white;
    font: normal normal 900 35px/47px Nunito;
    letter-spacing: 0px;
    padding: $mobile-padding-top $mobile-padding-left;
  }

  @media screen and (min-width: $breakpoint-hero) {
    background: $color-white;

    .title {
      color: $color-primary;
      padding: $desktop-padding-top $desktop-padding-left;
    }
  }
}
</style>
