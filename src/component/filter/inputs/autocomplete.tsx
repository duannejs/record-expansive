import { Autocomplete, TextField } from "@mui/material"
import { IFilterField } from "../interface";
import { IFilterInput } from "../types";



const AutocompleteComp = ({ data: { id, size, field, label, options }, value, onChange }: IFilterInput) => {

    return (
        <Autocomplete
            id={id.toString()}
            multiple
            size="small"
            limitTags={3}
            isOptionEqualToValue={(op,value)=> op.id == value.id}
            getLimitTagsText={(more) => `+(${more})`}
            sx={{ flex: size, m: 0.5 }}
            options={options?.data.map((o) => { return { id: o.id, label: o.value } }) || []}
            onChange={(event, values) => onChange(field, values.map((e) => e.id).join(','))}
            renderInput={(params: any) =>
                <TextField {...params}
                    key={id}
                    margin="none"
                    value={value}
                    size="small"
                    label={label} />}
        />
    )
}


export function autoCompleteChip(field: IFilterField, value: string): string {
    if (!field.options)
        return `${field.label}: ${value}`;

    const opt = field.options.data.find((select) => select.id == value);
    if (opt)
        return `${field.label}: ${field.options.format(opt)}`;

    return `${field.label}: ${value}`;
}


export default AutocompleteComp;