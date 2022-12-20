import { Types } from './types'
import { action } from 'typesafe-actions'
import { Icabecalho } from '../categorias/types'



export const GetCabecalho = () => {   
    return action(Types.GET_CABECALHO, { })
}

export const CabecalhoUpdate = (status: number, cobranca: boolean , user_aprov: number , id: number) => {
    return action(Types.GET_CABECALHO_UPDATE, { status, cobranca , user_aprov , id});
}

export const GetCabecalhoSuccess = (cabecalhos: Icabecalho[]) => {   
    return action(Types.GET_CABECALHO_SUCCESS, { cabecalhos })
}
