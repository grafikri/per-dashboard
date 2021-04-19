// @ts-check
import chartApi from '../structure/chartApi';
import { AnalyticDataType } from '../structure/enums';

/**
 * @typedef {{timestamp: number, value: number}} Data
 */

/**
 * @typedef {{type: import('../structure/enums').AnalyticDataType, data: Data[]}} Analytic
 */

/**
 * @typedef {{list: Analytic[]}} State
 */

/**
 * @type {State}
 */
const state = {
  list: [

  ],
};

const getters = {
  /**
   *
   * @param {State} mState
   * @returns {Data[]}
   */
  ttfb: (mState) => mState.list.find((item) => item.type === AnalyticDataType.TTFB)?.data ?? [],
  fcp: (mState) => mState.list.find((item) => item.type === AnalyticDataType.FCP)?.data ?? [],
  domLoading:
    (mState) => mState.list.find((item) => item.type === AnalyticDataType.DOM_LOADING)?.data ?? [],
  pageLoading:
    (mState) => mState.list.find((item) => item.type === AnalyticDataType.PAGE_LOADING)?.data ?? [],

};

const mutations = {
  /**
   *
   * @param {State} state
   * @param {Analytic[]} payload
  */
  // eslint-disable-next-line no-shadow
  setList(state, payload) {
    state.list = payload;
  },
};

const actions = {
  async fetchData({ commit }) {
    const startDate = (Date.now() - (1000 * 60 * 30)); // to 30 minutes earlier

    // @ts-ignore
    const response = Object.values(await chartApi.$get(`/analytics?startDate=${startDate}`));

    /**
     * @type {Analytic[]}
     */
    const payload = [
      {
        type: AnalyticDataType.TTFB,
        data: response.map((item) => ({
          timestamp: item.date,
          value: item.ttfb,
        })),
      },
      {
        type: AnalyticDataType.FCP,
        data: response.map((item) => ({
          timestamp: item.date,
          value: item.fcp,
        })),
      },
      {
        type: AnalyticDataType.DOM_LOADING,
        data: response.map((item) => ({
          timestamp: item.date,
          value: item.domLoading,
        })),
      },
      {
        type: AnalyticDataType.PAGE_LOADING,
        data: response.map((item) => ({
          timestamp: item.date,
          value: item.domLoading,
        })),
      },
    ];

    commit('setList', payload);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
