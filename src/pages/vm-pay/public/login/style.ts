import { styled } from '@mui/material/styles';
import { Grid, Card } from '@mui/material';


export const GridLogin = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#222431' : '#f9f9fA',
  minHeight: '100vh'
}));

export const CardLogo = styled(Card)(({ theme }) => ({
  borderRadius: '2rem',
  minHeight: '60vh',
  backgroundColor: '#1960AB',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column'
}));