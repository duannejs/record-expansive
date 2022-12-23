import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  GET_CABECALHO: '@cabecalho/GET_CABECALHO',
  GET_CABECALHO_SUCCESS: '@cabecalho/GET_CABECALHO_SUCCESS',
  GET_CABECALHO_UPDATE: '@cabecalho/GET_CABECALHO_UPDATE',  
};


interface Icabecalhos {
  row: string;
  id: number;
  data_inicial: string;
  data_final: string;
  cliente: string;
  status: number;
  name: string;
  valor: number;
  obs: string;
  cobranca: boolean;
  veiculo: string;
  vl_km: string;
  totalVeiculo: number;
 
}

export interface ICabecalhosTypes {
  data: Icabecalhos[];
  loading: boolean;
  error: boolean;
}
 