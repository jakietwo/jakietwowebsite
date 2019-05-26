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
        <a-input
          style="border: 0px solid transparent; outline: none;"
          class="search-input"
          placeholder="根据文章搜索"
          @search="onSearch"
        />
      </a-col>
      <a-col :sm="10" :xs="4" class="third-col">
        <a-menu v-model="current" mode="horizontal" class="nav-header">
          <a-menu-item key="myhome" @click="routerTo">
            <a-icon type="html5" />
            首页
          </a-menu-item>
          <a-menu-item key="mycategory" @click="routerTo">
            <a-icon type="tags" />
            分类
          </a-menu-item>
          <a-menu-item key="myTime" @click="routerTo">
            <a-icon type="branches" />
            时间
          </a-menu-item>
          <a-menu-item key="myabout" @click="routerTo">
            <a-icon type="man" />
            关于
          </a-menu-item>
        </a-menu>
        <a-button
          class="login"
          type="primary"
          v-if="!token"
          @click="showLoginModal"
          >登录</a-button
        >
        <a-button class="register" v-if="!token" @click="signVisible = true"
          >注册</a-button
        >
        <span v-if="token" style="margin-left: 10px;">{{ username }}</span>
        <a-button
          class="register"
          v-if="token"
          style="margin-left: 10px;"
          @click="logout"
          >退出</a-button
        >
      </a-col>
    </a-row>
    <!-- 登录框-->
    <a-modal title="登录" v-model="visible">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="username"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="password"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' }
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer" style="padding-right: 50px;text-align: center;">
        <a-button
          key="back"
          @click="visible = false"
          style="width: 120px;height: 40px"
          >取消</a-button
        >
        <a-button
          key="submit"
          type="primary"
          @click="login"
          style="margin-right: 30%; width: 120px ;height: 40px;"
        >
          登录
        </a-button>
      </template>
    </a-modal>
    <!-- 注册框-->
    <a-modal title="注册" v-model="signVisible">
      <a-form :form="signForm">
        <a-form-item
          label="username"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="password"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' }
                ]
              }
            ]"
          />
        </a-form-item>
      </a-form>
      <template slot="footer" style="padding-right: 50px;text-align: center;">
        <a-button
          key="back"
          @click="signVisible = false"
          style="width: 120px;height: 40px"
          >取消</a-button
        >
        <a-button
          key="submit"
          type="primary"
          @click="sign"
          style="margin-right: 30%; width: 120px ;height: 40px;"
        >
          注册
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import md5 from "js-md5";
import { mapState } from "vuex";
import { login, register } from "../api/user";

export default {
  name: "myheader",
  components: {},
  data() {
    return {
      current: ["myhome"],
      visible: false,
      signVisible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      signForm: this.$form.createForm(this)
    };
  },
  computed: {
    ...mapState({
      token: state => state.token,
      username: state => state.username
    })
  },
  watch: {
    current(newval) {
      // if (newval[0] === "myhome") {
      //   this.$router.push({ name: "articleList" });
      // } else if (newval[0] === "mycategory") {
      //   this.$router.push({ name: "category" });
      // } else if (newval[0] === "myTime") {
      //   this.$router.push({ name: "timeline" });
      // } else if (newval[0] === "myabout") {
      //   this.$router.push({ name: "about" });
      // }
    }
  },
  created() {},
  mounted() {
    // this.current = this.$store.state.currentCmp;
  },
  methods: {
    // 显示登录
    showLoginModal() {
      this.visible = true;
    },
    login() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          values.password = md5(values.password);
          // 登录
          let response = await login(values);
          if (response.success) {
            this.$notification.success({
              message: "登录成功"
            });
            this.visible = false;
            this.$store.commit("saveToken", response.token);
            this.$store.commit("saveUsername", values.username);
          } else {
            this.$notification.error({
              message: "登录失败",
              description: response.message
            });
          }
        }
      });
    },
    // 注册
    sign() {
      let that = this;
      this.signForm.validateFields(async (err, values) => {
        if (!err) {
          values.password = md5(values.password);
          console.log("values", values);
          // 注册
          let response = await register(values);
          if (response.success) {
            this.$notification.success({
              message: "注册成功"
            });
            that.signVisible = false;
          } else {
            this.$notification.error({
              message: "注册失败",
              description: response.message
            });
          }
        }
      });
    },
    /**
     *  退出
     */
    logout() {
      let that = this;
      this.$confirm({
        title: `确定退出当前账户${this.username}吗?`,
        content: "退出当前账号你将无法评论",
        onOk() {
          that.$store.commit("saveToken", "");
          that.$store.commit("saveUsername", "");
        },
        onCancel() {}
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      });
    },
    handleSelectChange(value) {
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    },
    onSearch() {},
    routerTo(obj) {
      let { key } = obj;
      if (key === "myhome") {
        this.$router.push({ name: "articleList" });
      } else if (key === "mycategory") {
        this.$router.push({ name: "category" });
      } else if (key === "myTime") {
        this.$router.push({ name: "timeline" });
      } else if (key === "myabout") {
        this.$router.push({ name: "about" });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.header
  position fixed
  z-index 10
  width 90%
  max-width 1900px
  box-shadow 0 0 10px rgba(7, 17, 27, .2)
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
      width 450px
      outline none
      border none
      &:focus
        border none
        outline none
    .search-input:focus
      border none
      outline none
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
