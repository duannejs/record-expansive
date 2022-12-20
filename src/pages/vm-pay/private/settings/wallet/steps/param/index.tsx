import { Box, List, ListItem, Stack, Switch, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { putWalletParam } from "../../../../../../../redux/ducks/pay/walletDetail/actions";
import { IWalletParams, IWalletParamsProps } from "../../../../../../../redux/ducks/pay/walletDetail/types";


interface IStepParam {
    tenantId: string;
    updateValues: boolean;
    params?: IWalletParams[];
    permission?: number[];
    paramsConfig?: IWalletParamsProps[];
    checkValues(valid: boolean, update: boolean): void;
}

const StepParam = ({ tenantId, updateValues, permission = [], paramsConfig, params = [], checkValues }: IStepParam) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [listParam, setListParam] = useState<IWalletParamsProps[]>([]);
    const [hasPermission, setHasPermission] = useState(!permission.find((p) => p == 4005));

    useEffect(() => {
        if (paramsConfig) {
            if (params) {
                paramsConfig.forEach((param) => {
                    let p = params.find((pp) => pp.key == param.paramName);
                    param.defaultValue = p?.value || param.defaultValue;
                })
            }
            setListParam(paramsConfig);
        }

    }, [paramsConfig, params]);


    useEffect(() => {
        validationValues(params || [], listParam);
    }, [params, listParam])

    useEffect(() => {
        if (updateValues) {
            dispatch(putWalletParam({ tenantId, params: listParam }));
        }
    }, [updateValues]);

    const validationValues = function (origin: IWalletParams[], list: IWalletParamsProps[]) {
        const valid = list.every((l) => l.defaultValue ? true : false);
        if (!valid) {
            checkValues(false, false);
            return;
        }

        const updated = list.every((l) => {
            const o = origin.find((o) => o.key == l.paramName);
            if (o) {
                return o.value == l.defaultValue;
            }
            return false;
        })
        checkValues(valid, !updated);
    }


    const onChangeField = (param: IWalletParamsProps, value: string) => {
        const list = [...listParam];
        let p = list.find((l) => l.paramName == param.paramName);
        if (p)
            p.defaultValue = value;
        setListParam(list);
    }

    const onChangeSwitch = (param: IWalletParamsProps, checked: boolean) => {
        onChangeField(param, checked ? 'YES' : 'NO')
    }

    const renderParam = (param: IWalletParamsProps) => {
        return (
            <ListItem
                key={param.paramName}>
                <TextField
                    sx={{ flex: 1, m: 0.5 }}
                    margin="none"
                    size="small"
                    disabled
                    value={param.paramName}
                    label={t('wallet.steps.param.paramName')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(param, event.target.value)}
                />
                {param.fieldType === 'BOOLEAN' &&
                    <Box sx={{ flex: 3, display: 'flex', m: 0.5, justifyContent: 'center' }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>{t('wallet.steps.param.no')}</Typography>
                            <Switch
                                disabled={hasPermission}
                                checked={param.defaultValue == 'YES'}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSwitch(param, event.target.checked)}
                                size="medium"
                            />
                            <Typography>{t('wallet.steps.param.yes')}</Typography>
                        </Stack>
                    </Box>
                }
                {param.fieldType != 'BOOLEAN' &&
                    <TextField
                        sx={{ flex: 3, m: 0.5 }}
                        margin="none"
                        disabled={hasPermission}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        size="small"
                        type={param.fieldType == 'NUMBER' ? 'number' : 'text'}
                        value={param.defaultValue}
                        label={param.description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(param, event.target.value)}
                    />
                }
            </ListItem>
        )
    }


    const RenderListParam = () => (
        <Box sx={{ flex: 3.5, overflow: 'auto' }}>
            <List dense sx={{ height: '35vh', maxHeight: '35vh', overflow: 'auto', pt: 0 }}>
                {listParam.map((param, index) => renderParam(param))}
            </List>
        </Box>
    )

    return (
        <Fragment>
            <Box sx={{ mb: 1, pl: 5, pr: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {RenderListParam()}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            </Box>
        </Fragment>
    )
}


export default StepParam;