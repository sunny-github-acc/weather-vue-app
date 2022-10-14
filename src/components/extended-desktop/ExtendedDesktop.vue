<template>
  <div class="extended-desktop">
    <div class="date">
      {{ forecastDate }}
    </div>
    <div class="table">
      <div v-for="hour in hours" :key="hour" class="hour">
        {{ hour }}
      </div>
      <div
        v-for="{
            forecastTimeUtc,
            conditionCode,
            airTemperature,
            windDirection,
            windSpeed,
          } in computedStamps"
        :key="'stamps' + forecastTimeUtc"
        :style="cssDays"
        class="thumb"
      >
        <div class="image-container">
          <div class="now-pin">Now</div>
          <img :src="getImage(conditionCode)" class="image" />
        </div>
        <div class="temperature">
          <div class="number">{{ airTemperature }}</div>
          <div class="symbol">o</div>
        </div>
        <div class="wind">
          <div class="wind-direction">
            <img
              :src="windDirectionSrc"
              :style="'--wind-direction:' + windDirection + 'deg'"
              class="image"
            />
          </div>
          <div class="text">{{ windSpeed }} ms</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { IForecastForecastTimestamps } from "@/models/Models";

export default defineComponent({
  name: "ExtendedDesktop",
  components: {},
  data: () => ({
    hours: ["06:00", "10:00", "14:00", "18:00", "22:00", "02:00"],
    days: ["'Mon'", "'Tue'", "'Wen'", "'Thu'", "'Fri'", "'Sat'", "'Sun'"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    image: require("@/assets/images/day/clear.png"),
    windDirectionSrc: require("@/assets/images/details/wind-direction-dark.png"),
  }),
  methods: {
    getImage(conditionCode: string) {
      return require(`@/assets/images/day/${conditionCode}.png`);
    },
  },
  computed: {
    computedStamps() {
      const templateArray = new Array(7).fill([2, 6, 10, 14, 18, 22]);
      let lastStamp = this.stamps[0][0];
      const result = templateArray.map((template, indexPrimary) => {
        let indexSecondary = 0;
        const templateResult: IForecastForecastTimestamps[] = template.map((hour: number) => {
          this.stamps[indexPrimary][indexSecondary] ? lastStamp = this.stamps[indexPrimary][indexSecondary] : null;
          if (hour === new Date(lastStamp.forecastTimeUtc).getHours()) {
            indexSecondary = indexSecondary + 1;
          }
          return lastStamp;
        });
        return templateResult;
      });
      return result.flat(1);
    },
    cssDays() {
      const result = {} as { [key: string]: string };
      this.days.forEach(
        (_, index) =>
          (result[`--day-${index + 1}`] =
            this.days[(index + new Date().getDay()) % 7])
      );

      return result;
    },
    forecastDate() {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const lastDay = new Date(date.setDate(day + 6)).getDate();
      const newMonth = lastDay < 7 ? `${this.months[(month + 1) % 12]} ` : "";
      const isNewMonth = newMonth ? " - " : "-";
      const today = `${this.months[month]} ${day}${isNewMonth}`;
      const finalDate = `${today}${newMonth}${lastDay}`;

      return finalDate;
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

.extended-desktop {
  display: none;
}

@media screen and (min-width: $breakpoint-desktop) {
  .extended-desktop {
    display: unset;
    flex-grow: 1;
    min-width: $breakpoint-desktop;
    margin-left: 15px;
    padding: 0 43px 51px 137px;
    overflow: auto;

    .date {
      margin: 57px 0 51px 0;
      color: $color-black;
      font: normal normal bold 35px/47px Nunito;
    }

    .table {
      display: grid;
      grid-template-columns: repeat(6, minmax(100px, 1fr));
      border-radius: 20px;

      .hour {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 107px;
        background-color: $color-white;
        border-bottom: 1px solid $color-main-border;
        border-right: 1px solid $color-main-border;
        color: $color-primary-text;
        font: normal normal bold 15px/20px Nunito;

        &:first-child {
          border-radius: 20px 0 0 0;
        }

        &:nth-child(6) {
          border-radius: 0 20px 0 0;
          border-right: none;
        }
      }

      .thumb {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 209px;
        background-color: $color-white;
        border-right: 1px solid $color-main-border;
        border-bottom: 1px solid $color-main-border;

        .image-container {
          position: relative;
          height: 40px;
          margin-bottom: 22.39px;

          .now-pin {
            position: absolute;
            top: -27px;
            right: calc(50% - 12.5px);
            width: 25px;
            color: $color-primary;
            font: normal normal normal 12px/25px Nunito;
            text-align: center;
          }

          .image {
            height: 100%;
          }
        }

        .temperature {
          display: flex;
          margin-bottom: 16.18px;

          .number {
            color: $color-main-weather-details;
            font: normal normal bold 25px/34px Nunito;
          }

          .symbol {
            position: relative;
            bottom: 9px;
            color: $color-main-weather-details;
            font: normal normal bold 13px/18px Nunito;
          }
        }

        .wind {
          display: flex;

          .wind-direction {
            margin-right: 5.64px;

            .image {
              height: 18.31px;
              transform: rotate((var(--wind-direction)));
            }
          }

          .text {
            color: $color-main-wind-speed;
            font: normal normal normal 15px/25px Nunito;
          }
        }

        &:nth-last-child(1),
        &:nth-last-child(7),
        &:nth-last-child(13),
        &:nth-last-child(19),
        &:nth-last-child(25),
        &:nth-last-child(31),
        &:nth-last-child(37) {
          border-right: none;
        }

        &:nth-last-child(1) {
          border-radius: 0 0 20px;
        }

        &:nth-last-child(6) {
          border-radius: 0 0 0 20px;
        }

        &:nth-child(7) {
          border-bottom: none;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 10px;
            background: $color-primary;
          }
        }

        &:nth-child(7),
        &:nth-child(13),
        &:nth-child(19),
        &:nth-child(25),
        &:nth-child(31),
        &:nth-child(37),
        &:nth-child(43) {
          &::before {
            position: absolute;
            top: calc(50% - 10px);
            left: -77px;
            width: 42px;
            height: 20px;
            color: $color-primary-text;
            font: normal normal bold 15px/20px Nunito;
            text-align: center;
          }
        }

        &:nth-child(7) {
          &::before {
            content: "Today";
          }
        }

        &:nth-child(13) {
          &::before {
            content: var(--day-1);
          }
        }

        &:nth-child(19) {
          &::before {
            content: var(--day-2);
          }
        }

        &:nth-child(25) {
          &::before {
            content: var(--day-3);
          }
        }

        &:nth-child(31) {
          &::before {
            content: var(--day-4);
          }
        }

        &:nth-child(37) {
          &::before {
            content: var(--day-5);
          }
        }

        &:nth-child(43) {
          &::before {
            content: var(--day-6);
          }
        }
      }

      .days {
        display: flex;
        flex-direction: column;

        & * {
          color: $color-primary-text;
          font: normal normal bold 15px/20px Nunito;
        }
      }
    }
  }
}
</style>
