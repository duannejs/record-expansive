import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';

const TypographyCustom = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600, color: theme.palette.mode == 'dark' ? '#f0f0f0': '#555'
}));

export default function TypographyCustomization({ children, sx }: any) {
  return <TypographyCustom sx={{ ...sx }}>
    {children}
  </TypographyCustom>;
}