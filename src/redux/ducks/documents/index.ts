/* eslint-disable no-case-declarations */
import { Types, IDocumentosTypes } from './types';

const INITIAL_STATE: IDocumentosTypes = {
    data: {
        protocoloId: 0,
        dataFinal: '',
        dataInicial: '',
        status: 1,
        dataEntrega: '',
        obsjust: '',
        cliente: '',
        veiculo: '',
         vl_km: '',
        items: [],
    },
    loading: false,
    error: false
}

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.DOCUMENTOS:
        case Types.DOCUMENTOSBYID:
            return { ...state, ...INITIAL_STATE, loading: true, error: false };
        case Types.DOCUMENTOS_FAILURE:
            return { ...state, loading: false, error: true };
        case Types.DOCUMENTOS_SUCCESS:           
            return {
                ...state,
                data: { ...state.data,  ...action.payload.docs},
                loading: false,
                error: false,
            };
        case Types.DOCS_SAVED:           
        case Types.DELETE:
            return { ...state, loading: false, error: false };
        case Types.DOCS_DELETE_SUCESS:
            let indexId = state.data.items.findIndex(e => e.id == action.payload.id)
            if (indexId > -1) {
                console.log(JSON.stringify(state.data.items), indexId)
                const lista = state.data.items
                lista.splice(indexId, 1)
                console.log(JSON.stringify(lista), indexId)
                return { ...state, loading: false, error: false, data: { ...state.data, items: lista } }
            }
            return { ...state, loading: false, error: false }
        case Types.DOCS_SAVED_SUCESS:     
            // const lista = state.data.items
            // return {
            //     user: action.payload.docs,
            //     loading: false,
            //     error: false,
            // };
        default:
            return state;
    }
};

export default reducer;
