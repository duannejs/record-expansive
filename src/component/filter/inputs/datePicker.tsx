import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IFilterInput } from "../types";
import ptLocale from 'date-fns/locale/pt-BR';
import { useEffect, useState } from "react";
import { getDateInput, getDateInputToString } from "../functions";
import { IFilterField } from "../interface";


const DatePicker = ({ data: { id, size, field, label, options, dateOptions }, value, onChange }: IFilterInput) => {

    const [dataValue, setDateValue] = useState<Date>();

    useEffect(() => {
        let realDate = getDateInput();
        if (value)
            realDate = getDateInput(value);
        setDateValue(realDate);
    }, [value])

    // else if (dateOptions?.isStart) {
    //     realDate = getDateInputSubtract(15);
    //     onChange(field, getDateInputToString(realDate));
    // } else {
    //     onChange(field, getDateInputToString(realDate));
    // }

    const change = (d: Date | null) => {
        onChange(field, getDateInputToString(d));
    }
    return (
        <LocalizationProvider
            id={id}
            dateAdapter={AdapterDateFns}
            adapterLocale={ptLocale}
        // localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <DesktopDatePicker
                label={label}
                // inputFormat="dd/MM/yyyy"
                value={dataValue}
                onChange={change}
                renderInput={(params) => <TextField sx={{ flex: size, m: 0.5 }} size="small" margin="none" {...params} />}
            />
        </LocalizationProvider>
    );
}



export function dateRenderChip(field: IFilterField, value: string): string {
    return `${field.label}: ${value}`;
}

export default DatePicker;