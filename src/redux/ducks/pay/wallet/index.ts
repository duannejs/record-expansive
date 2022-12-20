/* eslint-disable no-case-declarations */
import { Types, IWalletsTypes } from './types';

const INITIAL_STATE: IWalletsTypes = {
  data: {
    totalPages: 0,
    pageSize: 0,
    sortType: '',
    currentPage: 0,
    totalRegistered: 0,
    pageFrom: 'REPOSITORY',
    data: [],
  },
  options: {
    data: [],
    loading: false,
    error: false,
  },
  loading: false,
  error: false,
};

const reducer = (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case Types.GET_WALLET:
      return { ...state, loading: true, error: false };
    case Types.GET_WALLET_FAILURE:
      return { ...state, loading: false, error: action?.payload?.err || 401 };
    case Types.GET_WALLET_SUCCESS:
      return {
        ...state,
        data: action.payload.orders,
        loading: false,
        error: false,
      };
    case Types.GET_WALLET_OPTIONS:
      return { ...state, options: { ...state.options, loading: true, error: false } };
    case Types.GET_WALLET_OPTIONS_FAILURE:
      return { ...state, options: { ...state.options, loading: false, error: action?.payload?.err || 401 } };
    case Types.GET_WALLET_OPTIONS_SUCCESS:
      return {
        ...state,
        options: {
          ...state.options,
          loading: false,
          error: false,
          data: action.payload.list
        }
      };

    default:
      return state;
  }
};

export default reducer;
