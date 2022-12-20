import { DataGrid, GridColDef, GridDensity, GridSortModel } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { IPaginated } from "../../redux/ducks/pay/types";
import { IFilterList, IPagination, ISorting, rowsPerPage } from "./def";

interface IDataGrid {
    columns: GridColDef[];
    loading: boolean;
    filter: IFilterList[];
    pageProps: IPaginated;
    field: string;
    rowKey: string;
    onChangeProps(props: ITableProps): void;
}

export interface ITableProps {
    pagination: IPagination;
    sorting: ISorting;
    filter: IFilterList[];

}

const TableDataGrid = ({ columns, pageProps, loading, field, filter, rowKey, onChangeProps }: IDataGrid) => {

    const [tableProps, setTableProps] = useState<ITableProps>({ pagination: { size: 10, page: 0 }, sorting: { field, sort: 'asc' }, filter: [] })

    useEffect(() => {
        //TODO: com a utilização do SAGAS não esta gerando 2 request, porem inicialmente o tableProp recebe 2 alterações
        // ajustar para receber apenas 1
        setTableProps({ ...tableProps, pagination: { ...tableProps.pagination, page: 0 }, filter: filter.map((i) => i) })
    }, [filter]);

    useEffect(() => {
       onChangeProps(tableProps);
    }, [tableProps]);

    const onPageSizeChange = (_size: number) => {
        setTableProps({ ...tableProps, pagination: { ...tableProps.pagination, size: _size } });
    }

    const onSortChange = (_sort: GridSortModel) => {
        if (pageProps.totalPages > 1) {
            setTableProps({ ...tableProps, sorting: { ..._sort[0] } });
        }
    }

    const onPageChange = (_page: number) => {
        setTableProps({ ...tableProps, pagination: { ...tableProps.pagination, page: _page } });
    }

    const getMode = () => {
        return pageProps.totalPages > 1 ? "server" : "client"
    }

    const getDensity = (): GridDensity | undefined => {
        if (pageProps.pageSize > 5)
            return 'compact'
        if (pageProps.pageSize >= 3)
            return 'standard'
        return 'comfortable'
    }

    return (
        <DataGrid
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            filterMode="server"
            density={getDensity()}
            loading={loading}
            columns={columns}
            rows={pageProps.data}
            getRowId={(row: any) => row[rowKey]}
            pagination
            sortingMode={getMode()}
            onPageSizeChange={onPageSizeChange}
            paginationMode={getMode()}
            onSortModelChange={onSortChange}
            initialState={{
                sorting: {
                    sortModel: [tableProps.sorting],
                },
                pagination: {
                    pageSize: tableProps.pagination.size,
                    page: tableProps.pagination.page,
                },
            }}
            rowCount={pageProps.totalRegistered}
            onPageChange={onPageChange}
            rowsPerPageOptions={rowsPerPage}
        />


    )
}

export default TableDataGrid;