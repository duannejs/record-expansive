import { MenuItem, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IFilterField } from "../interface";
import { IFilterInput } from "../types";


const SelectField = ({ data: { id, size, field, label, options }, value, onChange }: IFilterInput) => {

    const { t } = useTranslation();
    return (
        <TextField
            key={id}
            select
            sx={{ flex: size, m: 0.5 }}
            margin="none"
            value={value}
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(field, event.target.value)}
            label={label}>
            <MenuItem  key={0} value={'selectDefault-all'}>
                {t('filter.selectDefault')}
            </MenuItem>
            {options?.data.map((item) => (
                <MenuItem key={item.id} value={item[item.key]}>
                    {options.format(item)}
                </MenuItem>))}
        </TextField>
    )
}

export default SelectField;


export function selectRenderChip(field: IFilterField, value: string): string {
    if (!field.options)
        return `${field.label}: ${value}`;

    const opt = field.options.data.find((select) => select.id == value);
    if (opt)
        return `${field.label}: ${field.options.format(opt)}`;

    return `${field.label}: ${value}`;
}
