import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  GET_CATEGORY: '@category/GET_CATEGORY',
  GET_CATEGORY_FAILURE: '@category/GET_CATEGORY_FAILURE',
  GET_CATEGORY_SUCCESS: '@category/GET_CATEGORY_SUCCESS',
  GET_CATEGORY_UPDATE: '@category/GET_CATEGORY_UPDATE',
  GET_CABECALHO: '@cabecalho/GET_CABECALHO',
  GET_CABECALHO_SUCCESS: '@cabecalho/GET_CABECALHO_SUCCESS',
  
};

export interface Icategory {
  id: number;
  descricao: string;
}

export interface Icabecalho {
  id: number;
  cliente: string;
  data_inicial: string;
  data_final: string;
  usuario: string;
  valor: string;
  obs: string;
}

export interface ICategoryTypes {
  data: Icategory[];
  loading: boolean;
  error: boolean;
}

