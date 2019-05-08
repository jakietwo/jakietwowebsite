<template>
  <div class="myIntro">
    <div>
      <img
        src="./../assets/image/logo.jpg"
        alt="头像"
        width="120"
        height="120"
      />
    </div>

    <p class="myname">王佳归</p>
    <div class="website">
      <a-icon type="github" />
      <a href="https://github.com/jakietwo" class="mygithub" target="_blank"
        >github</a
      >
    </div>
    <div class="newArticle">
      <a-divider orientation="left">最新文章</a-divider>
      <ul class="newArticleList">
        <li
          class="article-item"
          v-for="(article, index) in articles"
          :key="index"
        >
          <a-checkable-tag
            @click="routerToArticle(article)"
            style="font-size: 14px;"
            >{{ article.title }}</a-checkable-tag
          >
        </li>
      </ul>
    </div>
    <div class="mytag">
      <a-divider orientation="left">我的标签</a-divider>
      <ul class="tag-list">
        <li class="tag-item" v-for="(tag, index) in tags" :key="index">
          <a-tag :color="tag.color">{{ tag.name }}</a-tag>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import myTags from "@/config/mytags";
export default {
  name: "myIntro",
  components: {},
  data() {
    return {
      tags: []
    };
  },
  computed: {
    articles() {
      return this.$store.state.articles;
    }
  },
  watch: {},
  created() {
    this.tags = myTags;
  },
  mounted() {},
  methods: {
    routerToArticle(article) {
      console.log(article);
    }
  }
};
</script>

<style scoped lang="stylus">
.myIntro
  position fixed
  top 60px
  display flex
  flex-direction column
  align-items center
  padding 20px 10px
  width 400px
  height calc(100vh - 60px)
  overflow-y scroll
  .myname
    margin-top 20px
    font-size 24px
    font-weight bold
  .intro
    margin-top 10px
    font-size 14px
  .website
    margin-top 10px
    height 20px
    line-height 20px
    &:hover
      background rgba(7,17,27,.2)
    .mygithub
      color rgba(7,17,27,.8)
      font-size 14px
      margin-left 5px
  .newArticle
    width 100%
    .newArticleList
      width 100%
      padding 0 10px
      .article-item
        height 30px
        max-width 340px
        line-height 30px
        width 100%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
  .mytag
    width 100%
    .tag-list
      width 100%
      padding 0 10px
      .tag-item
        display inline-block
        margin 5px 5px
</style>
