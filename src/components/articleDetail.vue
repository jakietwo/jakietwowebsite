<template>
  <div class="articledetail">
    <h2 class="article-detail-title">{{ articleDetail.title }}</h2>
    <div class="article-tag">
      <div class="createTime">
        <a-icon type="form" />
        <span style="color: rgba(0,0,0,.5);">{{
          articleDetail.createtime
        }}</span>
      </div>
      <a-divider type="vertical" />
      <div class="tags">
        <a-icon type="tags" style="margin-right: 5px" />
        <a-tag
          color="pink"
          class="tag"
          v-for="(tag, index) in sortTag[articleDetail.id]"
          v-bind:key="index"
          >{{ tag.name }}</a-tag
        >
      </div>
      <a-divider type="vertical" />
      <div class="category">
        <a-icon type="folder" style="margin-right: 5px" />
        <a-tag
          v-for="(category, index) in sortCategory[articleDetail.id]"
          v-bind:key="`class${index}`"
          :color="`${tagColor[Math.floor(Math.random() * 10)]}`"
          class="tag"
        >
          {{ category.name }}
        </a-tag>
      </div>
      <a-divider type="vertical" />
      <div class="comment">
        <a-icon type="message" />
        {{
          (sortComment[articleDetail.id] &&
            sortComment[articleDetail.id].length) ||
            0
        }}
      </div>
    </div>
    <div class="article-content">
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { tagColor } from "../config/tagColor";
import { transferDateToYMD } from "../common/handleTime";

export default {
  name: "articledetail",
  components: {},
  data() {
    return {
      tagColor: tagColor
    };
  },
  computed: {
    articleDetail() {
      return this.$store.state.articleDetail;
    },
    ...mapState({
      sortComment: state => state.sortComment,
      sortCategory: state => state.sortCategory,
      sortTag: state => state.sortTag
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="stylus">
.articledetail
  text-align center
  .article-detail-title
    margin-top 20px
    font-size 20px
    font-weight 400
    letter-spacing 1px
    color #333
  .article-tag
    display flex
    margin-top 20px
    height 30px
    line-height 30px
    flex-direction row
    justify-content center
    align-items center
    .comment
      width 40px
      color rgba(0,0,0,.5)
    .tags
      .tag
        position relative
        bottom 2px
    .category
      .tag
        position relative
        bottom 2px
  .article-content
    margin-top 20px
    width 100%
</style>
