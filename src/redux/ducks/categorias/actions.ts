import { Icategory, Types } from './types'
import { action } from 'typesafe-actions'

export const GetCategory = () => {
    return action(Types.GET_CATEGORY, {})
}

export const GetCategoryFailure = (err: number) => {
    return action(Types.GET_CATEGORY_FAILURE, { err })
}

export const GetCategorySuccess = (unities: Icategory[]) => {
    return action(Types.GET_CATEGORY_SUCCESS, { unities })
}

export const CategoryUpdate = (dataIni: string, dataFim: string, status: number, cliente: string, id: number , id_protocolo: number , obs: string, cobranca: boolean , veiculo: string , vl_km: string) => {
    return action(Types.GET_CATEGORY_UPDATE, { dataIni, dataFim, status, cliente, id , id_protocolo , obs, cobranca , veiculo , vl_km });
}


export const CategoryUpdateSucess = () => {
    return action(Types.GET_CATEGORY, {});
};