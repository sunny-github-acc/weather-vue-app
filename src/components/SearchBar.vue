<template>
  <input class="Input" v-model="location" type="text" placeholder="Vilnius" />
  <button class="SearchButton" @click="log()" />
</template>

<script>
export default {
  name: "SearchBar",
  data: () => ({
    location: "",
  }),
  methods: {
    log() {
      console.log(this.location);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/Styles.scss";

$search-icon-width: 21.45px;

.Input {
  background: $color-white 0% 0% no-repeat padding-box;
  border-radius: 13px;
  border: none;
  color: $color-white;
  font-size: 20px;
  height: 38px;
  line-height: 23px;
  margin: 28px 0;
  padding: 18px 13px;
  width: 100%;

  &::placeholder {
    color: $color-search-placeholder;
    font-size: 20px;
    line-height: 23px;
  }

  @media screen and (min-width: $breakpoint-hero) {
    background: $color-white;

    .Title {
      color: $color-primary;
      padding: $desktop-padding-top $desktop-padding-left;
    }
  }
}

.SearchButton {
  background: $color-white;
  border-radius: 100px;
  border: 3px solid $color-primary;
  cursor: pointer;
  height: $search-icon-width;
  margin-left: calc(0px - 13px - $search-icon-width);
  width: $search-icon-width;
}
</style>
