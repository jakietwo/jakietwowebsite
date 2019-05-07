<template>
  <div class="myhome">
    <div class="wrapper">
      <ul class="articleList">
        <li
          class="articleItem"
          v-for="(article, index) in articles"
          :key="index"
        >
          <a-divider orientation="left">
            <span @click="routerToArticle(article)" class="article-title">{{
              article.title
            }}</span>
            &nbsp; &nbsp; &nbsp;
            <span class="article-time">{{ article.createtime }}</span>
          </a-divider>
          <div class="article-content" @click="routerToArticle(article)">
            {{ article.content }}
          </div>
          <div class="article-footer">
            <div class="comment">
              <a-icon type="message" />
              {{
                (sortComment[article.id] && sortComment[article.id].length) || 0
              }}
            </div>
            <a-divider type="vertical" />
            <div class="tags">
              <a-icon type="tags" style="margin-right: 5px" />
              <a-tag
                color="pink"
                class="tag"
                v-for="(tag, index) in sortTag[article.id]"
                v-bind:key="index"
                >{{ tag.name }}</a-tag
              >
            </div>
            <a-divider type="vertical" />
            <div class="category">
              <a-icon type="folder" style="margin-right: 5px" />
              <a-tag
                v-for="(category, index) in sortCategory[article.id]"
                v-bind:key="`class${index}`"
                :color="`${tagColor[Math.floor(Math.random() * 10)]}`"
                class="tag"
              >
                {{ category.name }}
              </a-tag>
            </div>
          </div>
        </li>
      </ul>
      <div class="page">
        <a-pagination
          v-model="currentPage"
          :total="totalArticles"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { article } from "../api/article";
import { handleCreateTime } from "../common/handleTime";
import { mapState } from "vuex";
import { tagColor } from "../config/tagColor";

export default {
  name: "myhome",
  components: {},
  data() {
    return {
      articles: [],
      currentPage: 1,
      totalArticles: 20,
      tagColor: tagColor
    };
  },
  computed: {
    ...mapState({
      sortComment: state => state.sortComment,
      sortCategory: state => state.sortCategory,
      sortTag: state => state.sortTag
    })
  },
  watch: {},
  created() {
    this._initData();
  },
  mounted() {},
  methods: {
    changePage(page, pageSize) {
      console.log("page", page);
      console.log("pageSize", pageSize);
    },
    routerToArticle(article) {
      console.log("article", article);
    },
    async _initData() {
      this.articles = await article.getAllArticle();
      this.articles = handleCreateTime(this.articles);
      this.totalArticles = this.articles.length;
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper
  width 100%
  .articleItem
    width 90%
    margin 20px auto 50px
    height 320px
    border 1px solid rgba(0,0,0,.05)
    padding  20px 20px 10px
    transition  all .3s
    .article-title
      font-size 18px
      font-weight bold
      color rgba(7,17,27,.7)
      &:hover
        color rgba(37,183,170,.5)
        cursor pointer
    .article-time
      font-size 14px
      color rgba(7,17,27,.3)
    .article-content
      width 100%
      height 200px
      overflow hidden
    .article-footer
      display flex
      height 30px
      line-height 30px
      flex-direction row
      justify-content flex-start
      align-items center
      .comment
        width 40px
      .tags
        .tag
          position relative
          bottom 2px
      .category
        .tag
          position relative
          bottom 2px
    &:hover
      background rgba(37,183,170,.1)
      box-shadow 0 0 20px rgba(7,17,27,.3)
  .page
    float right
    margin-right 40px
</style>
