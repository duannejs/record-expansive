import { Chip, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { sortNumber } from "../../../utils/functions";
import { autoCompleteChip } from "../inputs/autocomplete";
import { dateRenderChip } from "../inputs/datePicker";
import { inputRenderChip } from "../inputs/input";
import { selectRenderChip } from "../inputs/select";
import { IChip, IFieldType, IFilterField } from "../interface"


interface IChipComponent {
    values: IChip[];
    data: IFilterField[];
    handleDeleteChip(field: string): void;
}

const ChipList = ({ values, data, handleDeleteChip }: IChipComponent) => {

    const [chips, setChips] = useState<IChip[]>([]);

    useEffect(() => {
        const chips_aux: IChip[] = [];
        values.forEach((v) => {
            const field = data.find((d) => d.field == v.field);
            if (!field) {
                chips_aux.push({ field: v.field, value: v.value, order: v.order, isFixed: v.isFixed })
                return;
            }
            let func = getFuncRender(field.type);
            if (v.value) {
                if (v.value != 'selectDefault-all') {
                    chips_aux.push({ field: v.field, value: func(field, v.value), order: v.order, isFixed: v.isFixed });
                }
                return;
            }
            chips_aux.push({ field: v.field, value: v.value, order: v.order, isFixed: v.isFixed });
        });
        setChips(chips_aux)

    }, [values, data]);


    const defaultRender = (field: IFilterField, value: string) => {
        return `${value}`;
    }

    const getFuncRender = (type: IFieldType): Function => {
        switch (type) {
            case IFieldType.INPUT:
                return inputRenderChip;
            case IFieldType.AUTOCOMPLETE:
                return autoCompleteChip;
            case IFieldType.DATE:
                return dateRenderChip;
            case IFieldType.SELECT:
                return selectRenderChip;
            //TODO: concluir todos os tipos de input no filtro
            // case IFieldType.SWITCH:
            // case IFieldType.DATE_RANGE:
            // case IFieldType.RANGE:
            default:
                return defaultRender;
        }
    }

    const renderLabel = (label: String) => {
        if (label.length > 25) {
            return `${label.substring(0, 23)}...`
        }
        return label
    }

    const isClose = (item: IChip) => {
        if (item.isFixed)
            return {}
        return {
            onDelete: () => { handleDeleteChip(item.field) }
        }
    }

    return (
        <Grid item>
            {chips.sort((i, k) => sortNumber(i, k, 'order')).map((item: IChip) => (
                <Chip
                    key={item.field}
                    label={renderLabel(item.value)}
                    sx={{ marginLeft: 0.4 }}
                    size="small"
                    {...isClose(item)}
                />
            ))}

        </Grid>
    )
}

export default ChipList;