import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/x-data-grid';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ThemeProvider } from '@mui/material';
import { AppStore } from '../redux/IAppStore';
import { frFR as CalendarPtBr } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';

const Theme = ({ children }: any) => {

  const { webConfig } = useSelector((app: AppStore) => app);



  const defaultValues = { primary: { main: '#3366cc' }, }
  const backgroundValues = { primary: { main: '#2196f3' }, background: { paper: '#34384b', box: '#34384b' }, }


  const themeMaterial = createTheme(
    {
      palette: {
        mode: webConfig.mode,
        ...(webConfig.mode == 'light' ?
          defaultValues : {...defaultValues, ...backgroundValues})
      },
    },
    CalendarPtBr,
    ptBR,
    corePtBR,
  );

  return (

    <ThemeProvider theme={themeMaterial}>
      {children}
    </ThemeProvider>
  )
}


export default Theme;