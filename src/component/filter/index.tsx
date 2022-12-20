import { FilterList, Search } from "@mui/icons-material";
import { Box, Button, Divider, Drawer, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { sortNumber } from "../../utils/functions";
import ChipList from "./chip";
import { getDateString, getStringInputSubtract } from "./functions";
import AutocompleteComp from "./inputs/autocomplete";
import DatePicker from "./inputs/datePicker";
import InputField from "./inputs/input";
// import RangeDate from "./inputs/rangeDate";
import SelectField from "./inputs/select";
import { IFilterField, IInput, IFilterTable, IFieldType, IChip } from "./interface";


const getShowInputBySize = (data: IFilterField[]): IFilterField[] => {
    const maxSize = 3;
    let size = 0;
    const list: IFilterField[] = []
    data.sort((i, k) => sortNumber(i, k, 'order')).every((f: IFilterField) => {
        if ((size + f.size) > maxSize)
            return false;
        list.push(f);
        size = size + f.size;
        return true;
    })
    return list;
}


const getLinesInputBySize = (data: IFilterField[]): Array<IFilterField[]> => {
    const maxSize = 3;
    const listInput: Array<IFilterField[]> = [];
    let size = 0;
    let list: IFilterField[] = []
    data.sort((i, k) => sortNumber(i, k, 'order')).forEach((f: IFilterField) => {
        if ((size + f.size) > maxSize) {
            listInput.push([...list]);
            size = 0;
            list = [];
        }
        list.push(f);
        size = size + f.size;
    })
    listInput.push(list)
    return listInput;
}

const FilterTable = ({ data, useDate, onSearch }: IFilterTable) => {

    const { t } = useTranslation();
    const [inputValues, setInputValues] = useState<IInput[]>([]);
    const [chipValues, setChipValues] = useState<IChip[]>([]);
    const [visibleInput, setVisibleInput] = useState<IFilterField[]>([]);


    const [filterModal, setFilterModal] = useState(false)

    useEffect(() => {
        let defaultValues: IInput[] = []
        if (useDate) {
            defaultValues = [{ field: 'startDate', value: getStringInputSubtract(15) }, { field: 'endDate', value: getDateString() }];
        }
        setInputValues([...inputValues, ...defaultValues])
        onButtonSearch(defaultValues)
    }, [])

    useEffect(() => {
        setVisibleInput(getLinesInputBySize(data)[0])
    }, [data])

    const onButtonSearch = (values?: IInput[]) => {
        const params = (values || inputValues)
        const list: IChip[] = (params).map(({ field, value }: IInput): IChip => {
            let item = data.find((i) => i.field == field);
            return { field, value, order: item?.order || 100, isFixed: item?.fixedChip || false }
        });
        setChipValues(list);
        if (values)
            setInputValues(values);
        onSearch([...params]);
    }

    const onChangeField = (field: string, value: string) => {
        const newInput = [...inputValues];
        let obj = newInput.find((p) => p.field == field);
        if (obj) {
            obj.value = value;
            setInputValues([...newInput]);
        } else {
            setInputValues([...newInput, { field, value }]);
        }
    }

    const onDeleteChip = (field: string): void => {
        const newInput = [...inputValues];
        const index = newInput.findIndex((p) => p.field == field);
        if (index > -1) {
            newInput.splice(index, 1);
        }
        onButtonSearch([...newInput]);

    }

    const getValueFromField = (item: IFilterField): string => {
        if (item.type == IFieldType.SELECT || item.type == IFieldType.AUTOCOMPLETE)
            return inputValues.find((p) => p.field == item.field)?.value || 'selectDefault-all';
        if (item.type == IFieldType.DATE || item.type == IFieldType.DATE_RANGE) {
            let value = inputValues.find((p) => p.field == item.field)?.value || '';
            return value;
        }
        return inputValues.find((p) => p.field == item.field)?.value || '';
    }

    const renderInput = (item: IFilterField) => (
        <InputField
            data={item}
            key={item.id}
            value={getValueFromField(item)}
            onChange={onChangeField}
        />
    )

    const renderSelect = (item: IFilterField) => (
        <SelectField
            key={item.id}
            data={item}
            value={getValueFromField(item)}
            onChange={onChangeField}
        />
    )

    // const renderRangeDate = (item: IFilterField) => (
    //     <RangeDate
    //         key={item.id}
    //         data={item}
    //         value={getValueFromField(item)}
    //         onChange={onChangeField} />
    // )

    const renderDatePicker = (item: IFilterField) => (
        <DatePicker
            key={item.id}
            data={item}
            value={getValueFromField(item) || '2022-06-13'}
            onChange={onChangeField}
        />
    )

    const renderAutocomplete = (item: IFilterField) => (
        <AutocompleteComp
            key={item.id}
            data={item}
            value={getValueFromField(item)}
            onChange={onChangeField}
        />
    )

    const renderFilterAdvanced = () => {
        let list = getLinesInputBySize(data);
        return list.map((l: IFilterField[], index: number) => renderFilter(l, index))
    }

    const renderFilter = (list: IFilterField[], id: number = 0) => (
        <Box key={id} sx={{ flex: 8, display: 'flex', marginBottom: 1 }}>
            {
                list.map((item: IFilterField) => {
                    if (item.type == IFieldType.INPUT)
                        return (renderInput(item))
                    if (item.type == IFieldType.SELECT)
                        return (renderSelect(item))
                    if (item.type == IFieldType.DATE)
                        return (renderDatePicker(item))
                    // if (item.type == IFieldType.DATE_RANGE)
                    //     return (renderRangeDate(item))
                    if (item.type == IFieldType.AUTOCOMPLETE)
                        return (renderAutocomplete(item))
                    if (item.type == IFieldType.RANGE)
                        return (renderInput(item))
                    if (item.type == IFieldType.SWITCH)
                        return (renderInput(item))
                })
            }
        </Box>
    )

    const renderAdvancedFilter = () => (
        <Box sx={{ height: '40vh', padding: 1 }}>
            <Stack spacing={1}>
                <Typography variant="h5" sx={{ textAlign: 'center' }} color="primary">{t('filter.titleAdvanced')}</Typography>
                <Divider />
                <Box sx={{ margin: '20px !important' }}>
                    {renderFilterAdvanced()}
                </Box>
            </Stack>
            <Stack >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button sx={{ width: '20vw' }} endIcon={<Search />}
                        onClick={() => {
                            onButtonSearch();
                            setFilterModal(false);
                        }} variant="contained" color="primary">{t('common.search')}</Button>
                </Box>
            </Stack>
        </Box>
    );

    return (
        <Stack spacing={1} sx={{ marginBottom: 1 }}>
            <Paper elevation={2}
                sx={{ height: 90, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 2, paddingRight: 2 }}>
                {renderFilter(visibleInput)}
                <Box sx={{ flex: 0.5, paddingLeft: 2 }}>
                    <Button startIcon={<FilterList />} onClick={() => setFilterModal(true)} variant="text" color="primary">{t('filter.title')}</Button>
                </Box>
                <Box sx={{ flex: 1, paddingLeft: 2 }}>
                    <Button endIcon={<Search />} onClick={() => { onButtonSearch() }} variant="contained" color="primary">{t('common.search')}</Button>
                </Box>
            </Paper>
            <Paper sx={{ bgcolor: 'transparent', backgroundImage: 'none', boxShadow: 'none' }}>
                <Grid container >
                    {chipValues.length > 0 && <Grid item xs={12}>
                        <Typography variant="caption">
                            {t('filter.title')}
                        </Typography>
                    </Grid>}
                    <ChipList
                        values={chipValues}
                        data={data}
                        handleDeleteChip={onDeleteChip}
                    />
                </Grid>
            </Paper>
            <Drawer
                anchor='top'
                open={filterModal}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                onClose={() => setFilterModal(false)}>
                {renderAdvancedFilter()}
            </Drawer>
        </Stack>
    );



}


export default FilterTable;