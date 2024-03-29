<template>
  <div class="search">
    <input
      v-model="input"
      v-on:keyup.enter="searchLocation"
      :class="'input ' + isExtention"
      @blur="clearSuggestions"
      type="text"
    />
    <button
      class="search-button"
      :class="loading ? 'loading' : null"
      @click="searchLocation"
    />
    <div
      v-if="filteredPlaces.length > 0 || errorMessage"
      class="input-extention-container"
    >
      <div class="input-extention" v-if="!errorMessage">
        <div
          v-for="{ code: place } in filteredPlaces"
          class="extention"
          :key="place"
          @mousedown.prevent=""
          @click="pickLocation(place)"
        >
          <span class="not-matching-input">{{
            placeSuggestion(place, 0)
          }}</span>
          <span class="matching-input">{{ location }}</span>
          <span class="not-matching-input">{{
            placeSuggestion(place, 1)
          }}</span>
        </div>
      </div>
      <div v-if="errorMessage" class="input-extention">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { fetchPlaces } from "@/api/API";
import { IPlaces } from "@/models/Models";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    input: "Klaipeda",
    location: "Klaipeda",
    places: [] as IPlaces[],
    filteredPlaces: [] as IPlaces[],
    url: "https://weather-server-90jn.onrender.com/",
    timeout: 0,
  }),
  computed: {
    isExtention: function () {
      return this.filteredPlaces.length !== 0 || this.errorMessage
        ? "with-extention"
        : "";
    },
  },
  created: function () {
    if (this.places.length === 0) {
      fetchPlaces(this.url).then(({ data }) => {
        if (data) {
          this.places = data;
        } else {
          this.setErrorMessage("We have a connection problem..");
        }
      });
    }
  },
  methods: {
    clearSuggestions() {
      setTimeout(() => (this.filteredPlaces = []), 0);
      setTimeout(() => this.setErrorMessage(""), 0);
    },
    filterPlaces() {
      this.filteredPlaces = this.places
        .filter(
          ({ code }: { code: string }) =>
            code.includes(this.input.toLowerCase()) && this.input !== ""
        )
        .sort((a, b) => a.name.length - b.name.length);
      this.location = this.input;

      if (this.filteredPlaces.length > 0 || this.input === "") {
        this.setErrorMessage("");
      } else {
        this.setErrorMessage("We could not find this location");
      }
    },
    placeSuggestion(place: string, index: number) {
      return place
              .replace(this.location.toLowerCase(), " ")
              .split(" ")[index];
    },
    pickLocation(place: string) {
      this.input = this.location = place;
      this.searchLocation();
    },
    searchLocation() {
      if (this.input) {
        this.filteredPlaces = [];
        this.setErrorMessage("");
        this.$emit("search-location", this.input);
      }
    },
    setErrorMessage(message: string) {
      this.$emit("set-error-message", message);
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
  props: {
    loading: { type: Boolean },
    errorMessage: { type: String },
  },
  emits: ["search-location", "set-error-message"],
  watch: {
    input: {
      handler() {
        this.setErrorMessage("");

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

.search {
  background: $color-primary;
  padding: 0 30px 0;
  margin-top: -1px;
  width: 100%;

  @media screen and (min-width: $breakpoint-medium) {
    border-radius: 13px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0 19px 0 25px;
    width: 65%;
    height: 100%;
  }

  @media screen and (min-width: $breakpoint-large) {
    width: 374px;
  }
}

.input {
  background: $color-white 0% 0% no-repeat padding-box;
  border-radius: 13px;
  border: none;
  color: $color-search-placeholder;
  font-size: 20px;
  height: 38px;
  max-width: 650px;
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

  @media screen and (min-width: $breakpoint-medium) {
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

  &.loading {
    animation: rotation 1s infinite linear;

    @keyframes rotation {
      100% {
        transform: rotatey(360deg);
      }
    }
  }
}

.input-extention-container {
  position: relative;
  top: calc(0px - $input-margin-bottom);
  max-width: 650px;

  .input-extention {
    position: absolute;
    background-color: $color-white;
    border-radius: 0px 0px 13px 13px;
    border-top: 1px solid $color-main-border;
    max-height: 111px;
    overflow: auto;
    padding: 8px 0 8px 21px;
    width: 100%;

    &,
    & * {
      color: $color-primary-text;
      font: normal normal bold 18px/30px Nunito;
      transition: all 0.3s;
    }

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
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

  @media screen and (min-width: $breakpoint-medium) {
    .input-extention {
      padding-left: 29px;
    }
  }
}
</style>
