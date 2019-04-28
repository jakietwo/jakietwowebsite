<template>
  <div class="header">
    <a-row>
      <a-col :offset="1" :xs="10" :sm="4" class="first-col">
        <img
          src="./../assets/image/logo.jpg"
          width="50"
          height="50"
          alt="logo"
        />
        <span class="title">JAKIETWO</span>
      </a-col>
      <a-col :sm="8" :xs="10" style="text-align: center;" class="second-col">
        <a-input-search
          style="border: 1px solid transparent;"
          class="search-input"
          placeholder="根据文章搜索"
          @search="onSearch"
        />
      </a-col>
      <a-col :sm="10" :xs="4" class="third-col">
        <a-menu v-model="current" mode="horizontal" class="nav-header">
          <a-menu-item key="myhome"><a-icon type="html5" />首页 </a-menu-item>
          <a-menu-item key="mycategory">
            <a-icon type="tags" />分类
          </a-menu-item>
          <a-menu-item key="myabout"> <a-icon type="man" />关于 </a-menu-item>
          <a-menu-item key="my"> <a-icon type="mail" />mail </a-menu-item>
        </a-menu>
        <a-button class="login" type="primary">登录</a-button>
        <a-button class="register">注册</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  name: "myheader",
  components: {},
  data() {
    return {
      current: ["myhome"]
    };
  },
  watch: {
    current(newval) {
      this.$store.commit("setCurrentCmp", newval);
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch() {}
  }
};
</script>

<style scoped lang="stylus">
.header
  width 100vw
  box-shadow 0 0 10px rgba(7,17,27,.2)
  .first-col
    display flex
    justify-content center
    align-items center
    text-align center
    line-height 60px
    height 60px
    .title
      font-size 18px
      margin-left 5px
  .second-col, .third-col
    display flex
    line-height 60px
    height 60px
    justify-content center
    align-items center
    .login
      margin-right 10px
    .search-input
      height 40px
      outline none
      border none
  .third-col
    text-align right
    .nav-header
      height 60px
      .login, .register
        position relative
        margin-left 5px
        margin-bottom 12px
</style>
<style>
.ant-menu-item {
  height: 60px;
  line-height: 60px;
}
</style>
