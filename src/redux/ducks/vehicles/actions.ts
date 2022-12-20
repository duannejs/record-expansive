import { ICars, Types } from './types'
import { action } from 'typesafe-actions'


export const GetVehicles = (id: number) => {
  return action(Types.VEHICLES, { id })
}

export const GetVehiclesSuccess = (km: ICars[]) => {
  return action(Types.VEHICLES_SUCCESS, { km })
}

export const GetVehiclesFailure = (err: number) => {
  return action(Types.VEHICLES_FAILURE, { err })
}

export const VehiclesSave = (kmIni: string, kmFim: string, trajeto: string, data:string, percorrido: string , id_protocolo: Number) => {
  return action(Types.VEHICLES_SAVED, { kmIni, kmFim, trajeto, data, percorrido , id_protocolo });
};

export const VehiclesSaveSucess = () => {
  return action(Types.VEHICLES, {});
};

export const VehiclesDelete = (id: string) => {
  return action(Types.DELETE, { id });
};

export const VehiclesDeleteSucess = (id: number) => {
  return action(Types.VEHICLES_DELETE_SUCESS, { id });
};

export const VehiclesDeleteFailed = (err: number) => {
  return action(Types.VEHICLES_FAILURE, { err });
};


