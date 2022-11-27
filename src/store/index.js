import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    json: {}
  },
  getters: {
    getJson (state) {
      return state.json;
    }
  },
  mutations: {
    SET_JSON (state, json) {
      state.json = json;
    }
  },
  actions: {
    setJson (context, json) {
      context.commit('SET_JSON', json);
    }
  },
  modules: {
  }
})
