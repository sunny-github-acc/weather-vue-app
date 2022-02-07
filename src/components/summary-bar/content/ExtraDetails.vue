<template>
  <div class="extra-details">
    <div class="extra-detail-column">
      <div
        v-for="detail in detailsColumnOne"
        :key="detail.id"
        class="detail-container"
      >
        <div :class="'image-container ' + detail.id">
          <img class="image" :src="detail.image" />
        </div>
        <div class="detail">{{ detail.title }}: 6ms</div>
      </div>
    </div>
    <div class="extra-detail-column">
      <div
        v-for="detail in detailsColumnTwo"
        :key="detail.id"
        class="detail-container"
      >
        <div :class="'image-container ' + detail.id">
          <img class="image" :src="detail.image" />
        </div>
        <div class="detail">{{ detail.title }}: 6ms</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExtraDetails",
  data: () => ({
    detailsColumnOne: [
      {
        image: require("@/assets/images/details/wind-speed.png"),
        id: "wind-speed",
        title: "Wind speed",
      },
      {
        image: require("@/assets/images/details/wind-gust.png"),
        id: "wind-gust",
        title: "Wind gust",
      },
      {
        image: require("@/assets/images/details/wind-direction.png"),
        id: "wind-direction",
        title: "Wind direction",
      },
    ],
    detailsColumnTwo: [
      {
        image: require("@/assets/images/details/cloud-cover.png"),
        id: "cloud-cover",
        title: "Cloud cover",
      },
      {
        image: require("@/assets/images/details/sea-level-pressure.png"),
        id: "sea-level-pressure",
        title: "Sea level pressure",
      },
      {
        image: require("@/assets/images/details/total-precipitation.png"),
        id: "total-precipitation",
        title: "Total precipitation",
      },
    ],
  }),
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.extra-details {
  display: flex;
  margin-bottom: 20px;

  .extra-detail-column {
    display: flex;
    flex-wrap: wrap;
    width: 50%;

    .detail-container {
      display: flex;
      align-items: center;

      .image-container {
        display: flex;
        justify-content: center;
        margin-right: 7.16px;
        width: 20px;

        &.wind-speed {
          .image {
            width: 17.84px;
          }
        }

        &.cloud-cover {
          .image {
            width: 16.37px;
          }
        }

        &.wind-gust {
          .image {
            width: 17.84px;
          }
        }

        &.sea-level-pressure {
          .image {
            width: 7.6px;
          }
        }

        &.wind-direction {
          transform: matrix(0.93, -0.36, 0.36, 0.93, 0, 0);

          .image {
            width: 15px;
            height: 17px;
          }
        }

        &.total-precipitation {
          .image {
            height: 14.7px;
          }
        }
      }

      .detail {
        color: $color-white;
        font: normal normal normal 13px/36px Nunito;
        white-space: nowrap;
      }
    }
  }
}

@media screen and (min-width: $breakpoint-hero) {
  .extra-details {
    flex-direction: column;

    .extra-detail-column {
      width: 100%;

      .detail-container {
        margin-left: 20px;

        .image-container {
          margin-right: 9.63px;
          width: 30px;

          &.wind-speed {
            .image {
              width: 23.37px;
            }
          }

          &.cloud-cover {
            .image {
              width: 22.35px;
            }
          }

          &.wind-gust {
            .image {
              width: 23.37px;
            }
          }

          &.sea-level-pressure {
            .image {
              height: 21.14px;
            }
          }

          &.wind-direction {
            transform: matrix(0.93, -0.36, 0.36, 0.93, 0, 0);

            .image {
              width: 13px;
            }
          }

          &.total-precipitation {
            .image {
              height: 19.26px;
            }
          }
        }

        .detail {
          font: normal normal normal 18px/50px Nunito;
        }
      }
    }
  }
}
</style>
