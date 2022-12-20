import { GridSortDirection } from "@mui/x-data-grid";
import moment from "moment";
import { ISorting } from "../component/table/def";

interface IWalletInputType {
    SCANNER_OR_KEYBOARD_INPUT: string,
    KEYBOARD_INPUT: string,
    SCANNER: string;
    PINPAD_ECHO: string,
    PINPAD_PASSWORD: string,
    PINPAD_MAGNETIC: string,
}

const walletInputType: IWalletInputType = {
    SCANNER_OR_KEYBOARD_INPUT: 'wallet.steps.input.scan_key',
    KEYBOARD_INPUT: 'wallet.steps.input.key',
    PINPAD_ECHO: 'wallet.steps.input.pin',
    SCANNER: 'wallet.steps.input.scan',
    PINPAD_PASSWORD: 'wallet.steps.input.pin_pass',
    PINPAD_MAGNETIC: 'wallet.steps.input.pin_mag',
};

const getWalletInput = (type: string) => {
    return walletInputType[type as keyof IWalletInputType];
}

const getSorting = (field: string, sort: GridSortDirection) => {
    if (!field)
        return {}
    return { sort: `${field},${sort ? sort : 'asc'}` };
}

const formatterDate = (date: string) => {
    return `${moment(date).format('DD/MM/YYYY HH:mm:ss')}`
}

const formatterDateWithoutHour = (date: string) => {
    return `${moment(date).format('DD/MM/YYYY')}`
}

const formatterMoney = (value: number, separator: string = ",") => {
    return value.toFixed(2).replace('.', separator)
}

const sortNumber = (i: any, e: any, field: string) => {
    return i[field] > e[field] ? 1 : -1
}

const padStart = (txt: string | number, count: number = 6, value: string = '0'): string => {
    return txt.toString().padStart(count, value);
}

export { getWalletInput, getSorting, formatterDate, formatterDateWithoutHour ,formatterMoney, sortNumber, padStart }