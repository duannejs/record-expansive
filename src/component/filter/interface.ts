import { IFilterList } from "../table/def";

export enum IFieldSize {
    SMALL = 0.5,
    MEDIUM = 1,
    LARGE = 1.5
}

export enum IFieldType {
    INPUT,
    SELECT,
    AUTOCOMPLETE,
    SWITCH,
    RANGE,
    DATE,
    DATE_RANGE
}

export interface ISelectOptions {
    id: number | string;
    value: string;
    key: 'id' | 'value'
}

export interface ISelectData {
    data: ISelectOptions[];
    format(obj: ISelectOptions): string;
}

export interface IDateOptions {
    isStart: true;
}
export interface IAdornment {
    type: 'TEXT' | 'ICON',
    name: string;
}

export interface IFilterField {
    id: number;
    order: number;
    field: string;
    size: IFieldSize;
    label: string;
    options?: ISelectData;
    dateOptions?: IDateOptions;
    adornment?: IAdornment;
    fixedChip: boolean;
    description?: string;
    type: IFieldType;
    inputType?: | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
}

export interface IFilterTable {
    data: IFilterField[];
    useDate: boolean;
    onSearch(params: IFilterList[]): void
}

export interface IInput {
    field: string;
    value: string;
}

export interface IChip {
    field: string;
    order: number;
    isFixed: boolean;
    value: string;
}