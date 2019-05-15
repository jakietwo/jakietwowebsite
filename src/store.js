import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCmp: ["myhome"],
    articles: [],
    comments: [],
    replys: [],
    tags: [],
    categorys: [],
    sortComment: [],
    sortReply: [],
    sortCategory: [],
    sortTag: [],
    sortNameCategory: [],
    articleDetail: {},
    allUsers: []
  },
  plugins: [createPersistedState()],
  mutations: {
    setCurrentCmp(state, cmp) {
      state.currentCmp = cmp;
    },
    saveArticles(state, data) {
      state.articles = data;
    },
    saveComments(state, data) {
      state.comments = data;
    },
    saveReplys(state, data) {
      state.replys = data;
    },
    saveTags(state, data) {
      state.tags = data;
    },
    saveCategorys(state, data) {
      state.categorys = data;
    },
    saveSortComment(state, data) {
      state.sortComment = data;
    },
    saveSortReply(state, data) {
      state.sortReply = data;
    },
    saveSortCategory(state, data) {
      state.sortCategory = data;
    },
    saveSortTag(state, data) {
      state.sortTag = data;
    },
    saveSortNameCategory(state, data) {
      state.sortNameCategory = data;
    },
    saveArticleDetail(state, data) {
      state.articleDetail = data;
    },
    saveAllUsers(state, data) {
      state.allUsers = data;
    }
  },
  actions: {}
});
