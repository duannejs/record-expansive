/* eslint-disable no-case-declarations */
import { Types, IVehiclesTypes } from './types';

const INITIAL_STATE: IVehiclesTypes = {
    data: {
        items: [],
    },
    loading: false,
    error: false
}

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.VEHICLES:
            return { ...state, ...INITIAL_STATE, loading: true, error: false };
        case Types.VEHICLESYID:
            return { ...state, ...INITIAL_STATE, loading: true, error: false };
        case Types.VEHICLES_FAILURE:
            return { ...state, loading: false, error: true };
        case Types.VEHICLES_SUCCESS:           
            return {
                ...state,
                data: { items: [...action.payload.km] },
                loading: false,
                error: false,
            };
        case Types.VEHICLES_SAVED:
        case Types.DELETE:
            let indexId = state.data.items.findIndex(e => e.id == action.payload.id)
            if (indexId > -1) {
                console.log(JSON.stringify(state.data.items), indexId)
                const lista = state.data.items
                lista.splice(indexId, 1)
                console.log(JSON.stringify(lista), indexId)
                return { ...state, loading: false, error: false, data: { ...state.data, items: lista } }
            }
            return { ...state, loading: false, error: false }
        case Types.VEHICLES_DELETE_SUCESS:
            return { ...state, loading: false, error: false, data: { ...state.data } }
        case Types.VEHICLES_SAVED_SUCESS:
            const lista = state.data.items
            return {
                user: action.payload.km,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export default reducer;

