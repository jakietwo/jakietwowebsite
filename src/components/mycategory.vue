<template>
  <div class="mycategory">
    <div class="category-wrapper">
      <h2 class="title">Categories</h2>
      <h4 class="sub-title">{{ totalCategory }} categories in total</h4>
      <div class="category">
        <a-badge
          class="category-badge"
          :count="item[1].length"
          v-for="(item, index) in Object.entries(sortNameCategory)"
          :key="index"
        >
          <a-tag
            :color="`${tagColor[Math.floor(Math.random() * 10)]}`"
            @click="routerToCategory(item)"
          >
            {{ item[0] }}
          </a-tag>
        </a-badge>
      </div>
    </div>
  </div>
</template>
<script>
import { tagColor } from "../config/tagColor";

export default {
  name: "mycategory",
  components: {},
  data() {
    return {
      tagColor: tagColor,
      totalCategory: 0
    };
  },
  computed: {
    sortNameCategory() {
      return this.$store.state.sortNameCategory;
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.totalCategory = Object.keys(this.sortNameCategory).length;
  },
  methods: {
    routerToCategory(item) {
      console.log(item);
    }
  }
};
</script>

<style scoped lang="stylus">
.mycategory
  width 100%
  height 100%
  text-align center
  .category-wrapper
    display flex
    flex-direction column
    justify-content flex-start
    align-items center
    width 100%
    height 100%
    .title
      margin-top 20px
      font-size 30px
      font-weight 400
      color #333333
    .sub-title
      margin-top 15px
      font-size 14px
      color #c9c9c9
    .category
      margin-top 20px
      .category-badge
        margin 5px 10px
</style>
