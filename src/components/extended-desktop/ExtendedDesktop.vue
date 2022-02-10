<template>
  <div class="extended-desktop" :style="'--day:' + days">
    <div class="date">February 07-14</div>
    <div class="table">
      <div v-for="hour in hours" class="hour" :key="hour">
        {{ hour }}
      </div>
      <div v-for="(thumb, index) in thumbs" class="thumb" :key="index">
        <div class="image-container">
          <div class="now-pin">Now</div>
          <img :src="image" class="image" />
        </div>
        <div class="temperature">
          <div class="number">5</div>
          <div class="symbol">o</div>
        </div>
        <div class="wind">
          <div class="wind-direction">
            <img :src="windDirection" class="image" />
          </div>
          <div class="text">{{ thumb }} ms</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExtendedDesktop",
  components: {},
  data: () => ({
    hours: ["06:00", "10:00", "14:00", "18:00", "22:00", "02:00"],
    days: "'Tue'",
    thumbs: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    image: require("@/assets/images/day/clear.png"),
    windDirection: require("@/assets/images/details/wind-direction-dark.png"),
  }),
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
    overflow: scroll;
    min-width: $breakpoint-desktop;

    .date {
      color: $color-black;
      font: normal normal bold 35px/47px Nunito;
      margin: 57px 0 51px 137px;
    }

    .table {
      display: grid;
      grid-template-columns: repeat(6, minmax(100px, 1fr));
      border-radius: 20px;
      margin: 0 43px 98px 127px;
      overflow: scroll;
      width: calc(100% - 127px);

      .hour {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $color-white;
        border-right: 1px solid $color-main-border;
        border-bottom: 1px solid $color-main-border;
        color: $color-primary-text;
        font: normal normal bold 15px/20px Nunito;
        height: 107px;

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
        background-color: $color-white;
        border-right: 1px solid $color-main-border;
        border-bottom: 1px solid $color-main-border;
        height: 209px;

        .image-container {
          position: relative;
          height: 40px;
          margin-bottom: 22.39px;

          .now-pin {
            position: absolute;
            top: -27px;
            width: 25px;
            text-align: center;
            right: calc(50% - 12.5px);
            color: $color-primary;
            font: normal normal normal 12px/25px Nunito;
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
              transform: matrix(0.9, -0.44, 0.44, 0.9, 0, 0);
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
            position: absolute;
            bottom: 0;
            content: "";
            width: 100%;
            height: 10px;
            background: $color-primary;
          }
        }

        &:nth-child(15) {
          opacity: 0.65;
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
            left: -77px;
            top: calc(50% - 10px);
            color: $color-primary-text;
            font: normal normal bold 15px/20px Nunito;
            height: 20px;
            text-align: center;
            width: 42px;
          }
        }

        &:nth-child(7) {
          &::before {
            content: "Today";
          }
        }

        &:nth-child(13) {
          &::before {
            content: var(--day);
          }
        }

        &:nth-child(19) {
          &::before {
            content: var(--day);
          }
        }

        &:nth-child(25) {
          &::before {
            content: var(--day);
          }
        }

        &:nth-child(31) {
          &::before {
            content: var(--day);
          }
        }

        &:nth-child(37) {
          &::before {
            content: var(--day);
          }
        }

        &:nth-child(43) {
          &::before {
            content: var(--day);
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
