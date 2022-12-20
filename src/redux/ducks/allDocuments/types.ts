import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  DOCUMENTOSBYID: '@documentos/DOCUMENTOSBYID',
  DOCUMENTOS_SUCCESS: '@documentos/DOCUMENTOS_SUCCESS',

};

export interface IDoc {
  id: number;
  descricao: string;
  destinatario: string;
  valor: number;
  categoria: number;
  data: string;
  conteudo: string;
  
}


export interface IAllDocumentosTypes {
  data: IDoc [];
  loading: boolean;
  error: boolean;
}


