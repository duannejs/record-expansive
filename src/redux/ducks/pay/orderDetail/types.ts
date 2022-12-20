import { ActionType } from 'typesafe-actions';
import { IOrder } from '../order/types';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    GET_ORDER_DETAIL: '@order/GET_ORDER_DETAIL',
    GET_ORDER_DETAIL_SUCCESS: '@order/GET_ORDER_DETAIL_SUCCESS',
    GET_ORDER_DETAIL_FAILURE: '@order/GET_ORDER_DETAIL_FAILURE',
};

export interface IOrderDetailTypes {
    data: IOrderDetail;
    loading: boolean;
    error: number | false;
}


export interface IOrderHistory {
    id: string;
    details: IOrderHistoryDetail[]
}

export enum IOperationType {
    PDV_ONLY = 1,
    PDV_TO_API = 2,
    WEBHOOK = 3,
    JOB_EXE = 4,
    PDV_TO_JOB = 5
}

export interface IOrderHistoryDetail {
    action: 'STEPS' | 'RESERVE' | 'STATUS' | 'COMMIT' | 'CALLBACK' | 'CONCILIADOR' | 'CANCEL' | 'TO_COMMIT';
    posDate: string;
    startDate: string;
    endDate: string;
    amount: number;
    content: string;
    status: number;
    sequence: number;
    operationType: number;
}

export interface IOrderItems {
    description: string;
    quantity: number;
    unitValue: number;
    totalValue: number;
    sku: number;
    unitType: string;
}
export interface IOrderCBCParcel {
    parcelId: number;
    barCode: string;
    parcelNumber: number,
    dueDate: string,
    status: string,
    value: number,
    amount: number,
    fee: number,
    multa: number,
    mora: number;
    iofDiarioAtraso: number;
    iofAdicionalAtraso: number;

}

export interface IOrderCBCCustomer {
    identification: string;
    name: string;
}

export interface IOrderCBC {
    contract: IOrderCBCContract;
    customer: IOrderCBCCustomer;
}
export interface IOrderCBCContract {
    contractId: number;
    transactionId: number;
    sellIdentifier: string;
    nsu: string;
    barCode: string;
    amount: number;
    value: number;
    fee: number;
    status: string;
    qtdeParcel: number;
    parcels: IOrderCBCParcel[];

}

export interface IOrderPayment {
    value: number;
    type: string;
    label: string;
}

export interface IOrderDetail {
    order: IOrder;
    history: IOrderHistory;
    items: IOrderItems[];
    cbc: IOrderCBC;
    paymentMethod: IOrderPayment;
}