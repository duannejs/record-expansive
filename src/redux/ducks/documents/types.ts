import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  DOCUMENTOS: '@documentos/DOCUMENTOS',
  DOCUMENTOSBYID: '@documentos/DOCUMENTOSBYID',
  DOCUMENTOS_FAILURE: '@documentos/DOCUMENTOS_FAILURE',
  DOCUMENTOS_SUCCESS: '@documentos/DOCUMENTOS_SUCCESS',
  DOCS_SAVED: '@documentos/DOCS_SAVED',
  DELETE: '@documentos/DELETE',
  UPDATE: '@documentos/UPDATE',
  DOCS_SAVED_SUCESS: '@documentos/DOCS_SAVED_SUCESS',
  DOCS_DELETE_SUCESS: '@documentos/DOCS_DELETE_SUCESS',
  DOCS_DELETE_FAILED: '@documentos/DOCS_DELETE_FAILED'
};

export interface IDoc {
  protocoloId: number;
  dataFinal: string;
  dataInicial: string;
  status: number;
  dataEntrega: string;
  cliente: string;
  obsjust: string;
  veiculo: string;
  vl_km: string;
  items: IItens[];
}

interface IItens {
  id: number;
  data: string;
  descricao: string;
  conteudo: string;
  destinatario: string;
  categoria: string;
  valor: string;
  dataPagamento: string;  
}



export interface IDocumentosTypes {
  data: IDoc;
  loading: boolean;
  error: boolean;
}


