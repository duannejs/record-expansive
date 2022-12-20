import { IDoc, Types } from './types'
import { action } from 'typesafe-actions'

export const GetDocumentosId = (id: string) => {
  return action(Types.DOCUMENTOSBYID, { id })
}

export const GetDocumentosSuccess = (docs: IDoc[]) => {
  return action(Types.DOCUMENTOS_SUCCESS, { docs })
}



