<template>
  <div class="home">
    <navheader></navheader>
    <my-intro></my-intro>
    <div class="cmp-wrapper"></div>
    <component :is="currentCmp"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import navheader from "@/components/header";
import myIntro from "@/components/myIntro";
export default {
  name: "home",
  components: {
    navheader,
    myIntro
  },
  data() {
    return {};
  },
  computed: {
    currentCmp() {
      return this.$store.state.currentCmp;
    }
  },
  create() {},
  mounted() {}
};
</script>
<style scoped lang="stylus">
.home
  width 100vw
  height 100vh
  background white
  .header
    height 60px
    width 100%
    background white
  .main
    height calc(100vh - 110px)
    background white
    .main-side
      font-size 14px
      width 500px
  .footer
    height 50px
  .cmp-wrapper
    margin-left 300px
</style>
