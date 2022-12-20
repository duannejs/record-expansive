import { GridSortDirection } from '@mui/x-data-grid';

export interface ISorting{
    field: string;
    sort: GridSortDirection
}

export interface IFilterList{
    field: string;
    value: any;
}

export interface IPagination{
    size: number;
    page: number;
}



export const rowsPerPage = [5, 10, 25, 50]