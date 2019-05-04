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
    tags: []
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
    }
  },
  actions: {}
});
