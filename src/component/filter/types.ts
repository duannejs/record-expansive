import { IFilterField } from "./interface";

export interface IFilterInput {
    data: IFilterField
    value: string;
    onChange(field: string, value: string): void;
}