import { getTableList, getChapterList, getDetail } from '@/services/api';

export default {
  namespace: 'table',

  state: {
    tableList: [],
    chapterList: [],
    detail: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getTableList);
      yield put({
        type: 'search',
        payload: response.data,
      });
    },
    *fetchChapter({ payload }, { call, put }) {
      const response = yield call(getChapterList, payload);
      yield put({
        type: 'searchChapterList',
        payload: response.data.chapters,
      });
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(getDetail, payload);
      console.info(response);
      yield put({
        type: 'searchDetail',
        payload: response.data,
      });
    },
  },
  reducers: {
    search(state, action) {
      return {
        ...state,
        tableList: action.payload,
      };
    },
    searchChapterList(state, action) {
      return {
        ...state,
        chapterList: action.payload,
      };
    },
    searchDetail(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};
