/* eslint-disable no-case-declarations */
import { Types, IAllDocumentosTypes } from './types';

const INITIAL_STATE: IAllDocumentosTypes = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = INITIAL_STATE, action: any): any => {  
  switch (action.type) {
    case Types.DOCUMENTOSBYID:     
      return { ...state, data: [], loading: true, error: false };   
    case Types.DOCUMENTOS_SUCCESS:      
      return {
        ...state,
        data: action.payload.docs,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
