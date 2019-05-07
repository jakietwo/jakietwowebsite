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
import { article } from "../api/article";
import { tag } from "../api/tag";
import { comment } from "../api/comment";
import { reply } from "../api/reply";
import { category } from "../api/category";
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
      let obj = sortCategoryByArticleId(categorys);
      let sortCategory = obj.result;
      let sortNameCategory = obj.nameResult;
      let sortTag = sortTagByArticleId(tags);
      this.$store.commit("saveSortNameCategory", sortNameCategory);
      this.$store.commit("saveSortTag", sortTag);
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
    .router-view
      position absolute
      left 420px
      top 70px
      width 1000px
      min-height 600px
      max-height 1600px
      overflow-y auto
</style>
