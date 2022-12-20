import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  VEHICLES: '@vehicles/VEHICLES',
  VEHICLESYID: '@vehicles/VEHICLESYIDID',
  VEHICLES_FAILURE: '@vehicles/VEHICLES_FAILURE',
  VEHICLES_SUCCESS: '@vehicles/VEHICLES_SUCCESS',
  VEHICLES_SAVED: '@vehicles/VEHICLES_SAVED',
  DELETE: '@vehicles/DELETE',
  UPDATE: '@vehicles/UPDATE',
  VEHICLES_SAVED_SUCESS: '@vehicles/VEHICLES_SAVED_SUCESS',
  VEHICLES_DELETE_SUCESS: '@vehicles/VEHICLESYID_DELETE_SUCESS',
  VEHICLES_DELETE_FAILED: '@vehicles/VEHICLESYID_DELETE_FAILED'
};

export interface ICars {
  items: IItens[];  
}

interface IItens {
  id: number;
  id_protocolo: number;
  km_inicial: number;
  km_final: number;
  trajeto: string;
  data: string;
  percorrido: string;
  valor_km: string;
  excluido: string
}


export interface IVehiclesTypes {
  data: ICars;
  loading: boolean;
  error: boolean;
}


