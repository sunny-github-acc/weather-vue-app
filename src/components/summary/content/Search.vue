<template>
  <input
    :class="'input ' + isExtention"
    v-model="input"
    @focus="fetchAndSetPlaces"
    type="text"
    placeholder="Vilnius"
  />
  <button class="search-button" @click="searchLocation" />
  <div
    v-if="filteredPlaces.length > 0 || errorMessage"
    class="input-extentions-container"
  >
    <div class="input-extentions">
      <div
        v-for="{ code: place } in filteredPlaces"
        :key="place"
        class="extention"
        @click="pickLocation(place)"
      >
        <span class="not-matching-input">{{ placeSuggestion(place, 0) }}</span>
        <span class="matching-input">{{ location }}</span>
        <span class="not-matching-input">{{ placeSuggestion(place, 1) }}</span>
      </div>
    </div>
    <div class="input-extentions">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    input: "",
    location: "",
    places: [],
    filteredPlaces: [],
    url: "http://localhost:8080/v1/places",
    errorMessage: "",
    timeout: 0,
  }),
  computed: {
    isExtention: function () {
      return this.filteredPlaces.length !== 0 || this.errorMessage
        ? "with-extention"
        : "";
    },
  },
  methods: {
    async fetchAndSetPlaces() {
      fetch(this.url)
        .then(async (response) => {
          const data = await response.json();

          if (typeof data === "object") {
            this.places = data;
            this.errorMessage = "";
          }
        })
        .catch(() => {
          this.errorMessage = "Oops.. something went wrong";
        });
    },
    filterPlaces() {
      this.filteredPlaces = this.places.filter(
        ({ code }: { code: string }) =>
          code.includes(this.input) && this.input !== ""
      );
      this.location = this.input;

      if (this.filteredPlaces.length > 0 || this.input === "") {
        this.errorMessage = "";
      } else {
        this.errorMessage = "We could not find this location";
      }
    },
    placeSuggestion(place: string, number: number) {
      const uniqueString = "_" + Math.random().toString(36).substr(2, 9);
      return place.replace(this.location, uniqueString).split(uniqueString)[
        number
      ];
    },
    pickLocation(place: string) {
      this.input = this.location = place;
      this.filteredPlaces = [];
    },
    searchLocation() {
      this.$emit("search-location", this.input);
    },
    debounce(callback: () => void) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        callback();
      }, 500);
    },
  },
  emits: ["search-location"],
  watch: {
    input: {
      handler: function () {
        if (this.input !== this.location) {
          this.debounce(this.filterPlaces);
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;
$input-margin-bottom: 38px;

.input {
  background: $color-white 0% 0% no-repeat padding-box;
  border-radius: 13px;
  border: none;
  color: $color-search-placeholder;
  font-size: 20px;
  height: 38px;
  line-height: 23px;
  margin: 0 0 $input-margin-bottom 0;
  padding: 18px 21px;
  width: 100%;

  &.with-extention {
    border-radius: 13px 13px 0 0;
  }

  &::placeholder {
    color: $color-search-placeholder;
    font: normal normal medium 18px/23px Nunito;
  }

  @media screen and (min-width: $breakpoint-desktop) {
    background: $color-white;
    margin: 28px 0 38px;
    padding: 18px 29px;

    &::placeholder {
      font: normal normal bold 18px/24px Nunito;
    }
  }
}

.search-button {
  background: $color-white;
  border-radius: 100px;
  border: 3px solid $color-primary;
  cursor: pointer;
  height: $search-icon-width;
  margin-left: calc(0px - 13px - $search-icon-width);
  width: $search-icon-width;
}

.input-extentions-container {
  position: relative;
  top: calc(0px - $input-margin-bottom - 6.5px);

  .input-extentions {
    position: absolute;
    background-color: $color-white;
    border-radius: 0px 0px 13px 13px;
    border-top: 1px solid $color-main-border;
    max-height: 111px;
    overflow: scroll;
    padding: 12px 0 8px 21px;
    width: 100%;

    &,
    & * {
      color: $color-primary-text;
      font: normal normal bold 18px/30px Nunito;
      transition: all 0.3s;
    }

    .extention {
      cursor: pointer;

      &:hover {
        filter: brightness(65%);

        .not-matching-input {
          color: $color-primary-text;
        }
      }

      .not-matching-input {
        color: $color-secondary-text;
        font: normal normal bold 18px/30px Nunito;
      }
    }
  }

  @media screen and (min-width: $breakpoint-desktop) {
    .input-extentions {
      padding-left: 29px;
    }
  }
}
</style>
