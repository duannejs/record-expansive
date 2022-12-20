import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import payReducer from './pay/payReducer';
import componentError from './component/index'
import categoria from './categorias/index'
import documents from './documents/index'
import cabecalho from './cabecalho/index'
import webConfig from './webConfig/index'
import alldocuments from './allDocuments/index'
import vehicles from './vehicles/index'

const reducers = combineReducers({ ...payReducer, ...authReducer, componentError, categoria, documents, alldocuments, cabecalho, webConfig , vehicles });

export default reducers;

// const rootReducer =(state: any, action: any) =>
// reducers(action.type === 'LOGOUT_SUCCESS' ? undefined: state, action);

// export default rootReducer
