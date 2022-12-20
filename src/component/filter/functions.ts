import moment from "moment";
import { ISelectOptions } from "./interface";

export function formatSelectIdValue(obj: ISelectOptions): string {
    return `${obj.id} - ${obj.value}`
}

export function formatSelectValue(obj: ISelectOptions): string {
    return `${obj.value}`
}

export function getDateInputToString(date: Date | null): string {
    return moment(date).format('YYYY-MM-DD')
}

export function getDateInput(value?: string): Date {
    if (value) {
        return new Date(moment(value, 'YYYY-MM-DD').format('MM/DD/YYYY'));
    }
    return new Date();
}

export function getDateString():string{
    return moment().format('YYYY-MM-DD')
}

export function getDateStringActual(value?: string):string{
    return moment(value).format('DD-MM-YYYY')
}

export function getDateInputSubtract(days: number): Date {
    return new Date(getStringInputSubtract(days));
}

export function getStringInputSubtract(days: number): string {
    return moment().subtract(15, 'days').format('YYYY-MM-DD');
}