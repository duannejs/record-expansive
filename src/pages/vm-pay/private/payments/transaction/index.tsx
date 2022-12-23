import { Search } from "@mui/icons-material";
import { Box, Button, CardActions, Drawer, Paper, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsComp from "../../../../../component/breadcrumbs";
import FilterTable from "../../../../../component/filter";
import { formatSelectIdValue, formatSelectValue } from "../../../../../component/filter/functions";
import { IFieldSize, IFieldType, IFilterField, ISelectOptions } from "../../../../../component/filter/interface";
import TableDataGrid, { ITableProps } from "../../../../../component/table";
import { IFilterList } from "../../../../../component/table/def";
import { GetOrderPaginated } from "../../../../../redux/ducks/pay/order/actions";
import { getColorByStatus, IOrder, statusTransaction } from "../../../../../redux/ducks/pay/order/types";
import { GetWalletOptions } from "../../../../../redux/ducks/pay/wallet/actions";
import { AppStore } from "../../../../../redux/IAppStore";
import { formatterDate, formatterMoney, sortNumber } from "../../../../../utils/functions";
import TransactionDetail from "./details/transactionDetails";


interface IModalDetails {
    isOpen: boolean;
    order: IOrder | null;
}

const Transaction = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { order, wallet, profile } = useSelector((app: AppStore) => app);
    const [modalDetails, setModalDetails] = useState<IModalDetails>({ isOpen: false, order: null });
    const [filter, setFilter] = useState<IFilterList[]>([]);

    useEffect(() => {
        dispatch(GetWalletOptions())
    }, []);


    const onTableProps = ({ pagination, sorting, filter }: ITableProps) => {
        dispatch(GetOrderPaginated(pagination.page, pagination.size, filter, sorting));
    }

    const onSearchWithParams = (params: IFilterList[]) => {
        setFilter(params);
    }

    const onDetailOrder = (order: IOrder) => {
        setModalDetails({ isOpen: true, order })
    }

    const onCloseModal = () => {
        setModalDetails({ isOpen: false, order: null })
    }

    const filtersField: IFilterField[] =
        [
            {
                field: 'wallet', label: t('wallet.name'), id: 1, order: 1, type: IFieldType.SELECT, size: IFieldSize.SMALL, fixedChip: false,
                options: {
                    data: wallet.options.data.sort((i, k) => sortNumber(i, k, 'id')).
                        map((op) => { return { id: op.id, value: op.description, key: 'value' } }),
                    format: formatSelectIdValue
                }
            },
            {
                field: 'status', label: t('order.status'), id: 2, order: 2, type: IFieldType.SELECT, size: IFieldSize.SMALL, fixedChip: false,
                options: {
                    data: statusTransaction.map((op) => { return { id: op.id, value: t(`status.${op.value}`), key: 'id' } }),
                    format: formatSelectValue
                }
            },
            {
                field: 'startDate', label: t('common.dateStart'), id: 3, order: 3, type: IFieldType.DATE, fixedChip: true, dateOptions: { isStart: true }, size: IFieldSize.SMALL
            },
            {
                field: 'endDate', label: t('common.dateEnd'), id: 4, order: 4, type: IFieldType.DATE, size: IFieldSize.SMALL, fixedChip: true,
            },
            {
                field: 'storeId', label: t('order.store'), id: 5, order: 5, type: IFieldType.AUTOCOMPLETE, size: IFieldSize.MEDIUM, fixedChip: false,
                options: {
                    data: profile.userInfo.stores.sort((i:any, k: any) => sortNumber(i, k, 'storeId')).map((item:any): ISelectOptions => {
                        return { id: item.storeId, value: item.storeId.toString(), key: 'id' }
                    }),
                    format: (obj: any) => { return obj.value }
                }
            },
            {
                field: 'pos', label: t('order.pos'), id: 6, order: 6, type: IFieldType.INPUT, size: IFieldSize.SMALL, fixedChip: false,
            },
            {
                field: 'coupon', label: t('order.coupon'), id: 7, order: 7, type: IFieldType.INPUT, size: IFieldSize.SMALL, fixedChip: false,
            },
            {
                field: 'value', label: t('order.total'), id: 8, order: 8, type: IFieldType.INPUT, size: IFieldSize.SMALL, fixedChip: false, inputType: 'number', adornment: { type: 'TEXT', name: t('common.money') }
            },
        ]

    const columns: GridColDef[] = [
        { field: 'wallet', headerName: t('order.wallet'), flex: 1.5, align: 'center', headerAlign: 'center' },
        { field: 'storeId', headerName: t('order.store'), flex: 0.8, headerAlign: 'center', align: 'center' },
        { field: 'date', headerName: t('order.date'), flex: 2, headerAlign: 'center', align: 'center', renderCell: (params) => formatterDate(params.value) },
        { field: 'pos', headerName: t('order.pos'), flex: 0.8, headerAlign: 'center', align: 'center' },
        { field: 'coupon', headerName: t('order.coupon'), flex: 1, headerAlign: 'center', align: 'center' },
        {
            field: 'status', headerName: t('order.status'), flex: 2.5, headerAlign: 'center', renderCell: (params) =>
                <Typography sx={{ bgcolor: getColorByStatus(params.value), width: '100%', color: '#fff', textAlign: 'center' }}>
                    {t(`status.${(params.value)}`)}
                </Typography>
        },
        { field: 'identifier', headerName: t('order.identifier'), flex: 2, headerAlign: 'center', align: 'center' },
        {
            field: 'value', headerName: t('order.total'), flex: 1.5, headerAlign: 'center', align: 'center', renderCell: (params) =>
                <Box sx={{ display: 'flex', width: '60%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography>{`${t('common.money')}`}</Typography>
                    <Typography>{`${formatterMoney(params.value)} `}</Typography>
                </Box>

        },
        {
            field: 'action', headerName: t('common.actions'),
            sortable: false,
            flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (e) =>
                <CardActions>
                    <Button size="medium" onClick={() => { onDetailOrder(e.row) }}><Search color="info"></Search></Button>
                </CardActions>
        },
    ];

    return (
        <Box>
            <BreadcrumbsComp />
            <Stack spacing={1}>
                <FilterTable data={filtersField}
                    useDate={true}
                    onSearch={(params) => { onSearchWithParams(params) }}
                />
                <Paper>
                    <TableDataGrid
                        columns={columns}
                        loading={order.loading}
                        filter={filter}
                        pageProps={{ ...order.data }}
                        field="date"
                        rowKey="id"
                        onChangeProps={onTableProps}
                    />
                </Paper>
                <Drawer
                    anchor="bottom"
                    open={modalDetails.isOpen}
                    onClose={() => { }}>
                    {modalDetails.order ? <TransactionDetail
                        handleClose={() => { onCloseModal() }}
                        order={modalDetails.order}
                    /> : ''}
                </Drawer>
            </Stack>
        </Box>)
}

export default Transaction;