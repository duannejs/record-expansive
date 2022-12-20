import { Info } from "@mui/icons-material";
import { Box, List, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IOrderCBC, IOrderCBCContract, IOrderCBCCustomer, IOrderCBCParcel } from "../../../../../../redux/ducks/pay/orderDetail/types";
import { formatterDateWithoutHour, formatterMoney } from "../../../../../../utils/functions";
import ItemContainerGeneric from "./ItemContainer";



interface ICbcDetails {
    cbc: IOrderCBC
}


const CbcDetails = ({ cbc }: ICbcDetails) => {

    const { t } = useTranslation();



    const renderContract = (contract: IOrderCBCContract, customer: IOrderCBCCustomer) => (
        <Box>
            <Box sx={{ display: 'flex', marginBottom: 1.2, justifyContent: 'space-evenly' }}>
                <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.contractNumber')}: ${contract.contractId}`}</Typography>
                <Typography>{`${t('cbc.transactionNumber')}: ${contract.transactionId}`}</Typography>
                <Typography>{`${t('cbc.nsu')}: ${contract.nsu}`}</Typography>
                <Typography>{`${t('cbc.barcode')}: ${contract.barCode}`}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.purchaseId')}: ${contract.sellIdentifier}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: 0.8, justifyContent: 'space-evenly' }}>
                <Typography>{`${t('cbc.name')}: ${customer.name}`}</Typography>
                <Typography>{`${t('cbc.document')}: ${customer.identification}`}</Typography>
            </Box>
            <Box sx={{ display: 'flex', marginBottom: 0.8, justifyContent: 'space-evenly' }}>
                <Typography>{`${t('cbc.value')}:  ${t('common.money')} ${formatterMoney(contract.value)}`}</Typography>
                <Typography>{`${t('cbc.totalParcel')}: ${contract.qtdeParcel}`}</Typography>
                <Typography>{`${t('cbc.tax')}:  ${t('common.money')} ${formatterMoney(contract.fee)}`}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.total')}:  ${t('common.money')} ${formatterMoney(contract.amount)}`}</Typography>
            </Box>
        </Box>
    )

    const getColorByStatus = (v: string) => {
        switch (v) {
            case 'ACTIVE':
                return '#2196f3';
            case 'CANCELED':
                return '#e91e63';
            default:
                return '#555'
        }
    }

    const renderItems = (parcel: IOrderCBCParcel[]) => {

        return parcel.map((item) => (
            <ItemContainerGeneric key={item.barCode}>
                <Box sx={{ display: 'flex', marginBottom: 1.2, justifyContent: 'space-between' }}>
                    {/* <Info color="action" sx={{ marginRight: 1 }} /> */}
                    <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.parcelNumber')}: ${item.parcelNumber}`}</Typography>
                    <Typography>{`${t('cbc.endDate')}: ${formatterDateWithoutHour(item.dueDate)}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0.8 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.barcode')}: ${item.barCode}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0.8 }}>
                    <Typography>{`${t('cbc.tax')}: ${t('common.money')} ${formatterMoney(item.fee)}`}</Typography>
                    <Typography>{`${t('cbc.multa')}: ${t('common.money')} ${formatterMoney(item.multa)}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1.2 }}>
                    <Typography>{`${t('cbc.value')}: ${t('common.money')} ${formatterMoney(item.value)}`}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{`${t('cbc.total')}: ${t('common.money')} ${formatterMoney(item.amount)}`}</Typography>
                </Box>
                <Typography sx={{ bgcolor: getColorByStatus(item.status), width: '100%', color: '#fff', textAlign: 'center' }}>
                    {t(`cbc.status.${(item.status)}`)}
                </Typography>
            </ItemContainerGeneric>))
    }


    return (
        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Paper sx={{ padding: 1 }} elevation={3}>
                {renderContract(cbc.contract, cbc.customer)}
            </Paper>
            <Paper sx={{ padding: 2, marginTop: 2.5 }} elevation={2}>
                <Box sx={{ maxHeight: '32vh', overflow: 'auto' }}>
                    <List sx={{ display: 'flex', justifyContent: 'start-flex', marginLeft: 0.5, flexWrap: 'wrap' }}>
                        {renderItems(cbc.contract.parcels)}
                    </List>
                </Box>
            </Paper>
        </Box>
    )
}


export default CbcDetails;