import { IOrdersPaginated, Types } from './types';
import { action } from 'typesafe-actions';
import { IFilterList, ISorting } from '../../../../component/table/def';

export const GetOrderPaginated = (
    page: number,
    size: number,
    filters: IFilterList[],
    sorting: ISorting,
) => {
    const filterObj: any = {}
    filters.forEach((i: IFilterList) => {
        if (i.value != 'selectDefault-all')
            filterObj[i.field] = i.value;
    });
    return action(Types.GET_ORDER, { page, size, filters: filterObj, sorting });
};


export const GetOrderPaginatedFailure = (err: number) => {
    return action(Types.GET_ORDER_FAILURE, { err });
};

export const GetOrderPaginatedSuccess = (orders: IOrdersPaginated) => {
    return action(Types.GET_ORDER_SUCCESS, { orders });
};
