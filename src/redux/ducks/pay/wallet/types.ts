import { ActionType } from 'typesafe-actions';
import { IPaginated } from '../types';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  GET_WALLET: '@wallet/GET_WALLET',
  GET_WALLET_FAILURE: '@wallet/GET_WALLET_FAILURE',
  GET_WALLET_SUCCESS: '@wallet/GET_WALLET_SUCCESS',

  GET_WALLET_OPTIONS: '@wallet/GET_WALLET_OPTIONS',
  GET_WALLET_OPTIONS_FAILURE: '@wallet/GET_WALLET_OPTIONS_FAILURE',
  GET_WALLET_OPTIONS_SUCCESS: '@wallet/GET_WALLET_OPTIONS_SUCCESS',
};

export interface IWalletsPaginated extends IPaginated {
  data: IWallet[];
}

export interface IWalletOptions {
  id: number;
  description: string;
}
export interface IWalletsTypes {
  data: IWalletsPaginated;
  options: {
    data: IWalletOptions[];
    loading: boolean;
    error: number | false;
  };
  loading: boolean;
  error: number | false;
}

export interface IWallet {

  walletId: number;
  tenantId: string;
  wallet: string;
  active: boolean;
  // id: string;
  // value: number;
  // status:
  // | 'DENIED'
  // | 'CONTINGENCY_ORDER'
  // | 'AWAITING'
  // | 'PAID'
  // | 'COMMIT_TODO'
  // | 'COMMIT'
  // | 'COMMIT_FAILED'
  // | 'CANCELLED'
  // | 'CHARGEBACK'
  // | 'AWAITING_CHARGEBACK';
  // date: Date;
  // storeId: number;
  // pos: number;
  // coupon: number;
  // identifier: string;
  // wallet: string;
}

export interface IWalletsFiltersTypes { }

export function getFieldFilter(field: string): string {
  switch (field) {
    case 'id':
      return "paymentTenants.id";
    case 'wallet':
      return 'description';
    case 'walletId':
      return 'id';
    default:
      return 'id';
  }
}