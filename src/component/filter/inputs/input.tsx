import { InputAdornment, TextField } from "@mui/material";
import { IFilterField } from "../interface";
import { IFilterInput } from "../types";

const InputField = ({ data: { id, size, field, label, adornment, inputType }, value, onChange }: IFilterInput) => {


    const renderAdornment = () => {
        if (adornment) {
            return {
                startAdornment: (<InputAdornment position="start">
                    {adornment.type == 'TEXT' ? adornment.name : ''}
                </InputAdornment>)
            }
        }
        return { startAdornment: undefined }
    }

    return (
        <TextField
            key={id}
            sx={{ flex: size, m: 0.5 }}
            InputProps={renderAdornment()}
            type={inputType || 'text'}
            margin="none"
            value={value}
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(field, event.target.value)}
            label={label}
        />
    )
}

export default InputField;

export function inputRenderChip(field: IFilterField, value: string): string {
    return `${field.label}: ${value}`;
}
