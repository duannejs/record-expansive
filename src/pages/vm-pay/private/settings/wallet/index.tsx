import { Edit, Done, Clear } from "@mui/icons-material";
import { Box, Button, CardActions, Chip, Paper, Stack } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsComp from "../../../../../component/breadcrumbs";
import DialogCustom from "../../../../../component/dialog";
import FilterTable from "../../../../../component/filter";
import { formatSelectIdValue } from "../../../../../component/filter/functions";
import { IFieldSize, IFieldType, IInput, ISelectData } from "../../../../../component/filter/interface";
import TableDataGrid, { ITableProps } from "../../../../../component/table";
import { IFilterList } from "../../../../../component/table/def";
import { GetWalletOptions, GetWalletPaginated } from "../../../../../redux/ducks/pay/wallet/actions";
import { IWallet } from "../../../../../redux/ducks/pay/wallet/types";
import { AppStore } from "../../../../../redux/IAppStore";
import { sortNumber } from "../../../../../utils/functions";
import WalletModalConfig from "./modal";

interface IModalWalletProps {
    open: boolean;
    wallet: IWallet | null
}

const Wallet = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { wallet } = useSelector((app: AppStore) => app);
    const [modal, setModal] = useState<IModalWalletProps>({ wallet: null, open: false });
    const [filter, setFilter] = useState<IFilterList[]>([]);


    useEffect(() => {
        dispatch(GetWalletOptions())
    }, []);

    const handleCloseModal = () => {
        setModal({ open: false, wallet: null });
    }

    const handleOpenModal = (wallet: IWallet) => {
        setModal({ open: true, wallet });
    }

    const onTableProps = ({ pagination, sorting, filter }: ITableProps) => {
        dispatch(GetWalletPaginated(pagination.page, pagination.size, filter, sorting));
    }

    const onSearchWithParams = (params: IFilterList[]) => {
        setFilter(params);
    }


    const columns: GridColDef[] = [
        { field: 'walletId', headerName: t('wallet.id'), flex: 2, align: 'center', headerAlign: 'center' },
        { field: 'wallet', headerName: t('wallet.description'), flex: 2, headerAlign: 'center', align: 'center' },
        { field: 'tenantId', headerName: t('wallet.tenant'), flex: 3, headerAlign: 'center', align: 'center' },
        {
            field: 'active', headerName: t('wallet.status'), flex: 1, sortable: false, headerAlign: 'center', align: 'center',
            renderCell: (params) => <Chip icon={params.value ? <Done /> : <Clear />} label={params.value ? t('common.active') : t('common.inactive')} color={params.value ? 'success' : 'error'} />
        },
        {
            field: 'action', headerName: t('common.actions'),
            sortable: false,
            flex: 2, align: 'center', headerAlign: 'center',
            renderCell: (params) =>
                <CardActions>
                    <Button size="medium" onClick={() => { handleOpenModal(params.row) }} startIcon={<Edit />}>{t('wallet.config')}</Button>
                </CardActions>
        },
    ];

    return (
        <Box>
            <BreadcrumbsComp />
            <Stack spacing={1}>
                <FilterTable useDate={false} data={[
                    {
                        field: 'walletId', label: t('wallet.name'), id: 1, order: 2, type: IFieldType.SELECT, size: IFieldSize.SMALL,
                        fixedChip: false,
                        options: {
                            data: wallet.options.data
                                .sort((i, k) => sortNumber(i, k, 'id'))
                                .map((op) => { return { id: op.id, value: op.description, key: 'id' } }),
                            format: formatSelectIdValue
                        }
                    },
                ]}
                    onSearch={(params) => { onSearchWithParams(params) }}
                />
                <Paper>
                    <TableDataGrid
                        columns={columns}
                        loading={wallet.loading}
                        filter={filter}
                        pageProps={{ ...wallet.data }}
                        field="walletId"
                        rowKey="walletId"
                        onChangeProps={onTableProps}
                    />
                </Paper>
            </Stack>
            <DialogCustom fullWidth maxWidth="lg" isOpen={modal.open}>
                <WalletModalConfig wallet={modal.wallet} handleClose={handleCloseModal} />
            </DialogCustom>
        </Box >)
}

export default Wallet;