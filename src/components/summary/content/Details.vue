<template>
  <div class="details">
    <div class="image-container">
      <img :src="image" class="image" />
    </div>
    <div class="temperature">
      <p class="number">
        {{ shortForecast && Math.round(shortForecast.airTemperature) }}
      </p>
      <p class="symbol">o</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { IForecastForecastTimestamps } from "@/models/Models";

export default defineComponent({
  name: "Details",
  data: () => ({}),
  computed: {
    image() {
      return require("@/assets/images/day/" +
        this.shortForecast?.conditionCode +
        ".png");
    },
  },
  props: {
    shortForecast: {
      type: Object as () => IForecastForecastTimestamps,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.details {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .image-container {
    margin: 0 15.03px 0 7px;
    width: 81.38px;

    .image {
      width: 100%;
    }
  }

  .temperature {
    display: flex;

    * {
      color: $color-white;
    }

    .number {
      font: normal normal bold 69px/94px Nunito;
    }

    .symbol {
      font: normal normal bold 29px/39px Nunito;
      margin: 5px 0 0 -2px;
    }
  }

  @media screen and (min-width: $breakpoint-medium) {
    .image-container {
      margin: 0 15.03px 0 25px;
    }
  }
}
</style>
