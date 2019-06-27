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
        <div
          class="article-content"
          id="article-content"
          v-html="articleDetail.content"
        >
          <!--<mavon-editor-->
          <!--:value="articleDetail.content"-->
          <!--:subfield="prop.subfield"-->
          <!--:defaultOpen="prop.defaultOpen"-->
          <!--:toolbarsFlag="prop.toolbarsFlag"-->
          <!--:editable="prop.editable"-->
          <!--codeStyle="atelier-cave-light"-->
          <!--:boxShadow="false"-->
          <!--:scrollStyle="prop.scrollStyle"-->
          <!--&gt;-->
          <!--</mavon-editor>-->
          <!--<pre v-html="content" class="article-pre"></pre>-->
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
      <a-col :span="8" style="display: flex; justify-content: center;">
        <a-anchor
          :affix="true"
          style="width: 150px; margin-top: 3%; position: fixed;"
        >
          <a-anchor-link
            v-for="(item, index5) in anchor"
            :key="index5"
            :href="`#${item.link}`"
            :title="item.name"
          >
            <a-anchor-link
              v-for="(item1, index6) in item[1]"
              :key="index6"
              :href="`#${item1.link}`"
              :title="item1.name"
            >
              <a-anchor-link
                v-for="(item2, index7) in item[2]"
                :key="index7"
                v-if="item2.pid === item1.name"
                :href="`#${item2.link}`"
                :title="item2.name"
              >
              </a-anchor-link>
            </a-anchor-link>
          </a-anchor-link>
        </a-anchor>
      </a-col>
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
import marked from "marked";
import AAnchorLink from "ant-design-vue/es/anchor/AnchorLink";
dayjs.extend(relativeTime);
export default {
  name: "articledetail",
  components: { AAnchorLink },
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
      content:
        '"# 一级标题\\nmkj jwq oiqpwke q w\\n# 一级标题\\nmqlwkejk qkwe plqw\' e\\n```javascript\\nlet a = 1;\\nlet b = 2;\\n```\\n"',
      prop: {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      },
      anchor: [],
      anchorHelp: [], //辅助描点的数组
      indexNum: 0 // 标志位 记录描点所在索引
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
  created() {
    // marked.setOptions({
    //   renderer: new marked.Renderer(),
    //   highlight: code => {
    //     return this.hljs.highlightAuto(code).value;
    //   },
    //   pedantic: false,
    //   gfm: true,
    //   tables: true,
    //   breaks: false,
    //   sanitize: false,
    //   smartLists: true,
    //   smartypants: false,
    //   xhtml: false
    // });
    this.content = marked(JSON.parse(this.content));
  },
  mounted() {
    this._initData();
    this.$nextTick().then(() => {
      let parent = document.getElementById("article-content");
      this._getNodeDataId(parent, this.anchor);
      console.log("this.anchor", this.anchor);
    });
    // this.articleDetail.content = marked(this.articleDetail.content);
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
    },
    _getNodeDataId(parent, anchor) {
      let childrens = parent.children;
      let length = childrens.length;
      for (let i = 0; i < length; i++) {
        let node = childrens[i];
        console.log("node", node);
        let domName = node.tagName;
        if (
          domName === "H1" ||
          domName === "H2" ||
          domName === "H3" ||
          domName === "H4" ||
          domName === "H5"
        ) {
          let name = parseInt(domName.slice(1));
          if (!this.anchorHelp.length) {
            this.anchorHelp.push(name);
            let obj = {
              name: "",
              link: ""
            };
            if (node.hasAttribute("id")) {
              obj.name = node.innerText;
              obj.link = node.innerText;
            } else {
              let firstChild = node.firstChild;
              obj.name = node.innerText;
              obj.link = firstChild.getAttribute("id");
            }
            anchor.push(obj);
          } else {
            let length1 = this.anchorHelp.length;
            if (name > this.anchorHelp[length1 - 1]) {
              this.anchorHelp.push(name);
              let obj = {
                name: "",
                link: "",
                pid: ""
              };
              if (length1 === 1) {
                obj.pid = anchor[this.indexNum].name;
              } else {
                let pData = anchor[this.indexNum][length1 - 1];
                let pid = pData[pData.length - 1].name;
                obj.pid = pid;
              }
              if (node.hasAttribute("id")) {
                obj.name = node.innerText;
                obj.link = node.innerText;
              } else {
                let firstChild = node.firstChild;
                obj.name = node.innerText;
                obj.link = firstChild.getAttribute("id");
              }
              let arr = anchor[this.indexNum][length1];
              if (arr && arr.length) {
                anchor[this.indexNum][length1].push(obj);
              } else {
                anchor[this.indexNum][length1] = [];
                anchor[this.indexNum][length1].push(obj);
              }
            } else if (
              name <= this.anchorHelp[0] &&
              this.anchorHelp.length !== 1
            ) {
              this.indexNum++;
              let obj = {
                name: "",
                link: ""
              };
              if (node.hasAttribute("id")) {
                obj.name = node.innerText;
                obj.link = node.innerText;
              } else {
                let firstChild = node.firstChild;
                obj.name = node.innerText;
                obj.link = firstChild.getAttribute("id");
              }
              anchor[this.indexNum] = obj;
              this.anchorHelp = [name];
            } else if (
              name > this.anchorHelp[0] &&
              name < this.anchorHelp[length1 - 1]
            ) {
              let x = this.anchorHelp.indexOf(name);
              if (x > -1) {
                this.anchorHelp.splice(++x);
              } else {
                this.anchorHelp.push(name);
                this.anchorHelp.sort((a, b) => {
                  return a < b;
                });
                let y = this.anchorHelp.indexOf(name);
                this.anchorHelp.splice(++y);
              }
              let obj = {
                name: "",
                link: ""
              };
              if (node.hasAttribute("id")) {
                obj.name = node.innerText;
                obj.link = node.innerText;
              } else {
                let firstChild = node.firstChild;
                obj.name = node.innerText;
                obj.link = firstChild.getAttribute("id");
              }
              let index = this.anchorHelp.length - 1;
              if (
                anchor[this.indexNum][index] &&
                anchor[this.indexNum][index].length
              ) {
                anchor[this.indexNum][index].push(obj);
              } else {
                anchor[this.indexNum][index] = [];
                anchor[this.indexNum][index].push(obj);
              }
            }
          }

          // if (node.children) {
          //   this._getNodeDataId(node, obj.children);
          // }
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.articledetail
  text-align center
  .article-detail-title
    height 45px;
    margin 20px 0;
    font-weight 700;
    font-size 30px;
    line-height 45px;
    word-break break-word;
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
  .article-content >>> li{
    line-height 30px
    margin 10px 0
  }
  .article-content >>> blockquote{
    background-color rgb(248,248,248)
    & p{
      padding 5px;
    }
  }
</style>
