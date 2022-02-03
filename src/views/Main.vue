<template>
  <div class="Main">
    <SummaryBar />
  </div>
</template>

<script>
import SummaryBar from "@/components/SummaryBar.vue";

export default {
  name: "Home",
  components: { SummaryBar },
  data() {
    return { src: "" };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.Main {
  background: $color-main-background 0% 0% no-repeat padding-box;
  max-width: 1679px;
  width: 100%;

  @media screen and (min-width: $breakpoint-hero) {
    padding: 31px 44px;
  }
}
</style>
