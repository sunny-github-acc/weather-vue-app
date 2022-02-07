<template>
  <div class="main">
    <SummaryBar />
    <WeeklyMobile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SummaryBar from "@/components/summary-bar/SummaryBar.vue";
import WeeklyMobile from "@/components/weekly-mobile/WeeklyMobile.vue";

export default defineComponent({
  name: "Home",
  components: { SummaryBar, WeeklyMobile },
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
