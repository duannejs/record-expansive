import { Box } from "@mui/material";
import { styled } from "@mui/system";


export const BoxStyle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#222431' : '#f9f9fA',
    minHeight: '100vh'
}));
