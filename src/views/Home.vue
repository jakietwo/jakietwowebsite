<template>
  <div class="home">
    <a-layout>
      <a-layout-header class="header">
        <navheader></navheader>
      </a-layout-header>
      <a-layout class="main">
        <a-layout-sider class="main-side" style="width: 400px;"
          >Sider</a-layout-sider
        >
        <a-layout-content class="main-content">Content</a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import navheader from "@/components/header";
export default {
  name: "home",
  components: {
    navheader
  },
  data() {
    return {};
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
</style>
