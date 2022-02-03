<template>
  <div class="Container">
    <SearchBar />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "SummaryBar",
  components: { SearchBar },
  data: () => ({
    location: "",
  }),
  methods: {
    log() {
      console.log(this.location);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;

.Container {
  display: flex;
  align-items: center;
  background: $color-primary;
  padding: 0 $mobile-padding-left 50px;
  width: 100%;

  @media screen and (min-width: $breakpoint-hero) {
    border-radius: 13px;
    width: 374px;
  }
}
</style>
