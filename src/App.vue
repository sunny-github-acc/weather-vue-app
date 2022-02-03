<template>
  <div id="nav">weather</div>
  <router-view />
</template>

<style lang="scss">
@import "./Styles.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: $color-primary;
}

body {
  font-family: Nunito, sans-serif;
}
</style>
