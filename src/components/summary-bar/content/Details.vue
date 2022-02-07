<template>
  <div class="details">
    <div class="image-container">
      <img :src="image" class="image" />
    </div>
    <div class="temperature">
      <p class="number">5</p>
      <p class="symbol">o</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Details",
  data: () => ({
    image: require("@/assets/images/day/clear.png"),
  }),
  methods: {
    getImgUrl(image: string) {
      return require(image);
    },
    setImage(): void {
      this.image = require("@/assets/images/day/fog.png");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.details {
  display: flex;
  align-items: flex-end;
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

  @media screen and (min-width: $breakpoint-hero) {
    .image-container {
      margin: 0 15.03px 0 25px;
    }
  }
}
</style>
