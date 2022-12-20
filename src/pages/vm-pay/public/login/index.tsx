import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardLogo, GridLogin } from './style'
import { CardMedia, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SessionUser } from '../../../../redux/ducks/auth/token/actions';
import { AppStore } from '../../../../redux/IAppStore';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((app: AppStore) => app);
    const [formLogin, setFormLogin] = useState({ username: '', password: '' });


    useEffect(() => {       
        if (token.isValidUser) {
            console.log('useeffect login home')
            navigate('/vm-pay/private/home', { replace: true })
        }
    }, [token]);

    const LoginAction = () => {
        const data = { ...formLogin }
        setFormLogin({ ...formLogin });
        dispatch(SessionUser(data.username, data.password))
    }

    const RenderCardLogo = () => (
        <Grid item xs={2.5} style={{ zIndex: 2 }}>
            <CardLogo>
                <CardMedia
                    component="img"
                    image="/img/vmix.svg"
                    alt="vm-pay-log"
                />
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="h6"
                    textAlign="center"
                    color="white">
                    {t('vmpay.subtitle')}
                </Typography>
            </CardLogo>
        </Grid>
    )

    const RenderCardLogin = () => (
        <Grid item xs={4}>
            <Card style={{ minHeight: '57vh', marginLeft: -20, paddingLeft: 55, paddingRight: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                    <Typography align='center' variant="h5" color="text.secondary">
                        {t('loginPage.accessTitle')}
                    </Typography>
                    <form onSubmit={(event) => { LoginAction(); event.preventDefault(); }} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ pr: 3, pl: 3, pt: 6, pb: 4, display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                margin="none"
                                size="small"
                                autoFocus
                                disabled={token.loading}
                                error={token.error}
                                value={formLogin.username}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormLogin({ ...formLogin, username: event.target.value })}
                                helperText=" "
                                label={t('loginPage.username')}
                            />
                            <TextField
                                margin="none"
                                type="password"
                                size="small"
                                disabled={token.loading}
                                error={token.error}
                                value={formLogin.password}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFormLogin({ ...formLogin, password: event.target.value })}
                                helperText=" "
                                label={t('loginPage.password')}
                            />
                        </Box>
                        <LoadingButton loading={token.loading } loadingPosition='center' variant="contained" type="submit"
                            disabled={!formLogin.username || !formLogin.password} size="large">{t('common.enter')}</LoadingButton>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )


    return (
        <GridLogin
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center">
            {RenderCardLogo()}
            {RenderCardLogin()}
        </GridLogin>
    )
}

export default Login;