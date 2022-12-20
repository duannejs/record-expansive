import React, { useEffect, useState } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import Header from '../../../../component/header';
import Menu from '../../../../component/menu';
import { useNavigate, useRoutes } from 'react-router-dom';
import Wallet from '../settings/wallet';
import Configuration from '../settings/configuration';
import Transaction from '../payments/transaction';
import Dashboard from '../dashboard';
import Report from '../report/index';
import NotFound from '../notFound';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/IAppStore';
import { BoxStyle } from './style';


const LocalRoutes = () => {
    const routes = useRoutes([
        { path: 'vm-pay/private/home', caseSensitive: false, element: <Dashboard /> },
        { path: 'vm-pay/private/report', caseSensitive: false, element: <Report /> },
        { path: 'vm-pay/private/payments/transaction', caseSensitive: false, element: <Transaction /> },
        { path: 'vm-pay/private/settings/wallet', caseSensitive: false, element: <Wallet /> },
        { path: 'vm-pay/private/settings/configuration', caseSensitive: false, element: <Configuration /> },
        { path: 'vm-pay/private/*', caseSensitive: false, element: <NotFound /> },

    ]);
    return routes;
};

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const navigate = useNavigate();
    const { profile } = useSelector((app: AppStore) => app);

    useEffect(()=>{       
    },[])

    useEffect(() => {
        if (!profile) {
            navigate('vm-pay/private/login', { replace: true });
        }
    }, [profile, navigate])


    const RenderContent = () => (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <LocalRoutes />
        </Box>
    )

    return (
        <BoxStyle>
            <Header isOpen={menuOpen} handleIsOpen={(value) => setMenuOpen(value)} />
            <Box sx={{ display: "flex" }}>
                <Menu isOpen={menuOpen} />
                {RenderContent()}
            </Box>

        </BoxStyle>
    )
}

export default Home;