import { AccessTime, AvTimer, CreditCard, DeleteOutlineOutlined, Storefront, VpnKey } from "@mui/icons-material"
import { Button, IconButton, InputAdornment, List, ListItem, TextField } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import { Box } from "@mui/system"
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { IWalletStores } from "../../../../../../../redux/ducks/pay/walletDetail/types"
import { deleteWalletStore, putWalletStore } from "../../../../../../../redux/ducks/pay/walletDetail/actions";

interface IStepStore {
    tenantId: string;
    updateValues: boolean;
    permission: number[];
    stores?: IWalletStores[];
    checkValues(valid: boolean, update: boolean): void;
}

const StepStore = ({ tenantId, stores = [], permission=[], updateValues, checkValues }: IStepStore) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [listStore, setListStore] = useState<IWalletStores[]>([...stores]);
    const [hasPermission, setHasPermission] = useState(!permission.find((p) => p == 4004));

    useEffect(() => {
        if (updateValues) {
            dispatch(putWalletStore({ tenantId, stores: listStore }))
        }
    }, [updateValues])

    useEffect(() => {
        validationValues(stores, listStore);
    }, [stores, listStore])


    const validStoreDuplicated = (store: IWalletStores, list: IWalletStores[]): boolean => {
        return list.find((l) => (l.id != store.id && l.store == store.store)) ? true : false;
    }

    const validationValues = function (origin: IWalletStores[], custom: IWalletStores[]) {
        let valid = custom.every((s) => (s.store == '' || s.store == '0') ? false : true);

        let duplicated = custom.every((store: IWalletStores) =>
            !validStoreDuplicated(store, custom))

        if (!valid || !duplicated) {
            checkValues(false, false);
            return;
        }

        let customToOrigin = compareObjKeyValue(custom, origin);


        let originToCustom = compareObjKeyValue(origin, custom);

        checkValues(valid, customToOrigin || originToCustom);
    }

    const compareObjKeyValue = function (from: IWalletStores[], to: IWalletStores[]) {
        return !from.every((s) => {
            return to.find((o) => {
                if (o.id == s.id)
                    return o.value = s.value
            });
        });
    }

    const onChangeField = (store: IWalletStores, value: string, field: string) => {
        let stores = [...listStore];
        let storeField = stores.find((v) => v.id == store.id);
        if (storeField)
            storeField[field as keyof IWalletStores] = value;
        setListStore(stores);
    }

    const removeStore = (store: IWalletStores, index: number) => {
        if (store.tenantId) {
            dispatch(deleteWalletStore({ tenantId, storeId: store.store }))
        }
        let list = [...listStore];
        list.splice(index, 1);
        setListStore(list)

    }

    const addStore = () => {
        setListStore([...listStore, { id: uuidv4(), tenantId: '', userId: '', updateAt: '', status: 'ACTIVE', store: '', value: '' }])
    }

    const adornment = (children: any) => {
        return {
            startAdornment: (
                <InputAdornment position="start">
                    {children}
                </InputAdornment>)
        }
    }

    const renderStore = (store: IWalletStores, index: number) => {
        return (
            <ListItem
                key={store.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="remove">
                        <DeleteOutlineOutlined color="error" onClick={() => removeStore(store, index)} />
                    </IconButton>
                }>
                <TextField
                    sx={{ flex: 1, m: 0.2 }}
                    margin="none"
                    size="small"
                    type="number"
                    disabled={hasPermission || store.tenantId ? true : false}
                    InputProps={adornment(<Storefront />)}
                    error={validStoreDuplicated(store, listStore)}
                    // helperText={validStoreDuplicated(store, listStore)? t('wallet.steps.store.duplicated'): ' '}
                    value={store.store}
                    label={t('wallet.steps.store.titleStoreId')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(store, event.target.value, 'store')}
                />

                <TextField
                    sx={{ flex: 3, m: 0.2 }}
                    margin="none"
                    // error={validStoreDuplicated(store, listStore)}
                    // helperText={' '}
                    size="small"
                    InputProps={adornment(<VpnKey />)}
                    disabled={hasPermission}
                    value={store.value}
                    label={t('wallet.steps.store.titleKey')}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeField(store, event.target.value, 'value')}
                />
            </ListItem>
        )
    }

    const RenderListStore = () => (
        <Box sx={{ flex: 3.5, overflow: 'auto' }}>
            <List dense sx={{ height: '35vh', maxHeight: '35vh', overflow: 'auto', pt: 0 }}>
                {/* <ListSubheader sx={{ padding: 0, bgColor: 'background.paper', zIndex: 2 }}>{t('wallet.steps.store.listStore')}</ListSubheader> */}
                {listStore.map((store, index) => renderStore(store, index))}
            </List>
        </Box>
    )

    return (
        <Fragment>
            <Box sx={{ mb: 1, pl: 5, pr: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {RenderListStore()}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button onClick={addStore} sx={{ ml: 20, mr: 20, flex: 1 }}
                    variant="outlined" size="large"
                    disabled={listStore.find((store) => store.store == '0' || store.store == '') ? true : false}
                >
                    {t('wallet.steps.store.add')}
                </Button>
            </Box>
        </Fragment>)
}

export default StepStore;