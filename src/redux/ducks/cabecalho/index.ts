import { Types, ICabecalhosTypes } from './types';

const INITIAL_STATE: ICabecalhosTypes = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = INITIAL_STATE, action: any): any => {
  switch (action.type) {
    case Types.GET_CABECALHO:
      return { ...state, data: [], loading: true, error: false };
    case Types.GET_CABECALHO_UPDATE:
      return { ...state, loading: false, error: action?.payload?.err || 401 };
    case Types.GET_CABECALHO_SUCCESS:
      return {
        ...state,
        data: action.payload.cabecalhos,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
