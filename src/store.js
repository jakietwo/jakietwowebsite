import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCmp: ["myhome"]
  },
  plugins: [createPersistedState()],
  mutations: {
    setCurrentCmp(state, cmp) {
      state.currentCmp = cmp;
    }
  },
  actions: {}
});
