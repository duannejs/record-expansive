import { AttachMoney, CallReceived, Cancel, DensitySmall, Done, DoneAll, Grading, Schedule, Timer, TravelExplore, Undo, Verified, YoutubeSearchedFor } from "@mui/icons-material";

enum BgColorDot {
    STEPS = "grey",
    RESERVE = "primary",
    STATUS = "info",
    COMMIT = "success",
    CALLBACK = "secondary",
    CONCILIADOR = "warning",
    CANCEL = "error",
    TO_COMMIT = "grey"
}


const getBgColor = function (action: 'STEPS' | 'RESERVE' | 'STATUS' | 'COMMIT' | 'CALLBACK' | 'CONCILIADOR' | 'CANCEL' | 'TO_COMMIT'):
    'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' {
    return BgColorDot[action];
}

const getIcon = function (action: 'STEPS' | 'RESERVE' | 'STATUS' | 'COMMIT' | 'CALLBACK' | 'CONCILIADOR' | 'CANCEL' | 'TO_COMMIT') {
    switch (action) {
        case 'STEPS':
            return <DensitySmall />
        case 'RESERVE':
            return <AttachMoney />
        case 'STATUS':
            return <Schedule />
        case 'COMMIT':
            return <DoneAll />
        case 'CALLBACK':
            return <CallReceived />
        case 'CANCEL':
            return <Cancel />
        case 'CONCILIADOR':
            return <Timer />
        case 'TO_COMMIT':
            return <Done />
    }

}

export { getBgColor, getIcon }