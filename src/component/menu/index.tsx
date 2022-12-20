import { Box, Toolbar, ListItemButton, ListItemIcon, Tooltip, ListItemText, Divider, Typography } from '@mui/material'
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
    KeyboardArrowDown, Dashboard, SettingsApplications, AccountBalanceWallet, PointOfSale, Sell, Receipt
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IMenu, IMenuItems } from './config';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/IAppStore';
import { useNavigate } from "react-router-dom";
import { SessionLogout } from '../../redux/ducks/auth/token/actions';
import { stateStorage } from '../../service/api/apiRoutes';
interface IMenuProps {
    isOpen: boolean;
}


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const menuOptions: IMenu[] = [
    {
        id: 1, label: 'menu.dashboard.label', description: 'menu.dashboard.description', open: true, items: [
            { id: 100, icon: <Dashboard />, link: "vm-pay/private/home", label: 'menu.dashboard.general', isActive: true, permission: 0 },
        ]
    },
    {
        id: 2, label: 'menu.report.label', description: 'menu.report.description', open: true, items: [
            { id: 200, icon: <Receipt />, link: "vm-pay/private/report", label: 'menu.report.general', isActive: false, permission: 4009 }
        ]
    },
    // {
    //     id: 3, label: 'menu.configuration.label', description: 'menu.configuration.description', open: true, items: [
    //         { id: 400, icon: <AccountBalanceWallet />, label: 'Sair', link: "vm-pay/private/report" , isActive: false, permission: 4002 },
    //       //  { id: 401, icon: <SettingsApplications />, label: 'menu.configuration.settings', link: "vm-pay/private/settings/configuration", isActive: false, permission: 4010 },
    //     ]
    // },
    // {
    //     id: 4, label: 'menu.configuration.label', description: 'menu.configuration.description', open: true, items: [
    //         { id: 400, icon: <AccountBalanceWallet />, label: 'menu.configuration.wallet', link: "vm-pay/private/settings/wallet", isActive: false, permission: 4002 },
    //         { id: 401, icon: <SettingsApplications />, label: 'menu.configuration.settings', link: "vm-pay/private/settings/configuration", isActive: false, permission: 4010 },
    //     ]
    // },
];

function cloneMenu() {
    let aux_menu: IMenu[] = [];
    for (let i = 0; i < menuOptions.length; i++) {
        aux_menu.push({
            id: menuOptions[i].id,
            description: menuOptions[i].description,
            label: menuOptions[i].label,
            open: menuOptions[i].open,
            items: menuOptions[i].items.map(a => { return { ...a } })
        })
    }
    return aux_menu;
}

const Menu = ({ isOpen }: IMenuProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { profile } = useSelector((app: AppStore) => app);
    const [menuGeneral, setMenuGeneral] = useState<IMenu[]>([]);

    useEffect(() => {
        if (profile.isValidUser) {
            let aux_menu = cloneMenu();
            aux_menu = aux_menu.filter((menu: IMenu) => {
                let permissions = menu.items.map((i: IMenuItems) => i.permission);
                const isInclude = true//!profile.user.permissions.every(item => {
                    //return menu;
                //});
                if (isInclude)
                    return menu;
            });
            aux_menu.forEach((menu: IMenu) => {
                menu.items = menu.items.filter((i: IMenuItems) => {
                    // if (profile.userInfo.permissions.includes(i.permission) || i.permission === 0)
                        return i;
                })
            });           
            setMenuGeneral(aux_menu)
        } else {
            setMenuGeneral([])
        }
    }, [profile.user]);

    const setMenuVisible = (menuId: number, value: boolean) => {
        const aux_menu = [...menuGeneral];
        const index = aux_menu.findIndex((menu: IMenu) => menu.id === menuId);
        if (index < 0)
            return;
        aux_menu[index].open = value;
        setMenuGeneral(aux_menu);
    }

    const setItemActive = (itemId: number, menuId: number, link: string) => {
        const aux_menu = [...menuGeneral];

        aux_menu.forEach((menu: IMenu) => {
            if (menu.id === menuId) {
                menu.items.forEach((item: IMenuItems) => {
                    if (item.id == itemId) {
                        item.isActive = true;
                    } else {
                        item.isActive = false;
                    }
                });
            } else {
                menu.items.forEach((item: IMenuItems) => item.isActive = false);
            }
        });
        setMenuGeneral(aux_menu);
        navigate(link, { replace: true });
    }


    const RenderLine = (items: IMenuItems[], menuId: number) => {
        return items.map((item: IMenuItems, index: number) => (
            <Tooltip key={item.id} title={!isOpen ? t(item.label) : ''} arrow placement="right">
                <ListItemButton
                    selected={item.isActive}
                    onClick={() => setItemActive(item.id, menuId, item.link)}
                    sx={(theme) => ({ py: 0, minHeight: 32, color: item.isActive ? '#36cf' : theme.palette.mode === 'dark' ? '#BBB' : 'rgba(0,0,0,0.5)' })}>
                    <ListItemIcon sx={{ color: 'inherit', p: 0.5 }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={t(item.label)}
                        sx={{ opacity: isOpen ? 1 : 0 }}
                        primaryTypographyProps={{ fontSize: 14, fontWeight: item.isActive ? 'bold' : 'medium', color: 'inherit' }}
                    />
                </ListItemButton>
            </Tooltip>
        ))
    }

    const RenderMenuItem = (items: IMenuItems[], menuId: number, menuOpen: boolean) => {
        if (!isOpen || menuOpen) {
            return <Box>
                {!isOpen && <Divider />}
                {RenderLine(items, menuId)}
            </Box >
        }
    }

    const RenderMenu = () => (
        menuGeneral.map((menu: IMenu, index: number) =>
            <Box
                key={menu.id}
                sx={(theme) => ({
                    bgcolor: menu.open ? theme.palette.mode === 'dark' ? '#222431' : '#fafafa' : null,
                    pb: menu.open ? 2 : 0,
                })}
            >
                {isOpen &&
                    <ListItemButton
                        alignItems="flex-start"
                        onClick={() => setMenuVisible(menu.id, !menu.open)}
                        sx={{
                            px: 3,
                            pt: 2.5,
                            pb: menu.open ? 0 : 2.5,
                            '&:hover, &:focus': { '& svg': { opacity: menu.open ? 1 : 0 } },
                        }}
                    >
                        <ListItemText
                            primary={t(menu.label)}
                            primaryTypographyProps={{
                                fontSize: 15,
                                fontWeight: 'medium',
                                lineHeight: '20px',
                                mb: '2px',
                            }}
                            secondary={
                                <Typography
                                    noWrap fontSize={12} lineHeight={'16px'}
                                    sx={(theme) => ({
                                        my: 0,
                                        color: menu.open ? 'transparent' : theme.palette.mode == 'dark' ? '#ccc' : 'rgba(7,7,7,0.7)',
                                    })}>
                                    {t(menu.description)}
                                </Typography>}
                            sx={{ my: 0 }}
                        />
                        <KeyboardArrowDown
                            sx={{
                                mr: -1,
                                opacity: 0,
                                transform: menu.open ? 'rotate(-180deg)' : 'rotate(0)',
                                transition: '0.2s',
                            }}
                        />
                    </ListItemButton>}
                {RenderMenuItem(menu.items, menu.id, menu.open)}
            </Box>
        )
    )

    return (
        <Drawer
            variant="permanent"
            open={isOpen}>
            <Toolbar />
            <Box sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
                {RenderMenu()}
            </Box>
        </Drawer>
    );
}

export default Menu;

function Logout(): any {
    stateStorage.logout();
}
