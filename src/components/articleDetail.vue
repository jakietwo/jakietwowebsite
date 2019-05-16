<template>
  <div class="articledetail">
    <h2 class="article-detail-title">{{ articleDetail.title }}</h2>
    <div class="article-tag">
      <div class="createTime">
        <a-icon type="form" />
        <span style="color: rgba(0,0,0,.5); margin-left: 5px;">{{
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
    <div class="article-content" v-html="articleDetail.content"></div>

    <ul class="comment-list">
      <a-comment
        v-for="(comment, index) in comments"
        v-bind:key="`index${index}`"
      >
        <span slot="actions" @click="showCommentArea(index)">Reply to</span>
        <a slot="author">{{ comment.username }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <p slot="content">
          {{ comment.content }}
        </p>
        <a-comment v-if="showComment[index]">
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea
                :rows="4"
                @change="handleChange"
                placeholder="输入评论..."
                :value="value"
              ></a-textarea>
            </a-form-item>
            <a-form-item>
              <a-button
                htmlType="submit"
                :loading="submitting"
                @click="handleSubmit"
                type="primary"
              >
                评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
        <a-comment
          v-for="(reply, index1) in sortReply[comment.id]"
          v-bind:key="`index${index1}`"
        >
          <span slot="actions">Reply to</span>
          <a slot="author">{{ reply.username }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            {{ reply.content }}
          </div>
          <a-comment>
            <span slot="actions">Reply to</span>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div slot="content">
              <a-form-item>
                <a-textarea
                  :rows="4"
                  @change="handleChange"
                  :value="value"
                ></a-textarea>
              </a-form-item>
              <a-form-item>
                <a-button
                  htmlType="submit"
                  :loading="submitting"
                  @click="handleSubmit"
                  type="primary"
                >
                  Add Comment
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-comment>
      </a-comment>

      <!--<a-comment v-for="(item, index) in comments" v-bind:key="`index${index}`">-->
      <!--<template slot="actions">-->
      <!--<span>Reply to</span>-->
      <!--</template>-->
      <!--<a slot="author">{{ item.username }}</a>-->
      <!--<a-avatar-->
      <!--src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
      <!--alt="Han Solo"-->
      <!--slot="avatar"-->
      <!--/>-->
      <!--<p slot="content">-->
      <!--<span style="line-height: 24px;" v-html="item.content"></span>-->
      <!--</p>-->
      <!--<a-tooltip slot="datetime" :title="2019 - 1 - 12">-->
      <!--<span>{{ 123123 }}</span>-->
      <!--</a-tooltip>-->
      <!--</a-comment>-->
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { tagColor } from "../config/tagColor";
import { transferDateToYMD } from "../common/handleTime";

export default {
  name: "articledetail",
  components: {},
  data() {
    return {
      tagColor: tagColor,
      commentContent:
        " We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create\n" +
        "          their product prototypes beautifully and efficiently.",
      comments: [],
      replys: [],
      showComment: {},
      showReplyText: {},
      value: "",
      submitting: false
    };
  },
  computed: {
    articleDetail() {
      return this.$store.state.articleDetail;
    },
    ...mapState({
      sortComment: state => state.sortComment,
      sortCategory: state => state.sortCategory,
      sortReply: state => state.sortReply,
      sortTag: state => state.sortTag,
      allUsers: state => state.allUsers
    })
  },
  watch: {
    sortComment: {
      handler(newval) {
        if (Object.keys(newval).length) {
          this.getAllUserNameInComment();
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    let articleComment = this.sortComment[this.articleDetail.id];
    this.comments = articleComment;
    this.comments.forEach((comment, index) => {
      this.$set(this.showComment, index, false);
    });
    console.log("showComment", this.showComment);
    this.replys = this.handleReplysInComment(this.comments, this.replys);
  },
  methods: {
    handleSubmit() {},
    handleChange() {},
    showCommentArea(index) {
      for (let item in this.showComment) {
        if (index == item) {
          this.$set(this.showComment, item, true);
        } else {
          this.$set(this.showComment, item, false);
        }
      }
    },
    handleReplysInComment(comments, replys) {},
    getAllUserNameInComment() {
      this.sortComment[this.articleDetail.id].forEach(async item => {
        let response = await axios.get("/api/v1/users/" + item.userId);
        console.log("res", response);
        let res = response.data;
        if (res.id) {
          item.username = res.username;
          item.auth = res.auth;
        }
      });
    }
  }
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
  .comment-list
    width 100%
    text-align left
</style>
