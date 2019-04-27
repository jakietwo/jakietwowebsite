import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCmp: ["myhome"]
  },
  mutations: {
    setCurrentCmp(state, cmp) {
      state.currentCmp = cmp;
    }
  },
  actions: {}
});
