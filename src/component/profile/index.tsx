import { Card, CardContent, Divider, ListItemText, List, ListItemButton, Popover, ListSubheader, ListItemIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { IProfile } from "../../redux/ducks/auth/profile/types";
import { Logout, Language, LightMode, DarkMode } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { SessionLogout, userLogout } from "../../redux/ducks/auth/token/actions";
import { changeMode } from "../../redux/ducks/webConfig/actions";
import { AppStore } from "../../redux/IAppStore";
import AvatarCustom from "../avatar";
import { useNavigate } from "react-router-dom";

interface IProfilePopoverProp {
    isOpen: boolean;
    handleOnClose(): void;
    handleAnchor: any;
    profile: string
}

const ProfilePopover = ({ isOpen, handleAnchor, handleOnClose, profile }: IProfilePopoverProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((app: AppStore) => app);

    const { webConfig } = useSelector((app: AppStore) => app);

    const onChangeMode = () => {
        dispatch(changeMode());
    }

    const onExitApp = () => { 
        dispatch(userLogout());
        navigate('/vm-pay/private/login', { replace: true })
    }

    return (
        <Popover
            open={isOpen}
            anchorEl={handleAnchor}
            onClose={handleOnClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Card>
                <CardContent sx={{ minWidth: '16vw' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', minWidth: '16vw' }}>
                        <AvatarCustom  value={token.user.name} size={56} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', pl: 2 }}>
                            <Typography variant="subtitle1" noWrap >{token.user.name }</Typography>                           
                        </Box>
                    </Box>
                    <Typography variant="subtitle2" sx={{ p: 1, display: 'flex', alignSelf: 'center',justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap' }}>{''}</Typography>
                    <Divider />
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                {t('common.actions')}
                            </ListSubheader>
                        }>
                        <ListItemButton>
                            <ListItemIcon>
                                <Language />
                            </ListItemIcon>
                            <ListItemText primary={t('language')} />
                        </ListItemButton>
                        <ListItemButton onClick={onChangeMode}>
                            <ListItemIcon>
                                {webConfig.mode == 'light' ? <DarkMode /> : <LightMode />}

                            </ListItemIcon>
                            <ListItemText primary={ webConfig.mode == 'light' ? t('profile.modeDark'): t('profile.modeLight')} />
                        </ListItemButton>
                        <ListItemButton onClick={onExitApp}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary={t("profile.exit")} />
                        </ListItemButton>
                    </List>
                </CardContent>
            </Card>
        </Popover>
    )
}

export default ProfilePopover