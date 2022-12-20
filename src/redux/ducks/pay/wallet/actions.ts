import { IWalletOptions, IWalletsPaginated, Types } from './types';
import { action } from 'typesafe-actions';
import { IFilterList, ISorting } from '../../../../component/table/def';

export const GetWalletPaginated = (
    page: number,
    size: number,
    filters: IFilterList[],
    sorting: ISorting,
) => {
    const filterObj: any = {}
    filters.forEach((i: IFilterList) => {
        if(i.value != 'selectDefault-all')
        filterObj[i.field] = i.value;
    });
    return action(Types.GET_WALLET, { page, size, filters: filterObj, sorting });
};

export const GetWalletOptions = ()=>{
    return action(Types.GET_WALLET_OPTIONS)
}

export const GetWalletOptionsSuccess = (list: IWalletOptions[])=>{
    return action(Types.GET_WALLET_OPTIONS_SUCCESS, {list})
}

export const GetWalletOptionsFailed = (err: number)=>{
    return action(Types.GET_WALLET_OPTIONS_FAILURE, {err})
}

export const GetWalletPaginatedFailure = (err: number) => {
    return action(Types.GET_WALLET_FAILURE, { err });
};

export const GetWalletPaginatedSuccess = (orders: IWalletsPaginated) => {
    return action(Types.GET_WALLET_SUCCESS, { orders });
};
