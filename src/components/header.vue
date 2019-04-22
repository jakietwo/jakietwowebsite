<template>
  <div class="header">
    <img src="./../assets/image/logo.jpg" width="50" height="50" alt="logo" />
    <h1 class="title">JAKIETWO的博客</h1>
    <a-input-search
      class="search-input"
      placeholder="根据文章搜索"
      @search="onSearch"
    />
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="首页"> <a-icon type="mail" />首页 </a-menu-item>
      <a-menu-item key="分类"> <a-icon type="mail" />分类 </a-menu-item>
      <a-menu-item key="关于"> <a-icon type="mail" />关于 </a-menu-item>
      <a-menu-item key="mail"> <a-icon type="mail" />mail </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  name: "header",
  components: {},
  data() {
    return {
      current: ""
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {}
  }
};
</script>

<style scoped lang="stylus">
.header
  display flex
  justify-content flex-start
  align-items center
  width 100vw
  height 60px
  line-height 60px
  .title
    margin-left 10px
    height 60px
    font-size 20px
    line-height 60px
  .search-input
    width 40%
    outline none
    margin-left 20px
    border-radius 20px
    max-width 600px
</style>
