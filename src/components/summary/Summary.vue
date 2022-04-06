<template>
  <div class="summary">
    <div>
      <Details :shortForecast="shortForecast" />
      <Description :shortForecast="shortForecast" :location="location" />
      <ExtraDetails
        :longForecast="longForecast"
        :shortForecast="shortForecast"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Details from "@/components/summary/content/Details.vue";
import Description from "@/components/summary/content/Description.vue";
import ExtraDetails from "@/components/summary/content/ExtraDetails.vue";
import { IForecast, IForecastForecastTimestamps } from "@/models/Models";

export default defineComponent({
  name: "SummaryBar",
  components: { Details, Description, ExtraDetails },
  methods: {},
  props: {
    longForecast: {
      type: Object as () => IForecast,
    },
    shortForecast: {
      type: Object as () => IForecastForecastTimestamps,
    },
    location: { type: String },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;

.summary {
  background: $color-primary;
  padding: 0 22px 50px 23px;
  margin-top: -1px;

  @media screen and (min-width: $breakpoint-desktop) {
    border-radius: 13px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0 19px 50px 25px;
    width: 374px;
    height: 100%;
  }
}
</style>
