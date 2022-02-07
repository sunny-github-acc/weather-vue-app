<template>
  <div class="summary">
    <Search />
    <Details />
    <Description />
    <ExtraDetails />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Search from "@/components/summary/content/Search.vue";
import Details from "@/components/summary/content/Details.vue";
import Description from "@/components/summary/content/Description.vue";
import ExtraDetails from "@/components/summary/content/ExtraDetails.vue";

export default defineComponent({
  name: "SummaryBar",
  components: { Search, Details, Description, ExtraDetails },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;

.summary {
  background: $color-primary;
  padding: 0 calc($mobile-padding-left - 1px) 50px
    calc($mobile-padding-left - 2px);
  width: 100%;

  @media screen and (min-width: $breakpoint-hero) {
    border-radius: 13px;
    padding: 0 calc($mobile-padding-left - 5px) 50px
      calc($mobile-padding-left + 1px);
    width: 374px;
    height: 635.5px;
  }
}
</style>
