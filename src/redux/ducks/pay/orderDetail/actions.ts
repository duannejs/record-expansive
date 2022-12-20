import { action } from "typesafe-actions";
import { IOrderDetail, Types } from "./types";

export const GetOrderDetail = (id: any) => {
    return action(Types.GET_ORDER_DETAIL, { id });
}

export const GetOrderDetailFailure = (err: number) => {
    return action(Types.GET_ORDER_DETAIL_FAILURE, { err });
};

export const GetOrderDetailSuccess = (detail: IOrderDetail) => {
    return action(Types.GET_ORDER_DETAIL_SUCCESS, { detail });
};