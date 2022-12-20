/* eslint-disable no-case-declarations */
import { Types, ICategoryTypes } from './types';

const INITIAL_STATE: ICategoryTypes = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case Types.GET_CATEGORY:
      return { ...state, data: [], loading: true, error: false };
    case Types.GET_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action?.payload?.err || 401 };
    case Types.GET_CATEGORY_UPDATE:
      return { ...state, loading: false, error: action?.payload?.err || 401 };
    case Types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload.unities,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
