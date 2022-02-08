<template>
  <input class="input" v-model="location" type="text" placeholder="Vilnius" />
  <button class="search-button" @click="log()" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    location: "",
  }),
  methods: {
    log() {
      console.log(this.location);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;

.input {
  background: $color-white 0% 0% no-repeat padding-box;
  border-radius: 13px;
  border: none;
  color: $color-white;
  font-size: 20px;
  height: 38px;
  line-height: 23px;
  margin: 0 0 38px;
  padding: 18px 13px;
  width: 100%;

  &::placeholder {
    color: $color-search-placeholder;
    font: normal normal medium 18px/23px Nunito;
  }

  @media screen and (min-width: $breakpoint-desktop) {
    background: $color-white;
    margin: 28px 0 38px;

    &::placeholder {
      font: normal normal bold 18px/24px Nunito;
      padding-left: 8px;
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
</style>
