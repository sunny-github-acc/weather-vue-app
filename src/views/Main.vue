<template>
  <div class="main">
    <Summary @search-location="searchLocation" />
    <ExtendedMobile />
    <ExtendedDesktop />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Summary from "@/components/summary/Summary.vue";
import ExtendedMobile from "@/components/extended-mobile/ExtendedMobile.vue";
import ExtendedDesktop from "@/components/extended-desktop/ExtendedDesktop.vue";

export default defineComponent({
  name: "Home",
  components: { Summary, ExtendedMobile, ExtendedDesktop },
  data: () => ({
    url: "http://localhost:8080/v1/places/vilnius",
    errorMessage: "",
  }),
  methods: {
    searchLocation(input: string) {
      console.log(
        "🚀 ~ file: Main.vue ~ line 24 ~ searchLocation ~ input",
        input
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.main {
  background: $color-main-background 0% 0% no-repeat padding-box;
  max-width: $breakpoint-max-width;
  width: 100%;

  @media screen and (min-width: $breakpoint-desktop) {
    display: flex;
    padding: 31px 44px;
    overflow: scroll;
  }
}
</style>
