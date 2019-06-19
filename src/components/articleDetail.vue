<template>
  <div class="articledetail">
    <a-row>
      <a-col :span="16">
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
        <div class="article-content">
          <pre v-html="articleDetail.content" class="article-pre"></pre>
        </div>
        <h4 style="float: left; margin: 20px 0; ">
          <span style="color: rgb(24,144,255); font-size: 18px;">
            {{ allCommentCount }}
          </span>
          条评论
        </h4>
        <a-divider />
        <!-- 没有评论的时候 显示评论框-->
        <a-comment>
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
                @change="handleCommentChange"
                placeholder="输入评论..."
                :value="commentValue"
              ></a-textarea>
            </a-form-item>
            <a-form-item style="text-align: left;">
              <a-button
                htmlType="submit"
                :loading="submitting"
                @click="handleCommentSubmit"
                type="primary"
              >
                评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>

        <ul class="comment-list">
          <a-comment
            v-for="(comment, index) in comments"
            v-bind:key="`index${index}`"
          >
            <span slot="actions" @click="showCommentArea(comment.id)"
              >Reply to
            </span>
            <a slot="author">{{ comment.username }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <a-tooltip slot="datetime" :title="comment.create_format_time">
              <span>{{ comment.fromNow }}</span>
            </a-tooltip>
            <p slot="content">
              {{ comment.content }}
            </p>
            <a-comment v-show="showComment[comment.id]">
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
                    @click="handleSubmit(comment.id)"
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
              <span slot="actions" @click="showCommentArea(reply.id)">
                Reply to
              </span>
              <a slot="author">{{ reply.username }}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <a-tooltip slot="datetime" :title="reply.create_format_time">
                <span>{{ reply.fromNow }}</span>
              </a-tooltip>
              <div slot="content">
                {{ reply.content }}
              </div>
              <a-comment v-show="showComment[reply.id]">
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
                      @click="handleSubmit(comment.id)"
                      type="primary"
                    >
                      评论
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
      </a-col>
      <a-col :span="8">col-12</a-col>
    </a-row>
  </div>
</template>
<script>
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
const xss = require("xss");
import { mapState } from "vuex";
import { tagColor } from "../config/tagColor";
import { comment } from "../api/comment";
import { reply } from "../api/reply";

dayjs.extend(relativeTime);
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
      commentValue: "",
      submitting: false,
      allComment: {},
      allCommentCount: 0,
      content: "#### how to use mavonEditor in nuxt.js"
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
      allUsers: state => state.allUsers,
      token: state => state.token,
      username: state => state.username,
      userId: state => state.userId
    })
  },
  watch: {
    sortComment: {
      handler(newval) {
        if (Object.keys(newval).length) {
          this.getAllUserNameInComment();
          this._initData();
        }
      },
      immediate: true,
      deep: true
    },
    articleDetail: {
      handler(newval) {
        if (!newval) return;
        newval.content = JSON.parse(newval.content);
      },
      immediate: true
    },
    sortReply: {
      handler() {
        this._initData();
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {
    this._initData();

    // this.replys.forEach(reply => {
    //   this.$set(this.showComment, reply.id, false);
    // });
  },
  methods: {
    /**
     *  提交comment
     * @returns {Promise<void>}
     */
    async handleCommentSubmit() {
      if (!this.token || !this.username) {
        this.$message.warning("您还未登录，请先登录!");
        return;
      }
      // 如果没有填写内容
      if (!this.commentValue) {
        this.$message.warning("请输入回复内容!");
        return;
      }
      let obj = {
        articleId: this.articleDetail.id,
        content: this.commentValue,
        userId: this.userId
      };
      let response = await comment.createComment(obj);
      if (response) {
        // 发送成功
        this.$notification.success({
          message: "发布评论成功!"
        });
        this.commentValue = "";
        this.$parent._initAllData();
      } else {
        this.$notification.error({
          message: "发布评论失败!"
        });
      }
    },
    /**
     * 提交reply
     * @param id
     * @returns {Promise<void>}
     */
    async handleSubmit(id = "") {
      if (!this.token || !this.username) {
        this.$message.warning("您还未登录，请先登录!");
        return;
      }
      // 如果没有填写内容
      if (!this.value) {
        this.$message.warning("请输入回复内容!");
        return;
      }
      let obj = {
        articleId: this.articleDetail.id,
        content: this.value,
        commentId: id,
        userId: this.userId
      };
      let response = await reply.createReply(obj);
      console.log("response", response);
      if (response) {
        this.$notification.success({
          message: "回复成功!"
        });
        this.value = "";
        this.$parent._initAllData();
      } else {
        this.$notification.error({
          message: "回复成功!"
        });
      }
    },
    handleChange(e) {
      this.value = xss(e.target.value);
    },
    handleCommentChange(e) {
      this.commentValue = xss(e.target.value);
    },
    showCommentArea(id) {
      for (let key in this.showComment) {
        if (key === id) {
          if (this.showComment[key]) {
            this.$set(this.showComment, key, false);
          } else {
            this.value = "";
            this.$set(this.showComment, key, true);
          }
        } else {
          this.$set(this.showComment, key, false);
        }
      }
    },
    getAllUserNameInComment() {
      if (!this.sortComment[this.articleDetail.id]) {
        return;
      }
      this.sortComment[this.articleDetail.id].forEach(async item => {
        let response = await axios.get("/api/v1/users/" + item.userId);
        let res = response.data;
        if (res.id) {
          item.username = res.username;
          item.auth = res.auth;
        }
      });
    },
    _initData() {
      let articleComment = this.sortComment[this.articleDetail.id];
      if (articleComment) {
        this.comments = articleComment;
      }
      if (this.comments && this.comments.length) {
        this.comments.forEach(comment => {
          comment.fromNow = dayjs().from(dayjs(comment.createTime));
          comment.create_format_time = dayjs(comment.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.$set(this.showComment, comment.id, false);
          if (this.sortReply[comment.id]) {
            this.sortReply[comment.id].forEach(reply => {
              reply.fromNow = dayjs().from(dayjs(reply.createTime));
              reply.create_format_time = dayjs(reply.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              this.$set(this.showComment, reply.id, false);
            });
          }
        });
      }
      this.allCommentCount = Object.keys(this.showComment).length;
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
    text-align left
    margin-top 20px
    width 100%
    .article-pre
      color #555
      line-height 2
      h1
        padding-top 10px
        border-bottom 1px solid #eee
        margin 20px 0 10px
        font-weight 700
        line-height 1.5
        font-family  Lato,PingFang SC,Microsoft YaHei,sans-serif

  .comment-list
    width 100%
    text-align left
</style>
