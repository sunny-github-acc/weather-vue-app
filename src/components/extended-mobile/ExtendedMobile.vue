<template>
  <div class="extended-mobile">
    <div
      v-for="(stamp, index) in stamps"
      :key="'stamps' + stamp[0].forecastTimeUtc"
    >
      <div
        v-if="
          new Date(stamp[0].forecastTimeUtc).getDay() != new Date().getDay()
        "
        @click="
          {
            handleHiddenDays(stamp[0].forecastTimeUtc, index);
          }
        "
        class="divider"
      >
        <div class="text">
          {{ weekdays[new Date(stamp[0].forecastTimeUtc).getDay()] }}
        </div>
        <div
          :class="
            !isWeekdays[new Date(stamp[0].forecastTimeUtc).getDay()]
              ? 'selected'
              : ''
          "
          class="chevron"
        >
          <img :src="chevron" />
        </div>
      </div>
      <div
        :class="
          !isWeekdays[new Date(stamp[0].forecastTimeUtc).getDay()]
            ? 'hidden'
            : 'visible'
        "
      >
        <div
          v-for="{
            forecastTimeUtc,
            conditionCode,
            airTemperature,
            windDirection,
            windSpeed,
          } in stamp"
          :key="forecastTimeUtc"
          class="weekdays"
        >
          <div :class="stamp[0].forecastTimeUtc" class="day-summary">
            <div class="hours">
              {{ handleZero(new Date(forecastTimeUtc).getHours()) }}:00
            </div>
            <div class="image-container">
              <img :src="getImage(conditionCode)" class="image" />
            </div>
            <div class="temperature">
              <span class="number">{{ airTemperature }}</span>
              <span class="symbol">o</span>
            </div>
            <div class="text-image-container">
              <div class="wind-direction">
                <img
                  :src="windDirectionSrc"
                  :style="'--wind-direction:' + windDirection + 'deg'"
                  class="image wind-direction"
                />
              </div>
              <div class="text">{{ windSpeed }} ms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  IForecast,
  IForecastForecastTimestamps,
  IBooleanObject,
} from "@/models/Models";
import { handleZero } from "@/helpers/handleZero";

export default defineComponent({
  name: "ExtendedMobile",
  components: {},
  data: () => ({
    windDirectionSrc: require("@/assets/images/details/wind-direction-dark.png"),
    chevron: require("@/assets/images/arrow/arrow.png"),
    lastHour: 0,
    weekday: "",
    weekdays: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    isWeekdays: new Array(7).fill(false),
    hiddenDays: {} as IBooleanObject,
  }),
  beforeMount() {
    this.isWeekdays[new Date().getDay() % 7] = true;
    this.isWeekdays[(new Date().getDay() + 1) % 7] = true;
  },
  methods: {
    handleHiddenDays(time: string, index: number) {
      this.isWeekdays[new Date(time).getDay()] =
        !this.isWeekdays[new Date(time).getDay()];

      this.isWeekdays[new Date(time).getDay()] &&
        index === 6 &&
        setTimeout(() => {
          document
            .getElementsByClassName(time)
            [document.getElementsByClassName(time).length - 1].scrollIntoView({
              behavior: "smooth",
            });
        }, 350);
    },
    isHiddenDay(stamp: string) {
      return this.hiddenDays[stamp];
    },
    handleZero,
    getImage(conditionCode: string) {
      return require(`@/assets/images/day/${conditionCode}.png`);
    },
  },
  props: {
    stamps: {
      type: Object as () => IForecastForecastTimestamps[][],
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.hidden {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.visible {
  max-height: 1000px;
  overflow: hidden;
  transition: max-height 0.5s ease-in;
}

.day-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 102px;
  padding: 0 30px;
  background: $color-white 0% 0% no-repeat padding-box;
  border-top: none;
  border: 1px solid $color-main-border;
  white-space: nowrap;

  .hours {
    color: $color-primary-text;
    font: normal normal bold 15px/20px Nunito;
  }

  .image-container {
    width: 28.8px;
    display: none;

    @media screen and (min-width: $breakpoint-mini) {
      display: block;
    }
  }

  .temperature {
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
      width: 16.19px;
      margin-right: 8px;
      transform: rotate((var(--wind-direction)));
    }

    .text {
      color: $color-main-weather-details;
      font: normal normal bold 15px/25px Nunito;
    }
  }

  @media screen and (min-width: $breakpoint-small) {
    padding-right: 20%;
  }
}

.divider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid $color-main-border;
  border-top: none;
  height: 102px;
  padding: 0 22px;

  .text {
    color: $color-primary-text;
    font: normal normal bold 18px/24px Nunito;
  }

  .chevron {
    color: $color-primary-text;
    font: normal normal bold 25px/25px Nunito;
    transform: rotate(90deg);
    transition: all 0.3s;

    img {
      height: 35px;
    color: $color-primary-text;
    }

    &.selected {
      transform: rotate(270deg);
      transition: all 0.3s;
    }
  }
}

@media screen and (min-width: $breakpoint-medium) {
  .extended-mobile {
    display: none;
  }
}
</style>
