import { Close } from "@mui/icons-material";
import { Box, Button, Divider, List, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getColorByStatus, IOrder } from "../../../../../../redux/ducks/pay/order/types"
import { GetOrderDetail } from "../../../../../../redux/ducks/pay/orderDetail/actions";
import { AppStore } from "../../../../../../redux/IAppStore";
import BoxCustomization from "../../../../../../styles/box";
import TypographyCustomization from "../../../../../../styles/typography";
import { formatterDate, formatterMoney, padStart } from "../../../../../../utils/functions";
import CbcDetails from "./cbc";
import HistoryOrder from "./history";
import PurchaseOrder from "./purchase";

interface ITransactionDetail {
    order: IOrder;
    handleClose(): void;
}

const TransactionDetail = ({ order, handleClose }: ITransactionDetail) => {

    const [tabProp, setTabProp] = useState<number>(0);
    const { orderDetail } = useSelector((app: AppStore) => app)
    const dispatch = useDispatch();
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(GetOrderDetail(order.id));
    }, [order])



    const renderLabel = (title: string, value: string | number) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row' }} key={title}>
                <Typography sx={{ paddingRight: 2 }}>{title}:</Typography>
                <TypographyCustomization>{value}</TypographyCustomization>
            </Box>
        )
    }

    const renderStatus = (title: string, value: string) => (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ paddingRight: 1 }}>{title}:</Typography>
            <TypographyCustomization sx={{ bgcolor: getColorByStatus(value), color: '#fff', fontWeight: 400, textAlign: 'center', paddingLeft: 2, paddingRight: 2 }}>
                {t(`status.${(value)}`)}
            </TypographyCustomization>
        </Box>
    )


    const renderHeader = () => (
        <Paper sx={{ padding: 1.5, display: 'flex', flexDirection: 'row' }}>
            <Stack sx={{ flexGrow: 8 }} spacing={1}>
                <Typography variant="subtitle2" color="primary">{`ID: ${order?.id}`}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {renderLabel(t('order.wallet'), order.wallet)}
                    {renderLabel(t('order.store'), padStart(order.storeId))}
                    {renderLabel(t('order.pos'), padStart(order.pos))}
                    {renderLabel(t('order.coupon'), padStart(order.coupon))}
                    {renderLabel(t('order.date'), formatterDate(order.date.toString()))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {renderLabel(t('order.identifier'), order?.identifier)}
                    {renderLabel(t('order.total'), `${t('common.money')} ${formatterMoney(order.value)}`)}
                    {renderStatus(t('order.status'), order.status)}
                </Box>
            </Stack>
            <Box>
                <Button onClick={handleClose} sx={{ borderRadius: 100 }} variant="text">
                    <Close color="action" />
                </Button>
            </Box>
        </Paper>
    )

    const renderTab = () => {
        switch (tabProp) {
            case 0:
                return <HistoryOrder
                    wallet={orderDetail.data.order.wallet}
                    size={orderDetail.data.history.details.length - 1}
                    details={orderDetail.data.history.details} />
            case 1:
                return <PurchaseOrder
                    amount={orderDetail.data.order.value}
                    paymentMethod={orderDetail.data.paymentMethod || {}}
                    items={orderDetail.data.items || []}
                />
            case 2:
                return <CbcDetails 
                cbc={orderDetail.data.cbc}
                />
            default:
                return ''
        }
    }


    const renderTabControl = () => {
        if (orderDetail.loading || orderDetail.data.order.id == '') {
            //TODO: render loading
            return '';
        }
        return <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
            <Paper >
                <Box sx={{ borderColor: 'divider' }}>
                    <Tabs sx={{ paddingBottom: 2 }} value={tabProp} onChange={(ev, value) => { setTabProp(value) }}>
                        <Tab label={t('history.title')} value={0} />
                        <Tab label={t('purchase.title')} value={1} />
                        {orderDetail.data.order.wallet == 'PARCELE_PAG' && <Tab label={t('cbc.title')} value={2} />}
                    </Tabs>
                    <Box sx={{ paddingBottom: 2 }}>
                        {renderTab()}
                    </Box>
                </Box>
            </Paper>
        </Box>
    }

    return (
        <BoxCustomization sx={{ height: '85vh' }}>
            <Stack spacing={1.5}>
                {renderHeader()}
                {renderTabControl()}
            </Stack>
        </BoxCustomization >
    )

}


export default TransactionDetail