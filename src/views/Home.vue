<template>
  <div class="home">
    <navheader></navheader>
    <div class="cmp-wrapper">
      <my-intro></my-intro>
      <router-view class="router-view" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navheader from "@/components/header";
import myIntro from "@/components/myIntro";
import axios from "axios";
import { article } from "../api/article";
import { tag } from "../api/tag";
import { comment } from "../api/comment";
import { reply } from "../api/reply";
import { category } from "../api/category";
import { listAllUsers } from "../api/user";
import {
  sortReplyByCommentId,
  orderByCreateTime,
  sortCommentByArticleId,
  sortCategoryByArticleId,
  sortTagByArticleId
} from "../common/handleData";

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
      return this.$store.state.currentCmp[0];
    },
    token() {
      return this.$store.state.token;
    }
  },
  watch: {
    token: {
      handler(newval) {
        if (newval) {
          axios.defaults.headers.common["Authorization"] = "beaker " + newval;
        }
      },
      immediate: true
    }
  },
  created() {
    // 获取到所有数据
    this._initAllData();
  },
  mounted() {},
  methods: {
    async _initAllData() {
      let articles = await article.getAllArticle();
      let comments = await comment.getAllComment();
      let replys = await reply.getAllReply();
      let tags = await tag.getAllTags();
      let categorys = await category.listCategory();
      let users = await listAllUsers();
      this.$store.commit("saveAllUsers", users);
      this.$store.commit("saveArticles", articles);
      this.$store.commit("saveComments", comments);
      this.$store.commit("saveReplys", replys);
      this.$store.commit("saveTags", tags);
      this.$store.commit("saveCategorys", categorys);
      // 对replys 增加用户名
      replys = this.addUserNameInReplys(replys, users);
      let sortReply = sortReplyByCommentId(replys);
      sortReply = orderByCreateTime(sortReply);
      let sortComment = sortCommentByArticleId(comments);
      sortComment = orderByCreateTime(sortComment);
      let obj = sortCategoryByArticleId(categorys);
      let sortCategory = obj.result;
      let sortNameCategory = obj.nameResult;
      let sortTag = sortTagByArticleId(tags);
      this.$store.commit("saveSortNameCategory", sortNameCategory);
      this.$store.commit("saveSortTag", sortTag);
      this.$store.commit("saveSortComment", sortComment);
      this.$store.commit("saveSortReply", sortReply);
      this.$store.commit("saveSortCategory", sortCategory);
    },
    addUserNameInReplys(replys, users) {
      for (let i = 0, j = replys.length; i < j; i++) {
        reply: for (let n = 0, m = users.length; n < m; n++) {
          if (replys[i].userId === users[n].id) {
            replys[i].username = users[n].username;
            break reply;
          }
        }
      }
      return replys;
    }
  }
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
    width 100vw
    display flex
    flex-direction row
    .router-view
      position absolute
      left 420px
      top 60px
      width calc(100vw - 420px)
      height calc(100vh - 60px)
      overflow-y auto
</style>
