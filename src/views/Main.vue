<template>
  <div class="main">
    <SummaryBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SummaryBar from "@/components/summary-bar/SummaryBar.vue";

export default defineComponent({
  name: "Home",
  components: { SummaryBar },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.main {
  background: $color-main-background 0% 0% no-repeat padding-box;
  max-width: 1679px;
  width: 100%;

  @media screen and (min-width: $breakpoint-hero) {
    padding: 31px 44px;
  }
}
</style>
