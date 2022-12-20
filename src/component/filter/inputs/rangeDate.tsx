import TextField from '@mui/material/TextField';
import { IFilterInput } from '../types';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface IDateRange {
    dateStart: Date | null;
    dateEnd: Date | null;
}

/**
 * 
 * TODO: COMPONENTE IMCOMPLETO
 * 
 * como o componente RangeDate do MUI é recurso apenas pro será necessário criar um componente utilizando o DatePicker padrão
 * 
 * 
 * 
 * 
 * 
 */
const RangeDate = ({ data: { id, size, field, label, options }, value, onChange }: IFilterInput) => {

    const { t } = useTranslation();
    const [date, setDate] = useState<IDateRange>({ dateStart: moment().subtract(15, 'day').toDate(), dateEnd: moment().toDate() });

    const handleChange = (key: string, newValue: Date | null) => {
        let values = date;
        values[key as keyof IDateRange] = newValue;
        setDate({ ...values });
    };

    return (
        <LocalizationProvider  id={id} dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label={label}
                inputFormat="dd/MM/yyyy"
                value={date.dateStart}
                onChange={(newValue: Date | null) => handleChange('dateStart', newValue)}
                renderInput={(params) => <TextField sx={{ flex: size, m: 0.5 }} size="small" margin="none" {...params} />}
            />
            <DesktopDatePicker
                label={t('common.dateEnd')}
                inputFormat="dd/MM/yyyy"
                value={date.dateEnd}
                onChange={(newValue: Date | null) => handleChange('dateEnd', newValue)}
                renderInput={(params) => <TextField sx={{ flex: size, m: 0.5 }} size="small" margin="none" {...params} />}
            />
        </LocalizationProvider>
    );
}


// export default RangeDate