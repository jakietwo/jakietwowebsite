<template>
  <div class="home">
    <navheader></navheader>
    <div class="cmp-wrapper">
      <my-intro></my-intro>
      <component :is="currentCmp" class="diff-cmp"></component>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navheader from "@/components/header";
import myIntro from "@/components/myIntro";
import myhome from "@/components/myhome";
import mycategory from "@/components/mycategory";
import myabout from "@/components/myabout";
export default {
  name: "home",
  components: {
    navheader,
    myIntro,
    myhome,
    mycategory,
    myabout
  },
  data() {
    return {};
  },
  computed: {
    currentCmp() {
      return this.$store.state.currentCmp[0];
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
    width 100%
    display flex
    flex-direction row
    .diff-cmp
      flex 1
      padding 20px
</style>
