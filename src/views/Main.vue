<template>
  <div class="main">
    <div class="search-conatainer">
      <Search
        :error-message="errorMessage"
        :loading="nextLoading"
        @search-location="searchLocation"
        @set-error-message="setErrorMessage"
      />
      <Summary
        v-if="!initialLoading"
        :longForecast="longForecast"
        :shortForecast="shortForecast"
        @search-location="searchLocation"
      />
    </div>
    <ExtendedMobile
      v-if="!initialLoading"
      :stamps="stamps"
      :shortForecast="shortForecast"
    />
    <ExtendedDesktop
      v-if="!initialLoading"
      :stamps="stamps"
      :shortForecast="shortForecast"
    />
  </div>
  <div v-if="initialLoading" class="loader animation">
    <div class="title">weather</div>
    <img class="image" :src="image" />
    <img class="image above" :src="image" />
    <div class="title">
      {{ errorMessage ? "There seems to be a connection problem.." : "Loading might take a while.." }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { fetchForecast } from "@/api/API";
import { findTime } from "@/helpers/findTime";
import { IForecast, IForecastForecastTimestamps } from "@/models/Models";
import ExtendedDesktop from "@/components/extended-desktop/ExtendedDesktop.vue";
import ExtendedMobile from "@/components/extended-mobile/ExtendedMobile.vue";
import Search from "@/components/input/Search.vue";
import Summary from "@/components/summary/Summary.vue";

export default defineComponent({
  name: "Home",
  components: {
    ExtendedDesktop,
    ExtendedMobile,
    Search,
    Summary,
  },
  data: () => ({
    url: ["https://weather-server-90jn.onrender.com/"],
    image: require("@/assets/images/day/clear.png"),
    errorMessage: "",
    longForecast: {} as IForecast,
    shortForecast: {} as IForecastForecastTimestamps,
    initialLoading: true,
    nextLoading: false,
  }),
  computed: {
    stamps() {
      const day = new Date().getDay();
      const groupedStamps = [] as IForecastForecastTimestamps[][];
      const filteredStamps =
        this.longForecast?.forecastTimestamps.filter(
          (stamp) =>
            (this.shortForecast?.forecastTimeUtc || 0) <
              stamp.forecastTimeUtc && this.isValidHours(stamp.forecastTimeUtc)
        ) || [];

      filteredStamps.forEach((stamps) => {
        const stampDay = new Date(stamps.forecastTimeUtc).getDay();
        const isEmpty = !groupedStamps[stampDay];
        isEmpty && (groupedStamps[stampDay] = [stamps]);
        !isEmpty && groupedStamps[stampDay].push(stamps);
      });

      groupedStamps[day] = groupedStamps[day].filter(
        ({ forecastTimeUtc }) =>
          new Date().getDate() === new Date(forecastTimeUtc).getDate()
      );

      const sortedStamps = groupedStamps.map(
        (_, index) => groupedStamps[(index + day) % 7]
      );

      return sortedStamps;
    },
  },
  methods: {
    searchLocation(input: string) {
      this.nextLoading = true;
      fetchForecast(this.url + input).then(
        ({ data, errorMessage }) => {
          if (data?.place?.name) {
            const time = findTime();
            this.longForecast = data;
            this.shortForecast = {
              ...data.forecastTimestamps.filter(
                (stamp) => stamp.forecastTimeUtc.includes(time) === true
              )[0],
              location: data.place.code,
            };
            this.initialLoading = false;
            this.errorMessage = "";
          } else {
            const wrongLocation = "We could not find this location";
            const serverError = "There seems to be a problem.."
            this.errorMessage = errorMessage || data ? wrongLocation : serverError;
          }
          this.nextLoading = false;
        }
      );
    },
    setErrorMessage(message: string) {
      this.errorMessage = message;
    },
    isValidHours(time: string) {
      return [2, 6, 10, 14, 18, 22].includes(new Date(time).getHours());
    },
  },
  beforeMount() {
    this.searchLocation("klaipeda");
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

.main {
  width: 100%;
  max-width: $breakpoint-max-width;
  background: $color-main-background 0% 0% no-repeat padding-box;

  .search-conatainer {
    display: flex;
    flex-direction: column;
    width: 100%;

  @media screen and (min-width: $breakpoint-medium) {
    margin-left: 24%;
  }

  @media screen and (min-width: $breakpoint-large) {
    width: unset;
    margin-left: 0;
  }
  }

  @media screen and (min-width: $breakpoint-medium) {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 31px 44px;
  }

  @media screen and (min-width: $breakpoint-large) {
    align-items: flex-start;
    flex-direction: row;
  }

}

.loader {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  padding-bottom: 30%;
  background: $color-primary;
  overflow: hidden;

  .title {
    padding: 17px 0;
    color: $color-white;
    font: normal normal 900 35px/47px Nunito;
    letter-spacing: 0px;
    text-align: center;
  }

  .image {
    height: 49.34px;
    width: 49.34px;
    margin: 0 auto;
    animation: spin 40s linear infinite;

    &.above {
      margin: -49.34px auto 0;
      animation: spin-backwards 40s linear infinite;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spin-backwards {
      100% {
        transform: rotate(-360deg);
      }
    }
  }

  @media screen and (min-width: $breakpoint-medium) {
    padding-bottom: 10%;
  }
}
</style>
