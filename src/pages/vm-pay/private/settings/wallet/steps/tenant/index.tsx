import { AccessTime, AvTimer, CreditCard } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { putWalletTenant } from "../../../../../../../redux/ducks/pay/walletDetail/actions"
import { IWalletTenant } from "../../../../../../../redux/ducks/pay/walletDetail/types"

interface IDataState {
    timeout: number;
    interval: number;
    codFinalizadora: number;
}

interface IStepTenant {
    tenant: IWalletTenant;
    children?: any;
    permission: number[];
    updateValues: boolean;
    checkValues(valid: boolean, update: boolean): void;
}

const StepTenant = ({ tenant, children, permission = [], updateValues, checkValues }: IStepTenant) => {

    const [data, setData] = useState({ wallet: tenant.wallet, timeout: tenant.timeout, interval: tenant.interval, codFinalizadora: tenant.codFinalizadora } as IDataState);
    const [hasPermission, setHasPermission] = useState(!permission.find((p) => p == 4003));

    const { t } = useTranslation();
    const dispatch = useDispatch();


    useEffect(() => {
        if (updateValues) {
            dispatch(putWalletTenant(data))
        }
    }, [updateValues])

    useEffect(() => {
        validationValues(tenant, data);
    }, [tenant, data])


    const validationValues = function (origin: IWalletTenant, custom: IDataState) {
        if (!custom.codFinalizadora || !custom.interval || !custom.timeout) {
            checkValues(false, false);
            return;
        }
        let updated = compareObjKeyValue(custom, origin);
        checkValues(true, updated);
    }

    const compareObjKeyValue = function (from: IDataState, to: IWalletTenant) {
        return Object.keys(from).map((key: string) => {
            return (from[key as keyof IDataState] == to[key as keyof IWalletTenant]);
        }).includes(false);
    }

    return (
        <Fragment>
            <FormControl
                disabled={true}
                sx={{ mt: 10, mb: 1, pl: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextField
                    margin="none"
                    size="small"
                    autoFocus
                    disabled={hasPermission}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccessTime />
                            </InputAdornment>)
                    }}
                    value={data.timeout}
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, timeout: Number(event.target.value) })}
                    helperText={t('wallet.steps.tenant.time')}
                    label={t('wallet.steps.tenant.timeDescription')}
                />

                <TextField
                    margin="none"
                    size="small"
                    disabled={hasPermission}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AvTimer />
                            </InputAdornment>)
                    }}
                    value={data.interval}
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, interval: Number(event.target.value) })}
                    helperText={t('wallet.steps.tenant.interval')}
                    label={t('wallet.steps.tenant.intervalDescription')}
                />

                <TextField
                    margin="none"
                    size="small"
                    disabled={hasPermission}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CreditCard />
                            </InputAdornment>)
                    }}
                    value={data.codFinalizadora}
                    type="number"
                    helperText={t('wallet.steps.tenant.finalizadora')}
                    label={t('wallet.steps.tenant.finalizadoraDescription')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, codFinalizadora: Number(event.target.value) })}

                />
            </FormControl>
            {children}
        </Fragment>)
}

export default StepTenant;