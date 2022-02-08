<template>
  <div class="description">Now It's moderate rain</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Description",
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.description {
  color: $color-white;
  font: normal normal bold 25px/34px Nunito;
  margin: 0 0 40px;
  padding: 0 3px;

  @media screen and (min-width: $breakpoint-desktop) {
    padding: 0 21px;
  }
}
</style>
