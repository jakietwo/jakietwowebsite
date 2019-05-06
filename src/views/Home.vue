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
import { article } from "../api/article";
import { tag } from "../api/tag";
import { comment } from "../api/comment";
import { reply } from "../api/reply";
import { category } from "../api/category";
import {
  sortReplyByCommentId,
  orderByCreateTime,
  sortCommentByArticleId,
  sortCategoryByArticleId
} from "../common/handleData";

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
      this.$store.commit("saveArticles", articles);
      this.$store.commit("saveComments", comments);
      this.$store.commit("saveReplys", replys);
      this.$store.commit("saveTags", tags);
      this.$store.commit("saveCategorys", categorys);
      let sortReply = sortReplyByCommentId(replys);
      sortReply = orderByCreateTime(sortReply);
      let sortComment = sortCommentByArticleId(comments);
      sortComment = orderByCreateTime(sortComment);
      let sortCategory = sortCategoryByArticleId(categorys);
      this.$store.commit("saveSortComment", sortComment);
      this.$store.commit("saveSortReply", sortReply);
      this.$store.commit("saveSortCategory", sortCategory);
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
    .diff-cmp
      position absolute
      left 420px
      top 70px
      width 1000px
      height 1600px
      overflow-y auto
</style>
