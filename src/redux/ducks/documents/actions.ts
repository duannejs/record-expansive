import { IDoc, Types } from './types'
import { action } from 'typesafe-actions'


export const GetDocumentos = () => {
  return action(Types.DOCUMENTOS, {})
}

export const GetDocumentosSuccess = (docs: IDoc[]) => {
  return action(Types.DOCUMENTOS_SUCCESS, { docs })
}

export const GetDocsFailure = (err: number) => {
  return action(Types.DOCUMENTOS_FAILURE, { err })
}

export const DocsSave = (data: string, status: number, descricao: string, conteudo: string, destinatario: number, categoria: number, setor: number, url: string, file_name: string, company: number, valor: number, data_pagamento: string, pix: string , id_protocolo: number) => {
  return action(Types.DOCS_SAVED, { data, status, descricao, conteudo, destinatario, categoria, setor, url, file_name, company, valor, data_pagamento, pix , id_protocolo });
};

export const DocsSaveSucess = () => {
  return action(Types.DOCUMENTOS, {});
};

export const DocDelete = (id: string) => {
  return action(Types.DELETE, { id });
};

export const DocDeleteSucess = (id: number) => {
  return action(Types.DOCS_DELETE_SUCESS, { id });
};

export const DocDeleteFailed = (err: number) => {
  return action(Types.DOCUMENTOS_FAILURE, { err });
};


