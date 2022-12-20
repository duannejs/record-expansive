import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

const BoxCustom = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#222431' : '#f9f9f9',
}));

export default function BoxCustomization({ children, sx }: any) {
  return <BoxCustom sx={{ ...sx }}>
    {children}
  </BoxCustom>;
}