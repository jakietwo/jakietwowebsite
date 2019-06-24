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
          <div
            class="article-content"
            @click="routerToArticle(article)"
            v-html="article.articleContent"
          ></div>
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
import marked from "marked";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
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
    this.setMarkerDown();
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
      this.$store.commit("saveArticleDetail", article);
      this.$router.push({
        name: "articledetail"
      });
    },
    handleMarkedContent(articles) {
      articles.forEach(article => {
        article.articleContent = marked(JSON.parse(article.content));
      });
      return articles;
    },
    setMarkerDown() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
    },
    async _initData() {
      this.articles = await article.getAllArticle();
      this.articles = handleCreateTime(this.articles);
      this.articles = this.handleMarkedContent(this.articles);
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
    cursor pointer
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
      & h1
        font-size 20px;
        height 30px;
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
    margin-right 50px
    margin-bottom 30px

  pre{
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    overflow: auto;
    word-break: break-all;
    word-wrap: break-word;
  }
  .article-content >>> h1 {
    height 45px;
    margin 20px 0;
    font-weight 700;
    font-size 30px;
    line-height 45px;
    word-break break-word;
  }
  .article-content >>> h2 {
    border-bottom 1px solid rgb(236,236,236)
    color rgb(51,51,51);
    font-size 24px;
    line-height 36px
    height 36px
    margin-top 35px;
    padding-bottom 12px
    word-break break-word
  }
  .article-content >>> h3 {
    color rgb(51,51,51);
    font-size 18px;
    line-height 27px
    font-weight 700
    margin-top 35px;
    padding-bottom 0
    word-break break-word
  }
  .article-content >>> h4 {
    color rgb(51,51,51);
    font-size 16px;
    line-height 24px
    font-weight 700
    margin-top 0;
    margin-bottom 10px;
    padding-bottom 5px
    word-break break-word
  }
  .article-content >>> p{
    color rgb(51,51,51)
    font-size 15px
    font-weight 400
    line-height 26px
    margin-top 22px
    word-break break-word;
  }
  .article-content >>> pre{
    color rgb(51,51,51)
    font-size 15px
    font-weight 400
    margin 15px 0
    overflow auto
    position relative
    white-space pre
    line-height 26px
    word-break break-word
    background-color rgb(248,248,248)
  }
</style>
