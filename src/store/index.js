import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    json: {},
    xlsxSheets: [],
    duplicationError: false,
    invalidKeyError: false,
    isConverted: false
  },
  getters: {
    getJson (state) {
      return state.json;
    },
    getDuplicationErrorStatus (state) {
      return state.duplicationError;
    },
    getInvalidKeyErrorStatus (state) {
      return state.invalidKeyError;
    },
    getXlsxSheets (state) {
      return state.xlsxSheets;
    },
    getConversionFlag (state) {
      return state.isConverted;
    }
  },
  mutations: {
    SET_JSON (state, json) {
      state.json = json;
    },
    SET_DUPLICATION_ERROR_STATUS (state, status) {
      state.duplicationError = status;
    },
    SET_INVALID_KEY_ERROR_STATUS (state, status) {
      state.invalidKeyError = status;
    },
    SET_XLSX_SHEETS (state, sheets) {
      state.xlsxSheets = sheets;
    },
    SET_CONVERSION_FLAG (state, flag) {
      state.isConverted = flag;
    }
  },
  actions: {
    setJson (context, json) {
      context.commit('SET_JSON', json);
    },
    setDuplicationErrorStatus (context, status) {
      context.commit('SET_DUPLICATION_ERROR_STATUS', status);
    },
    setInvalidKeyErrorStatus (context, status) {
      context.commit('SET_INVALID_KEY_ERROR_STATUS', status);
    },
    setXlsxSheets (context, sheets) {
      context.commit('SET_XLSX_SHEETS', sheets);
    },
    setConversionFlag (context, flag) {
      context.commit('SET_CONVERSION_FLAG', flag);
    }
  },
  modules: {
  }
})
