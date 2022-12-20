import { Skeleton } from "@mui/material"
import { Box } from "@mui/system"


const SkeletonCustom = () => {
    return (
        <Box sx={{ mt: 10, mb: 2, flexDirection: 'row', display: 'flex', flex: 1 }}>
            <Box sx={{ display: 'flex', flex: 3, flexDirection: 'column', m: 1, justifyContent: 'space-around' }} >
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
            </Box>
            <Box sx={{ display: 'flex', flex: 3, flexDirection: 'column', m: 1, justifyContent: 'space-around' }} >
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
                <Skeleton sx={{ flex: 3, m: 0.5 }} variant="text" />
            </Box>
        </Box>
    )
}

export default SkeletonCustom;