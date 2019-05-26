<template>
  <div class="myTime">
    <a-timeline :pending="true">
      <a-timeline-item>2019</a-timeline-item>
      <a-timeline-item v-for="(article, index) in articles" :key="index">
        {{ article.time }}
        <a href="javascript:;" @click="routerToArticle(article)">{{
          article.title
        }}</a>
      </a-timeline-item>
    </a-timeline>
    <a-pagination
      @change="chanegPage"
      :pageSize="15"
      v-model="current"
      :total="totalArticles"
    />
  </div>
</template>
<script>
import { transferDateToYMD } from "../common/handleTime";

export default {
  name: "myTime",
  components: {},
  data() {
    return {
      timeData: [],
      current: 1,
      totalArticles: 50
    };
  },
  computed: {
    articles() {
      return this.handleArticleTime(this.$store.state.articles);
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    routerToArticle(article) {
      console.log(article);
      this.$store.commit("saveArticleDetail", article);
      this.$router.push({
        name: "articledetail"
      });
    },
    /**
     *
     * @param currentPage 当前页码
     * @param pageSize 单个页码条数
     */
    chanegPage(currentPage, pageSize) {
      console.log("curr", currentPage);
      console.log("page", pageSize);
    },
    handleArticleTime(articles) {
      articles.forEach(article => {
        article.time = transferDateToYMD(article.createTime);
      });
      articles = this.orderByTime(articles);
      // this.totalArticles = articles.length;
      return articles;
    },
    orderByTime(data) {
      data.sort((a, b) => {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      });
      return data;
    }
  }
};
</script>

<style scoped lang="stylus">
.myTime
  width 100%
  padding-top 20px
  padding-left 20px
</style>
<style>
.ant-timeline-item-content {
  top: -5px;
}
</style>
