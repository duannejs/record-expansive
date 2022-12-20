import { AttachMoney, Inbox, Info, Search, SearchOff, ShoppingCart } from "@mui/icons-material";
import { Box, List, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IOrderItems, IOrderPayment } from "../../../../../../redux/ducks/pay/orderDetail/types";
import { formatterMoney } from "../../../../../../utils/functions";
import ItemContainerGeneric from "./ItemContainer";


interface IPurchaseOrder {
    amount: number;
    paymentMethod: IOrderPayment;
    items: IOrderItems[];
}

const PurchaseOrder = ({ amount, items = [], paymentMethod = { label: '', value: 0, type: '' } }: IPurchaseOrder) => {

    const { t } = useTranslation();
    const [inputSearch, setInputSearch] = useState("");


    const renderItem = (i: IOrderItems) => (
        <ItemContainerGeneric key={i.sku}>
            <Box sx={{ display: 'flex', marginBottom: 1.5 }}>
                <Info color="action" sx={{ marginRight: 1 }} />
                <Typography sx={{ fontWeight: 'bold' }}>{i.description || t('purchase.itemDescr')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                <Typography>{`${t('purchase.qtde')}: ${i.quantity} ${i.unitType}`}</Typography>
                <Typography>{`${t('purchase.unitMoney')} ${t('common.money')} ${formatterMoney(i.unitValue)}`}</Typography>
            </Box>
            <Typography sx={{ marginBottom: 1.5 }}>{`SKU: ${i.sku}`}</Typography>
            <Typography sx={{ fontWeight: '600', textAlign: 'right' }} color="action">{`${t('purchase.total')} ${t('common.money')} ${formatterMoney(i.totalValue)}`}</Typography>
        </ItemContainerGeneric>
    )


    const renderListItems = (i: IOrderItems[]) => {
        const listFilter = i.filter((i) => {
            if (!inputSearch)
                return i;
            if ((i.description || '').includes(inputSearch) || (i.sku.toString().includes(inputSearch) || i.totalValue.toString().includes(inputSearch))) {
                return i
            }
        })
        if (i.length == 0)
            return boxEmpty();
        return (
            <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <ShoppingCart sx={{ marginRight: 2 }} />
                        <Typography>{t('purchase.purchaseItens')}</Typography>
                    </Box>
                    <Box>
                        <TextField
                            margin="none"
                            InputProps={{
                                startAdornment: <Search />
                            }}
                            size="small"
                            autoFocus
                            value={inputSearch}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputSearch(event.target.value)}
                            helperText=" "
                            label={t('purchase.searchBox')}
                        />
                    </Box>
                </Box>
                <Box sx={{ maxHeight: '32vh', overflow: 'auto' }}>
                    <List sx={{ display: 'flex', marginLeft: 0.5, justifyContent: 'start-flex', flexWrap: 'wrap' }}>
                        {listFilter.length > 0 && listFilter.map((i) => renderItem(i))}
                        {listFilter.length == 0 && boxNotFound()}
                    </List>
                </Box>
            </>)

    }


    const renderEmpty = (empty: boolean, msg: string) => (
        <Box sx={{ maxHeight: '32vh', overflow: 'auto' }}>
            <List>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    {empty ? <Inbox sx={{ fontSize: 90, opacity: 0.5 }} color="primary" /> :
                        <SearchOff sx={{ fontSize: 90, opacity: 0.5 }} color="primary" />}
                    <Typography variant="body2">
                        {msg}
                    </Typography>
                </Box>
            </List>
        </Box>
    )

    const boxEmpty = () => { return renderEmpty(true, t('purchase.emptyItems')) }

    const boxNotFound = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {renderEmpty(false, t('purchase.notFound'))}
            </Box>
        )
    }

    return (<Box sx={{ padding: 1 }}>
        <Paper sx={{ padding: 1 }} elevation={3}>
            <Box sx={{ display: 'flex', marginBottom: 1, justifyContent: 'space-around' }}>
                <Typography>
                    {`${t('purchase.typePayment')}: `}
                    <b>{`${paymentMethod.type || t('purchase.paymentTypeNotFound')}`}</b>
                </Typography>
                <Typography>{`${t('purchase.AmountPayment')} `}
                    <b>{`${t('common.money')} ${formatterMoney(amount)}`}</b>
                </Typography>
                <Typography>{`${t('purchase.totalItens')}: `}
                    <b>{`${items.length}`}</b>
                </Typography>
            </Box>
        </Paper>
        <Paper sx={{ padding: 2, marginTop: 2.5 }} elevation={2}>
            {renderListItems(items)}
        </Paper>
    </Box>)
}


export default PurchaseOrder;