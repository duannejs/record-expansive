import { ActionType } from 'typesafe-actions';
import { IPaginated } from '../types';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  GET_ORDER: '@order/GET_ORDER',
  GET_ORDER_FAILURE: '@wallet/GET_ORDER_FAILURE',
  GET_ORDER_SUCCESS: '@wallet/GET_ORDER_SUCCESS',
};


export interface IOrdersPaginated extends IPaginated {
  data: IOrder[];
}

export interface IOrdersTypes {
  data: IOrdersPaginated;
  loading: boolean;
  error: number | false;
}

export interface IOrder {
  id: string;
  value: number;
  status:
  | 'DENIED'
  | 'CONTINGENCY_ORDER'
  | 'AWAITING'
  | 'PAID'
  | 'COMMIT_TODO'
  | 'COMMIT'
  | 'COMMIT_FAILED'
  | 'COMMIT_ERROR'
  | 'CANCELLED'
  | 'CHARGEBACK'
  | 'AWAITING_CHARGEBACK';
  date: Date;
  storeId: number;
  pos: number;
  coupon: number;
  identifier: string;
  wallet: string;
}

export interface IOrdersFiltersTypes { }

export function getFieldFilter(field: string): string {
  switch (field) {
    case 'id':
      return "id";
    case 'wallet':
      return 'paymentTenant.paymentService.description';
    case 'storeId':
      return 'paymentOrderPOS.store';
    case 'date':
      return 'date';
    case 'pos':
      return 'paymentOrderPOS.pos';
    case 'coupon':
      return 'paymentOrderPOS.coupon';
    case 'status':
      return 'status';
    case 'identifier':
      return 'identifier';
    case 'value':
      return 'value';
    default:
      return 'id';
  }
}

export function getColorByStatus(status: string): string {
  switch (status) {
    case 'DENIED':
      return '#795548';
    case 'AWAITING':
      return '#2196f3';
    case 'CONTINGENCY_ORDER':
      return '#7c4dff';
    case 'PAID':
      return '#3f51b5';
    case 'COMMIT_TODO':
      return '#009688';
    case 'COMMIT':
      return '#28ac6a';
    case 'COMMIT_FAILED':
      return '#9c27b0';
    case 'COMMIT_ERROR':
      return '#e91e63';
    case 'CANCELLED':
      return '#f44336';
    case 'CHARGEBACK':
      return '#ef6c00';
    case 'AWAITING_CHARGEBACK':
      return '#ff5722';
    default:
      return '#757575';
  }
}

export const statusTransaction = [
  { id: 'AWAITING', value: 'AWAITING' },
  { id: 'PAID', value: 'PAID' },
  { id: 'COMMIT_TODO', value: 'COMMIT_TODO' },
  { id: 'COMMIT', value: 'COMMIT' },
  { id: 'CANCELLED', value: 'CANCELLED' },
  { id: 'AWAITING_CHARGEBACK', value: 'AWAITING_CHARGEBACK' },
  { id: 'CHARGEBACK', value: 'CHARGEBACK' },
  { id: 'COMMIT_FAILED', value: 'COMMIT_FAILED' },
  { id: 'COMMIT_ERROR', value: 'COMMIT_ERROR' },
  { id: 'DENIED', value: 'DENIED' },
  { id: 'CONTINGENCY_ORDER', value: 'CONTINGENCY_ORDER' },
]