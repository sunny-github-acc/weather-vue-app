<template>
  <div class="extended-mobile">
    <div class="day-summary">
      <div class="hours">18:00</div>
      <div class="image-container">
        <img :src="image.image" class="image" />
      </div>
      <div class="temperature">
        <span class="number">5</span>
        <span class="symbol">o</span>
      </div>
      <div class="text-image-container">
        <div class="wind-direction">
          <img :src="windDirection" class="image" />
        </div>
        <div class="text">8 ms</div>
      </div>
    </div>
    <div class="divider">
      <div class="text">Tuesday</div>
      <div class="chevron selected">></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExtendedMobile",
  components: {},
  data: () => ({
    image: {
      image: require("@/assets/images/day/clear.png"),
      id: "wind-speed",
      title: "Wind speed",
    },
    windDirection: require("@/assets/images/details/wind-direction-dark.png"),
  }),
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.day-summary {
  display: flex;
  align-items: center;
  background: $color-white 0% 0% no-repeat padding-box;
  border: 1px solid $color-main-border;
  border-top: none;
  padding-left: calc($mobile-padding-left - 2px);
  height: 102px;
  width: 100%;

  .hours {
    color: $color-main-time;
    font: normal normal bold 15px/20px Nunito;
    margin-right: 38px;
  }

  .image-container {
    width: 28.8px;
    margin-right: 65px;
  }

  .temperature {
    margin-right: 67.11px;

    & * {
      color: $color-main-weather-details;
      font: normal normal bold 25px/34px Nunito;
    }

    .symbol {
      position: relative;
      font: normal normal normal 13px/16px Futura;
      bottom: 20px;
    }
  }

  .text-image-container {
    display: flex;
    align-items: center;

    .wind-direction {
      display: flex;
      margin-right: 5.66px;
      width: 16.19px;
      transform: matrix(0.99, -0.1, 0.1, 0.99, 0, 0);
    }

    .text {
      color: $color-main-weather-details;
      font: normal normal bold 15px/25px Nunito;
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid $color-main-border;
  border-top: none;
  height: 102px;
  padding: 0 calc($mobile-padding-left - 2px);

  .text {
    color: $color-main-time;
    font: normal normal bold 18px/24px Nunito;
  }

  .chevron {
    color: $color-main-time;
    font: normal normal bold 25px/25px Nunito;
    transform: rotate(90deg);
    transition: all 0.3sec;

    &.selected {
      transform: rotate(270deg);
    }
  }
}

@media screen and (min-width: $breakpoint-hero) {
  .extended-mobile {
    display: none;
  }
}
</style>
