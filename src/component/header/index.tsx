import { AppBar, Box, CardMedia, Container, IconButton, Popover, Toolbar, Tooltip } from "@mui/material";
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/IAppStore";
import { useState } from "react";
import ProfilePopover from "../profile";
import AvatarCustom from "../avatar";

interface IHeaderProps {
    isOpen: boolean;
    handleIsOpen(value: boolean): void;
}

const Header = ({ isOpen, handleIsOpen }: IHeaderProps) => {

    const { t } = useTranslation();
    const { token } = useSelector((app: AppStore) => app);
    const [anchorProfile, setAnchorProfile] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorProfile(event.currentTarget);
    };

    return (
        <AppBar color="inherit" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container style={{ minWidth: '100vw' }}>
                <Toolbar disableGutters>
                    <Tooltip title={t('homePage.menuTooltip')}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            onClick={() => handleIsOpen(!isOpen)}
                            aria-label={t('homePage.menuTooltip')}
                            sx={{ mr: 3 }}>
                            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Tooltip>
                    <CardMedia
                        component="img"
                        sx={{ width: '8vw' }}
                        image="/img/vmix.jpg"
                        alt="vm-pay-log"
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={t('homePage.userTooltip')}>
                            <IconButton onClick={handleClick} sx={{ p: 0 }}>
                                <AvatarCustom value={token.user.name} size={40} />
                            </IconButton>
                        </Tooltip>
                        { <ProfilePopover
                            profile={token.user.name}
                            isOpen={Boolean(anchorProfile)}
                            handleAnchor={anchorProfile}
                            handleOnClose={() => setAnchorProfile(null)} /> }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default Header;