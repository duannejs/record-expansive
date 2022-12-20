import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { Box, Divider, List, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { IOrderHistoryDetail } from "../../../../../../redux/ducks/pay/orderDetail/types";
import { getBgColor, getIcon } from "./dot";


interface IHistoryOrder {
    wallet: string;
    size: number;
    details: IOrderHistoryDetail[]
}


const HistoryOrder = ({ wallet, size, details }: IHistoryOrder) => {
    const { t } = useTranslation();

    const getItemMessage = (action: 'STEPS' | 'RESERVE' | 'STATUS' | 'COMMIT' | 'CALLBACK' | 'CONCILIADOR' | 'CANCEL' | 'TO_COMMIT'): string => {
        switch (action) {
            case 'STEPS':
                return `${t('history.steps')}`;
            case 'RESERVE':
                return `${t('history.reserve')}`;
            case 'STATUS':
                return `${t('history.status')}`;
            case 'COMMIT':
                return `${t('history.commit')}`;
            case 'CALLBACK':
                return `${t('history.callback')}`;
            case 'CONCILIADOR':
                return `${t('history.conciliador')}`;
            case 'CANCEL':
                return `${t('history.cancel')}`;
            case 'TO_COMMIT':
                return `${t('history.to_commit')}`;
            default:
                return '';
        }
    }


    const renderContentItem = (item: IOrderHistoryDetail, type: number) => (
        <Paper elevation={0}>
            <Typography variant="body1" sx={{ fontWeight: 600, paddingBottom: 0.5, fontSize: 14 }}>{`${getItemMessage(item.action)} [${item.status}]`}</Typography>
            <Typography variant="body2">
                {item.content}
            </Typography>
            <Typography sx={{ color: (theme) => theme.palette.mode == 'dark' ? '#aaa' : '#777' }} variant="body2">
                {`${moment(item.endDate).format('DD/MM/YYYY HH:mm:ss')}`} {type == 1 ? `[${moment(item.endDate).diff(moment(item.startDate), 'millisecond')} ms]` : ''}
            </Typography>
        </Paper >
    )


    const renderItemLef = (item: IOrderHistoryDetail) => {
        if ([1, 2].includes(item.operationType)) {
            return (
                <TimelineOppositeContent>
                    {renderContentItem(item, 0)}
                </TimelineOppositeContent>
            )
        }
        return '';
    }

    const renderItemRight = (item: IOrderHistoryDetail) => {
        if ([2, 3, 4, 5].includes(item.operationType)) {
            return (
                <TimelineContent sx={{ paddingBottom: 0.5 }}>
                    {renderContentItem(item, 1)}
                </TimelineContent>
            )
        }
        return <TimelineContent></TimelineContent>;
    }

    const getIconHistory = (action: 'STEPS' | 'RESERVE' | 'STATUS' | 'COMMIT' | 'CALLBACK' | 'CONCILIADOR' | 'CANCEL' | 'TO_COMMIT') => {
        return (
            <TimelineDot color={getBgColor(action)} >
                {getIcon(action)}
            </TimelineDot>
        )
    }



    const renderItem = (item: IOrderHistoryDetail, isLast: boolean) => {
        return (
            <TimelineItem key={item.sequence}>
                {renderItemLef(item)}
                <TimelineSeparator sx={{ paddingLeft: 1, paddingRight: 1 }}>
                    {getIconHistory(item.action)}
                    {isLast ? '' : <TimelineConnector />}
                </TimelineSeparator>
                {renderItemRight(item)}
            </TimelineItem>
        )

    }

    return (
        <Box sx={{ width: '60%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Typography>{t('history.PDV')}</Typography>
                <Typography>{t('history.application')}</Typography>
                <Typography>{`${t('history.walletApi')} [${wallet}]`}</Typography>
            </Box>
            <Divider />
            <Box sx={{ maxHeight: '52vh', overflow: 'auto' }}>
                <List>
                    <Timeline>
                        {details.map((i, index) => renderItem(i, (size == index)))}
                    </Timeline>
                </List>
            </Box>
        </Box>)
}

export default HistoryOrder;